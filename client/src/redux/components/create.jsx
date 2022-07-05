import styles from "./modules/create.module.css"

import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getCountries } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

const validar = (input) => {
	let errors = {};
	if (!input.name) {
		errors.name = 'falta nombre';
	}
	if (!input.difficulty) {
		errors.difficulty = 'falta dificultad';
	}
	if (input.duration < 1) {
		errors.duration = 'falta duracion';
	}
	if (!input.season) {
		errors.season = 'falta temporada';
	}
   
	return errors;
};

export default function ActivityCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        idPais:[]
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
		setErrors(
			validar({
				...input,
				[e.target.name]: e.target.value,
			})
		);
    }

    function handleSelect(e) {
		setInput({
			...input,
			idPais: [...input.idPais, e.target.value],
		});
        setErrors(
            validar({
                ...input,
                [e.target.idPais]: e.target.value,
            })
        )
	};    
    
    function handleDelete(e) {
        setInput({
            ...input,
            idPais: input.idPais.filter(el => el !== e)
        })
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postActivity(input))
        alert("Actividad creada")
        setInput({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            idPais:[]
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Crea tu Actividad</h1>
            <nav className={styles.nav}>
                <form  onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.dive}>
                        <label> Nombre: </label>
                        <input required type="text" placeholder="Nombre..." name="name" value={input.name} onChange={(e) => handleChange(e)}/>
                        {
                            errors.name && (
                                <p>
                                    {errors.name}
                                </p>
                            )
                        }
                    </div>
                    <div className={styles.dive}>
                        <label> Dificultad: </label>
                        <input type="range" required="required" name="difficulty" min="1" max="5" value={input.difficulty} onChange={(e) => handleChange(e)}/>
                        {
                            errors.difficulty && (
                                <p>
                                    {errors.difficulty}
                                </p>
                            )
                        }
                    </div>
                    <div className={styles.dive}>
                        <label> Duracion: </label>
                        <input required type="text" placeholder="Duración de actividad..." name="duration" value={input.duration} onChange={(e) => handleChange(e)}/>
                        {
                            errors.duration && (
                                <p>
                                    {errors.duration}
                                </p>
                            )
                        }
                    </div>
                    <div className={styles.dive}>
                        <label> Temporada: </label>
                            <select required  name='season' value={input.season} onChange={(e) => handleChange(e)}>
                                <option value="" selected disabled>Temporada</option>
                                <option>Verano</option>
                                <option>Otoño</option>
                                <option>Invierno</option>
                                <option>Primavera</option>
                            </select>
                        {
                            errors.season && (
                                <p>
                                    {errors.season}
                                </p>
                            )
                        }
                    </div>
                    <div className={styles.dive}>
                        <div>
                            <label>Paises: </label>
                            <select onChange={(e) => handleSelect(e)} required>
                                <option  selected="false" disabled>Seleccionar pais</option>
                                {countries.map((e) => (
                                    <option value={e.id}>{e.name}</option>
                                ))}
                            </select> 
                            
                            <ul>
                                {input.idPais.map((e) =>( 
                                    <li>
                                        <button type="button" className={styles.x} onClick={() => handleDelete(e)}>{e}{" "}:x:</button>
                                    </li>
                                ))}
                            </ul>        
                        </div>
                    </div>
                    <div>
                        <button  className={styles.create} type='submit'>Create</button>
                        <Link to= '/home'>
                            <button  className={styles.return}  >Return</button>
                        </Link>
                    </div>
                </form>
            </nav>
        </div>
    )
}