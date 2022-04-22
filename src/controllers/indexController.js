const axios = require('axios');
const { query } = require('express');

module.exports = {
    homeView: async (req, res) => {

        return res.redirect('/0');

    },

    homeViewOffset: async (req, res) => {

        let offsetValue;
        if (req.params != null || req.params != undefined) {
            offsetValue = req.params.offsetValue;
        } else {
            offsetValue = 0;
        }

        const allPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offsetValue}`);

        let processedPokemons = [];
        for (const pokemon of allPokemons.data.results) {
            let pokemonData = await axios.get(pokemon.url);
            let pkm = {
                name: pokemon.name,
                sprite: pokemonData.data.sprites.front_default,
                type1: pokemonData.data.types[0].type.name,
                type2: pokemonData.data.types[1] ? pokemonData.data.types[1].type.name : undefined
            }
            processedPokemons.push(pkm);
        }

        return res.render('index/home', {processedPokemons, offset: req.params.offsetValue});

    },

    searchController: async (req, res) => {

        try{
            let pokeSearch = req.body.search;
            let pokemonFound = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeSearch}`)
            
            let pkm = {
                name: pokemonFound.data.name,
                sprite: pokemonFound.data.sprites.front_default,
                type1: pokemonFound.data.types[0].type.name,
                type2: pokemonFound.data.types[1] ? pokemonFound.data.types[1].type.name : undefined
            }
            return res.render('index/search', {pkm});
        } 
        catch(error) {
            console.log(error);
            return res.render('index/search', {pkm: undefined});
        }

    }
}