const { Router } = require('express');
const { Country, ActividadTuristica } = require('../db')
const axios = require('axios');
const router = Router();

router.get("/", async (req, res) => {
    try {
        let getAllActivities = await ActividadTuristica.findAll({
            include: Country
        });
        return res.status(200).json(getAllActivities);
    } catch (error) {
        throw new Error(error);
    }
})

const createActivity = async (name,difficulty, duration,season,idPais) => {
    const newActivity = await ActividadTuristica.create({
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
    });
    let countries = await Country.findAll({
        where:{ id: idPais}
    })
    await newActivity.addCountries(countries);
    return newActivity;
}

router.post('/', async (req, res) => {
    const {name, difficulty, duration, season,idPais} = req.body;
    try{
        if(!name){
            res.send('Name require') 
        }
        else{
            const nuevaActividad = await createActivity(name, difficulty, duration, season,idPais);
            res.send(nuevaActividad)
        }
    }
    catch(error){
        res.status(404).json(error)
    }    
})

module.exports = router;