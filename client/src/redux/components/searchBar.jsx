import styles from './modules/searchBar.module.css'


import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchName } from "../actions";

 
export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault()
        
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getSearchName(name))
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input className={styles.input} type='text' value={name} placeholder='País...'
                onChange={e => handleInputChange(e)}></input>
                <button className={styles.button} type='submit' >Buscar</button>
            </form>
        </div>
    )
}