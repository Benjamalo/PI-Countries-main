import styles from "./modules/card.module.css"

import React from 'react'


export default function Card ({name, flag, continents}) {
    return (
        <div className={styles.container}>            
            <img src={flag} alt='notFound'/>
            <div className={styles.info}>
                <h3>{name}</h3>
                <h5>{continents}</h5>
            </div>            
        </div>
    )

}