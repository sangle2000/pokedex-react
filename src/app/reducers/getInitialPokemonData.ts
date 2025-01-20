import {createAsyncThunk} from "@reduxjs/toolkit";
import {pokemonRoute} from "../../utils/Constant.ts";
import axios from "axios";

export const getInitialPokemonData = createAsyncThunk("pokemon/initialData", async () => {
    try {
        const { data } = await axios.get(pokemonRoute);
        return data.results;
    } catch (err) {
        console.log(err)
    }
})