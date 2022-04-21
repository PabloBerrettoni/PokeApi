const axios = require('axios');

module.exports = {
    homeView: async (req, res) => {

        const allPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);

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

        /* console.log(processedPokemons) */

        let offset = 0;
        return res.render('index/home', {processedPokemons, offset});

    },

    homeViewOffset: async (req, res) => {

        console.log(req.params)
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

        /* console.log(processedPokemons) */
        return res.render('index/home', {processedPokemons, offset: req.params.offsetValue});

    }
}