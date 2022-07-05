const { Router } = require("express");
const { Country, ActividadTuristica } = require("../db");
const axios = require("axios");
const router = Router();

const getCountry = async () => {
  const countryApi = await axios.get("https://restcountries.com/v3/all");
  const dataPaises = countryApi.data.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      flag: e.flags[1],
      continents: e.region,
      capital: e.capital ? e.capital[0] : "sin capital",
      subregion: e.subregion,
      area: e.area,
      population: e.population,
    };
  });
  await Country.bulkCreate(dataPaises);
  console.log("Se llenó la DB con países");
};
router.get("/", async (req, res) => {
  const { name } = req.query;
  const check = await Country.count();
  if (check === 0) {
    await getCountry();
  }
  const allCountries = await Country.findAll({ include: ActividadTuristica });

  if (name) {
    const country = allCountries.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    if (country.length) {
      let nombre = await country.map((e) => e.name);
      let paisActividad = await Country.findAll({
        where: { name: nombre },
        include: ActividadTuristica,
      });
      res.send(paisActividad);
    } else {
      res.send("pais no existente");
    }
  } else {
    res.send(allCountries);
  }
});
//BUSCAR POR ID

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let detallePais = await Country.findOne({
      where: {
        id: id,
      },
      include: ActividadTuristica,
    });
    if (detallePais) {
      res.send(detallePais);
    } else res.send("id incorrecto");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
