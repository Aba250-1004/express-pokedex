require('dotenv').config()
const express = require('express');
const router = express.Router();
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const db = require('../models');

router.use(express.urlencoded({extended:false}))


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.fave.findAll()
  .then(favorites =>{
    console.log(favorites)
    res.render('./pokemon/favorites.ejs',{faveList:favorites})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  axios.get("https://pokeapi.co/api/v2/pokemon/"+req.body.name+"")
  .then((response)=>{
    console.log("here")
    // respoonse.data.id
    console.log(response.data.id)
    // respoonse.data.name
    console.log(response.data.name)
    db.fave.findOrCreate({
      where:{
        name:response.data.name
      },
      defaults:{
        id:response.data.id
      }
    })
    res.redirect("/pokemon")
  })
  .catch((error)=>{
    console.log(error)
  })
  // res.send(req.body);
});

module.exports = router;
