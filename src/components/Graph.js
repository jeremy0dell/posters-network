import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DATA from '../data/formatted5.json'

import britishSoldier from '../images/british-soldier.jpeg'
import britishVictory from '../images/british-victory.jpeg'
import britishWar from '../images/british-war.jpeg'

import styles from '../styles/Graph.module.css'
import flierName from '../styles/Title.module.css'

// constants
const width = window.innerWidth * 0.75
const height = window.innerHeight

const links = DATA.links.map(d => Object.create(d));
const nodes = DATA.nodes.map(d => Object.create(d));

const count2radius = d3.scaleSqrt()
    .domain([d3.min(nodes.map(n => n.count)), d3.max(nodes.map(n => n.count))])
    .range([5, 30])

const links2width = d3.scaleLinear()
    .domain([d3.min(links.map(n => n.value)), d3.max(links.map(n => n.value))])
    .range([1, 15])

const links2opacity = d3.scaleLinear()
    .domain([d3.min(links.map(n => n.value)), d3.max(links.map(n => n.value))])
    .range([0.035, 0.99])

const links2highlightOpacity = d3.scaleLinear()
    .domain([d3.min(links.map(n => n.value)), d3.max(links.map(n => n.value))])
    .range([0.5, 1])

const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(() => -400))
    .force("center", d3.forceCenter(width / 2, height / 2));


function capitalize(word) {
    console.log('hello', word, word[0].toUpperCase() + word.substring(1).toLowerCase())
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export default ({ setOpen, setKeyword }) => {
    const [currScroll, setCurrScroll] = useState(0)
    const [nodeSelection, setNodeSelection] = useState({})
    const [linkSelection, setLinkSelection] = useState({})
    const [tooltipSelection, setTooltipSelection] = useState({})
    const [inputText, setInputText] = useState('')
    const graphEl = useRef(null);

    useEffect(() => {
        const svg = d3.select(graphEl.current)
            .append('svg')
            .attr('height', height)
            .attr('width', width)

        const link = svg
            .append("g")
            .attr("stroke", "#a3a3a3")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-opacity", d => d.value < 1 ? 0 : links2opacity(d.value))
            .attr("stroke-width", d => links2width(d.value));
        
        const node = svg
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", d => count2radius(d.count))
            .attr("fill", 'blue')
            .attr("id", d => d.id)
            .classed('tooltip', true)
        
        node.append("title").text(d => d.id);
        
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        
            node.attr("cx", d => d.x).attr("cy", d => d.y);
        });
            // simulation.alphaDecay(0.01)


        const div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("display", 'none');
        
        node
            .style('opacity', 0)

        setNodeSelection(node)
        setLinkSelection(link)
        setTooltipSelection(div)

        return () => d3.selectAll('.tooltip').remove()
    }, [])

    const handleScroll = (e) => {
        var level = Math.floor(e.target.scrollTop / height)

        d3.selectAll('.' + flierName.flier).remove()

        if (level == 2 && currScroll < 2) {
            d3.select('#british')
                .transition()
                .duration(1500)
                .style('opacity', 1)
                .on('end', () => {
                    tooltipSelection.html(`<div>British</div>`)
                        .style("left", (d3.select('#british').attr('cx') - 26) + "px")
                        .style("top", (d3.select('#british').attr('cy') - 62 + height) + "px")
                        .style('display', 'block');
                })
        }

        if (level == 4 && currScroll < 4) {
            d3.select('#soldier')
                .attr('fill', 'green')
                .transition()
                .duration(1500)
                .style('opacity', 1)
                .on('end', () => {
                    tooltipSelection.html(`<div>Soldier</div>`)
                        .style("left", (d3.select('#soldier').attr('cx') - 26) + "px")
                        .style("top", (d3.select('#soldier').attr('cy') - 62 + height) + "px")
                        .style('display', 'block')
                        .attr('fill', 'green');
                })
            
            // d3.select('#british').attr('fill', 'blue')
        }

        if (level == 5 && currScroll < 5) {
            d3.select('#war')
                .attr('fill', 'green')
                .transition()
                .duration(1500)
                .style('opacity', 1)
                .on('end', () => {
                    tooltipSelection.html(`<div>War</div>`)
                        .style("left", (d3.select('#war').attr('cx') - 26) + "px")
                        .style("top", (d3.select('#war').attr('cy') - 62 + height) + "px")
                        .style('display', 'block')
                        .attr('fill', 'green');
                })
            
            d3.select('#soldier').attr('fill', 'blue')
        }

        if (level == 6 && currScroll < 6) {
            d3.select('#victory')
                .attr('fill', 'green')
                .transition()
                .duration(1500)
                .style('opacity', 1)
                .on('end', () => {
                    tooltipSelection.html(`<div>Victory</div>`)
                        .style("left", (d3.select('#victory').attr('cx') - 26) + "px")
                        .style("top", (d3.select('#victory').attr('cy') - 52 + height) + "px")
                        .style('display', 'block');
                })

            d3.select('#war').attr('fill', 'blue')
                
        }

        if (level == 7 && currScroll < 7) {
            tooltipSelection.transition()
                .duration(500)
                .style('display', 'none');

            nodeSelection
                .transition()
                .duration(1500)
                .style('opacity', 1)
                .attr('fill', 'blue')

            nodeSelection
                .style('cursor', 'pointer')

            nodeSelection.on('click', (d) => {
                console.log('d', d.target)

                setKeyword(d.target.id)
                setOpen(true)

                d3.select('#' + d.target.id)
                    .attr("fill", 'green')
            })

            nodeSelection
                .on("mouseenter", (evt, d) => {
                    linkSelection
                        .attr("display", "none")
                        .filter(l => l.source.id === d.id || l.target.id === d.id)
                        .attr("display", "block")
                        .attr("stroke-opacity", d => d.value < 1 ? 0 : links2highlightOpacity(d.value))

                    tooltipSelection
                        .style('display', 'block')
                        .html(`<div>${capitalize(d.id)}</div>`)
                        .style("left", (evt.pageX) + "px")
                        .style("top", (evt.pageY - 34) + "px")
                })
                .on('mousemove', (e, d) => {
                    tooltipSelection
                            .style("left", (e.pageX) + "px")
                            .style("top", (e.pageY - 34) + "px")
                            .style('display', 'block');
                })
                .on("mouseleave", evt => {
                    linkSelection
                        .attr("display", "block")
                        .attr("stroke-opacity", d => d.value < 1 ? 0 : links2opacity(d.value))
                
                    // tooltipSelection.style("visibility", "hidden")
                    tooltipSelection.transition()
                        .duration(500)
                        .style('display', 'none');
                });
        }

        setCurrScroll(level)
    }

    const disabled = !inputText.length

    return (
        <div className={styles.container}>
            <div ref={graphEl} style={{marginBottom: 20}}></div>
            <div className={styles.scrollContainer} onScroll={handleScroll}>
                <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    This network of interconnected lines represent connections between words in the titles and descriptions of posters at in the <a href="https://sova.si.edu/record/NMAH.AC.0433">Princeton University Poster Collection</a>. This project involves visualizing the words that were written and transcriped by volunteers and curators when these posters were processed in 1991.
                </div>
                <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Each line radiates out of a node, which represents a single word. If two words are found together in the title, or image description of a poster, a line wil be drawn between them. The thicker the line, the more connections there are between those two words.
                </div>
                <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    The most commonly found word in this text collection is <span style={{ color: 'rgb(96 96 255)' }}>British</span>. This collection primarily includes World War posters from Great Britain.
                </div>
                <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Here are some of the nodes most frequently connected to <span style={{ color: 'rgb(96 96 255)' }}>British</span>, and some of the posters that represent these connections:
                </div>
                <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div><span style={{ color: '#12db12' }}>Soldier</span> is the second most common word found in this collection. There are 219 connections between <span style={{ color: 'rgb(96 96 255)' }}>British</span> and <span style={{ color: '#12db12' }}>Soldier</span> in this collection.</div>
                    <img style={{ width: '100%', margin: '20px 0px' }} src={britishSoldier} />
                    <div>From the Smithsonian's curated text description: <i>A man with his hands in his pocket looking at male and female factory workers, a nurse, a boy giving ammunition to a <span style={{ color: 'rgb(96 96 255)' }}>British</span> <span style={{ color: '#12db12' }}><b>soldier</b></span>, and a British sailor manning an artillery piece.</i></div>
                </div>
                <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div>Third most commonly, we have <span style={{ color: '#12db12' }}>war</span>. An unsurprising word to find in a collection of posters about the two World Wars, we find <span style={{ color: '#12db12' }}>war</span> in poster descriptions and titles.</div>
                    <img style={{ width: '100%', margin: '20px 0px' }} src={britishWar} />
                    <div>Contained in the title of this record is: <i>2 out of 3 Britons mobilised for <span style={{ color: '#12db12' }}>war</span></i>.</div>
                </div>
                <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div>Another highly used word in this collection of propaganda posters is <span style={{ color: '#12db12' }}>victory</span>.</div>
                    <img style={{ width: '100%', margin: '20px 0px' }} src={britishVictory} />
                    <div><span style={{ color: '#12db12' }}>Victory</span> bread was a type of bread that only contained 75% wheat. In wartimes, US citizens were encouraged to eat less wheat so that soldiers could more readily enjoy it!</div>
                </div>
                <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{ margin: '4px 0px' }}>Now, please freely explore the collection.</div>
                    <div style={{ margin: '4px 0px' }}>To display a collection of posters based on a certain keyword, hover over a node to see it's value and click.</div>
                    <div style={{ margin: '4px 0px' }}>The textbox below can also be used to search with your own custom keyword.</div>
                    <TextField className={styles.test}
                        sx={{ backgroundColor: '#a3a3a3', borderRadius: '6px', margin: '12px' }}
                        id="filled-basic"
                        label="Search Term"
                        variant="filled"
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <Button className={styles.test} sx={{ borderRadius: '6px', margin: '12px', marginLeft: 0 }} variant="outlined" disabled={disabled} onClick={() => {
                        setKeyword(inputText)
                        setOpen(true)
                    }}>Search</Button>
                    <div><span style={{ color: '#12db12' }}>Green</span> nodes have been visited, while <span style={{ color: 'rgb(96 96 255)' }}>Blue</span> nodes have not been visited yet.</div>
                </div>
            </div>
        </div>
    )
}