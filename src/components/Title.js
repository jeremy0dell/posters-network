import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import britishFlag from '../images/british-flag.jpeg'
import belgium from '../images/belgium.jpeg'
import uncleSam from '../images/uncle-sam.jpeg'
import redCross from '../images/red-cross.jpeg'
import tanks from '../images/tanks.jpeg'
import warBonds from '../images/war-bonds.jpeg'
import moveOn from '../images/move-on.jpeg'
import inThis from '../images/in-this.jpeg'

import styles from '../styles/Title.module.css'

export default () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Are <b>You</b> In This?</div>
            <div className={styles.subtitle}>Exploring the Thematic Connections between World War Propaganda Posters in the Princeton University Poster Collection</div>
            <ArrowDownwardIcon sx={{fontSize: 80, marginTop: 4, cursor: 'pointer'}} />
            <div class={`${styles.flier} ${styles.flier0}`}><img style={{ height: 100 }} src={britishFlag} /></div>
            <div class={`${styles.flier} ${styles.flier1}`}><img style={{ height: 200 }} src={belgium} /></div>
            <div class={`${styles.flier} ${styles.flier2}`}><img style={{ height: 300 }} src={uncleSam} /></div>
            <div class={`${styles.flier} ${styles.flier3}`}><img style={{ height: 300 }} src={redCross} /></div>
            <div class={`${styles.flier} ${styles.flier5}`}><img style={{ height: 200 }} src={tanks} /></div>
            <div class={`${styles.flier} ${styles.flier6}`}><img style={{ height: 250 }} src={warBonds} /></div>
            <div class={`${styles.flier} ${styles.flier7}`}><img style={{ height: 300 }} src={moveOn} /></div>
            <div class={`${styles.flier} ${styles.flier8}`}><img style={{ height: 400 }} src={inThis} /></div>
            {/* <div class={`${styles.flier} ${styles.flier4}`}><img style={{ height: 200 }} src={tanks} />aaaaa</div> */}
            {/* <div class={styles.flier}>image 2</div>
            <div class={styles.flier}>image 3</div>
            <div class={styles.flier}>image 4</div> */}
        </div>
    )
}