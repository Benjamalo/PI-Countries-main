import styles from './modules/home.module.css'

import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCountries, getOrderName, getOrderPopulation, getContinent, getAllActivities, byActivity } from '../actions'
import Card from './card'
import Paginado from './paginado';
import SearchBar from './searchBar';

export default function HomePage () {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.activities)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1) //La pagina empieza en la 1
    const [countriesPerPage, setCountriesPerPage] = useState(10) //La pagina tiene 10 x Pagina
    const indexOfLastCountry = currentPage * countriesPerPage // ultimo countri en 10 (1 x 10)
    const indexOfFirstCountry =  indexOfLastCountry - countriesPerPage //// primer countri en 0 (10 - 10)
    const currentCountry = Array.isArray(allCountries) && allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCountries())
    },[dispatch])

    useEffect(() => {
        dispatch(getAllActivities())
    },[dispatch])

    function handleRecargar(e){
        e.preventDefault();
        dispatch(getCountries())
    }

    function handleSortName(e){
        e.preventDefault();
        dispatch(getOrderName(e.target.value))
        setCurrentPage(1)//setear el ordenamiento en la pagina primera
        setOrden(`Orden ${e.target.value}`)
    }

    function handlSortPopu(e){
        e.preventDefault();
        dispatch(getOrderPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(`Orden ${e.target.value}`)
    }

    function handleFilterContinent(e){
        dispatch(getContinent(e.target.value))
    }

    function handleByActivity(e){
        e.preventDefault();
        dispatch(byActivity(e.target.value))
    }

    return(
        <div className={styles.container}>

            {/*/////////////// TITLE/BUTTON /////////////// */}
            <button className={styles.title} onClick={e => {handleRecargar(e)}}>
                HOME
            </button>

            {/* creacion  */}
            <div>
                <Link to='/create'>
                    <button className={styles.create}>Crea tu actividad</button>  
                </Link>
            </div>
            {/*/////////////// NAV /////////////// */}
            <nav className={styles.nav}>
            


                {/* search */}
                <div>
                    <SearchBar  className={styles.searchbar}/>
                </div>

                {/* ordenador */}
                <div className={styles.orden}>
                    <button value='asc' className={styles.orden1} onClick={e => {handleSortName(e)}}>Ascendente</button>
                    <button value='desc' className={styles.orden1} onClick={e => {handleSortName(e)}} >Descendente</button>                  
                    <button value='popu' className={styles.orden2} onClick={e => {handlSortPopu(e)}}>Poblacion asc</button>
                    <button value='pop' className={styles.orden2} onClick={e => {handlSortPopu(e)}}> Poblacion des </button>                 
                </div>

                {/* filtrado */}
                <div className={styles.filtros} >
                    <select className={styles.filtro1} onChange={e => handleFilterContinent(e)}>
                        <option value='all'>Mundo</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europa</option>
                        <option value="Africa">Africa</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctic">Antartida</option>
                        <option value="Americas">America</option>
                    </select>
                    <select className={styles.filtro2} onChange={(e) => handleByActivity(e)}>
                        <option value='All'>Actividades</option>
                        {
                            activities.map((el)=> {
                                return (
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            })
                        } 
                    </select>
                </div>

            </nav>

            {/*////////////// PAGINADO/COUNTRIES /////////////// */}

             <div className={styles.countriesPag}> 

                {/* area */}
                 <div className={styles.area}> 
                    { 
                        currentCountry ? currentCountry.map((el)=> {
                            return (
                                <div key={el.id}>
                                    <Link to={'/details/' + el.id}>
                                        <Card name={el.name} flag={el.flag} continents={el.continents} key={el.id}/>
                                    </Link>
                                </div>
                            )
                        }) :
                        <div>
                            <Link to={'/details/' + allCountries.id}>
                                <Card 
                                    name={allCountries.name}
                                    flag={allCountries.flag} 
                                    continents={allCountries.continents} 
                                    key={allCountries.id}>
                                </Card>
                            </Link>
                        </div>
                    }
                </div> 

                {/* paginado */}  
                <div className={styles.paginado} > 
                    <Paginado countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado={paginado}/>
                </div>
             </div> 
            
         </div>
    )
}