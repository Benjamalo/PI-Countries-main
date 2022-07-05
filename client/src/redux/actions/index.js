
import axios from 'axios';

export function getCountries() {
    return async function(dispatch) {
        const res = await axios.get("http://localhost:3001/countries")
            return dispatch({
                type: 'GET_COUNTRIES',
                payload: res.data
            });
    }
}

export function getSearchName(name) {
    return async function(dispatch) {
        var res = await axios.get(`http://localhost:3001/countries?name=${name}`);        
        return dispatch({
            type: 'GET_NAME_COUNTRY',
            payload: res.data
        })
    }
}

export function getContinent(payload){
    return { 
        type: 'GET_CONTINENT',
        payload
    }
}

export function byActivity (payload){
    return { 
        type: 'BY_ACTIVITY',
        payload
    }
}

export function getAllActivities(){
    return async function (dispatch){
            var json = await axios.get("http://localhost:3001/activities")
            return dispatch({
                type: "GET_ACTIVITIES",
                payload: json.data
            })
    }
}

export function getOrderName(payload){
    return { 
        type: 'GET_ORDER_NAME',
        payload
    }
}

export function getOrderPopulation(payload){
    return { 
        type: 'GET_ORDER_POPULATION',
        payload
    }
}

export function getDetails(id) {
    return async function(dispatch){        
            const res = await axios.get(`http://localhost:3001/countries/${id}`)
            console.log(res)
            return dispatch ({
                type: 'GET_DETAILS',
                payload: res.data
            })        
    }
}

export function postActivity(payload){
    return async function (dispatch) {
         const res = await axios.post("http://localhost:3001/activities",payload);
         return dispatch({
			type: "CREATE_ACTIVITY",
			payload: res.data,
		});
    }
}