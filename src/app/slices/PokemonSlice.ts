import {generatedPokemonType, PokemonTypeInitialState, userPokemonType} from "../../utils/Types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getInitialPokemonData} from "../reducers/getInitialPokemonData.ts";
import {getPokemonData} from "../reducers/getPokemonData.ts";
import {getUserPokemon} from "../reducers/getUserPokemon.ts";

const initialState: PokemonTypeInitialState = {
    allPokemon: undefined,
    randomPokemon: undefined,
    compareQueue: [],
    userPokemon: [],
}

export const PokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        addToCompare: (state: PokemonTypeInitialState, action) => {
            const index = state.compareQueue.findIndex(
                (pokemon: generatedPokemonType) => {
                    return pokemon.id === action.payload.id;
                }
            )

            if (index === -1) {
                if (state.compareQueue.length === 2) {
                    state.compareQueue.pop()
                }
                state.compareQueue.unshift(action.payload);
            }
        },

        removeFromCompare: (state: PokemonTypeInitialState, action) => {
            const index = state.compareQueue.findIndex(
                (pokemon: generatedPokemonType) => {
                    return pokemon.id === action.payload.id;
                }
            )

            const queue = [...state.compareQueue];
            queue.splice(index, 1);
            state.compareQueue = queue;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInitialPokemonData.fulfilled, (state, action) => {
            state.allPokemon = action.payload;
        })

        builder
            .addCase(getPokemonData.fulfilled, (state, action) => {
                state.randomPokemon = action.payload;
            })

        builder
            .addCase(getUserPokemon.fulfilled, (state: PokemonTypeInitialState, action) => {
                state.userPokemon = action.payload;
            })
    }
})

export const {addToCompare, removeFromCompare} = PokemonSlice.actions;
