const axios = require('axios');

module.exports = {
    homeView: async (req, res) => {

        const allPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`);

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

        console.log(processedPokemons)

        return res.render('index/home', {processedPokemons});

    }
}