import React, { useState, useEffect } from 'react';
import * as d3 from 'd3'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import data from '../data/full_data400.json'

import styles from '../styles/Modal.module.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: '#2c2b2b',
    color: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    paddingTop: '16px'
    // overflow: 'h',
    // textAlign: 'center'
};

function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

const getPosters = (keyword) => {
    const cleanWords = (words) => words
        .replace('Other Image(s):', '')
        .replace('Main Image: ', '')
        .replaceAll(' no.', '')
        .replaceAll(' No.', '')
        .replace(/[0-9]/g, '')
        .replace(/[^a-zA-Z -]/g, '')
        .replace(/-/, ' ')
        .toLowerCase()
        .replaceAll('image', '')
        .replaceAll('images', '')
        .replaceAll('same as', '')
        .replaceAll('photographs with captions', '')
        .replaceAll('photograph of', '')
        .replaceAll('photographs of', '')
        .trim()

    var filtered = data.filter(el => el.Image && el.title && el.linkCount == 1)

    if (filtered.length == 0) {
        return "No Posters with Keyword Found."
    }

    const posters = []

    for (var i = 0; i < filtered.length; i++) {
        var curr = filtered[i]
        var desc = cleanWords(curr.Image)
        var title = cleanWords(curr.title)

        if (desc.includes(keyword.toLowerCase()) || title.includes(keyword.toLowerCase())) {
            posters.push(curr)
        }
    }

    return posters
}


export default function AppModal({ open, setOpen, keyword }) {
    const [posters, setPosters] = useState([])
    const [percentLoaded, setPercentLoaded] = useState(0)

    useEffect(() => {
        if (!keyword) return

        setPosters(getPosters(keyword))
        setPercentLoaded(0)
    }, [keyword])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLoaded = () => {
        const amount = 1 / posters.length

        setPercentLoaded(percentLoaded + amount)

        console.log('percent is', percentLoaded)
    }

    return keyword ? (
        <div>
            <Button></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
                    <div>
                        {
                            percentLoaded < 0.9 ? // is percent under 95?
                            <>
                                <Typography sx={{ fontFamily: 'Stardos Stencil', textAlign: 'center' }} id="modal-modal-title" variant="h3" component="h2">
                                    Loading Images...
                                </Typography>
                                <Typography sx={{ fontFamily: 'Stardos Stencil', textAlign: 'center' }} id="modal-modal-title" variant="h3" component="h2">
                                    {(percentLoaded * 100).toFixed(1)}%
                                </Typography>
                            </> : // if not (images are loaded)
                            <>
                                <Typography sx={{ fontFamily: 'Stardos Stencil', textAlign: 'center' }} id="modal-modal-title" variant="h5" component="h2">
                                    Posters for Keyword: {capitalize(keyword)}
                                </Typography>

                            </>
                        }
                    </div>

                    <div style={{ display: percentLoaded < 0.9 ? 'none' : 'flex', flexWrap: 'wrap', justifyContent: 'center', overflowY: 'scroll', height: '98%' }}>
                        {
                            posters.map(p =>
                                <div style={{ width: '20%', maxHeight: 400, margin: 24 }}>
                                    <a target="_blank" href={`https://collections.si.edu/search/detail/${p['EDAN-URL']}`}>
                                        <img className={styles.poster} onLoad={handleLoaded} style={{ width: '100%', maxHeight: 400 }} src={p.link} />
                                    </a>
                                </div>
                            )
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    ) : '';
}