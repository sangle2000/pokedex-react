import {generatedPokemonType, PokemonTypeInitialState} from "../../utils/Types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {getInitialPokemonData} from "../reducers/getInitialPokemonData.ts";
import {getPokemonData} from "../reducers/getPokemonData.ts";
import {getUserPokemon} from "../reducers/getUserPokemon.ts";
import {removePokemon} from "../reducers/removePokemonFromUserList.ts";

const initialState: PokemonTypeInitialState = {
    allPokemon: undefined,
    randomPokemon: undefined,
    compareQueue: [],
    userPokemon: [],
    currentPokemon: undefined,
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
        },

        setCurrentPokemon: (state, action) => {
            state.currentPokemon = action.payload;
        },
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
                state.userPokemon = action.payload!;
            })

        builder
            .addCase(removePokemon.fulfilled, (state, action) => {
                const userPokemon = [...state.userPokemon]
                const index =  userPokemon.findIndex((pokemon) => {
                    return pokemon.firebaseId === action.payload!.id
                })

                userPokemon.splice(index, 1)
                state.userPokemon = userPokemon;
            })
    }
})

export const {addToCompare, removeFromCompare, setCurrentPokemon} = PokemonSlice.actions;
