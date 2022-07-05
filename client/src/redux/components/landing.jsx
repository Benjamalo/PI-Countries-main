import React from 'react'
import { Link } from 'react-router-dom'

import styles from './modules/landing.module.css'

export default function LandingPage() {
    return(
        <div name="landing" className={styles.container}>
            <div className={styles.image}></div>
            <h1 className={styles.title}>COUNTRIES</h1>
            <Link to='/home'>
                <button className={styles.button}>Ingresar</button>
            </Link>                 
        </div>
    )
}