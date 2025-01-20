import {createAsyncThunk} from "@reduxjs/toolkit";
import {generatedPokemonType, genericPokemonType, PokemonType} from "../../utils/Types.ts";
import axios from "axios";
import {defaultImages, images} from "../../utils/getPokemonImages.ts";
import {pokemonTypes} from "../../utils/pokemonTypes.ts";


export const getPokemonData = createAsyncThunk("pokemon/rd", async (pokemon: genericPokemonType[]) => {
    try {
        const pokemonData: generatedPokemonType[] = [];
        for await (const pokemonInfo of pokemon) {
            const {data}: {
                data: {
                    id: number,
                    types: { type: generatedPokemonType }[]
                }
            } = await axios.get(pokemonInfo.url);

            const types: PokemonType[] = data.types.map(
                ({type: {name}}: { type: { name: string } }) => ({
                    [name]: pokemonTypes[name]
                })
            )

            let image: string = images[data.id.toString()]

            if (!image) {
                image = defaultImages[data.id.toString()]
            }

            if (image) {
                pokemonData.push({
                    id: data.id,
                    name: pokemonInfo.name,
                    image: image,
                    types,
                })
            }
        }
        return pokemonData;
    } catch (err) {
        console.log(err)
    }
})