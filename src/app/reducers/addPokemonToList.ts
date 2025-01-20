import {createAsyncThunk} from "@reduxjs/toolkit";
import {pokemonStatsType, PokemonType, userPokemonType} from "../../utils/Types.ts";
import {RootState} from "../store.ts";
import {setToast} from "../slices/AppSlice.ts";
import {addDoc} from "firebase/firestore";
import {pokemonListRef} from "../../utils/FirebaseConfig.ts";
import {getUserPokemon} from "./getUserPokemon.ts";

export const addPokemonToList = createAsyncThunk(
    "pokemon/addPokemon", async (
        pokemon: {
            id: number;
            name: string;
            types: PokemonType[] | string[];
            stat?: pokemonStatsType[];
        }, { getState, dispatch }
    ) => {
        try {
            const {app: {userInfo}, pokemon: {userPokemon}} = getState() as RootState;
            if (!userInfo?.email) {
                return dispatch(
                    setToast("Please login in order to add Pokemon to your collection.")
                );
            }

            const index = userPokemon.findIndex((userPokemon: userPokemonType) => {
                return userPokemon.name === pokemon.name;
            })

            if (index === -1) {
                let types: string[] = [];
                types = pokemon.types as string[];

                await addDoc(pokemonListRef, {
                    pokemon: {id: pokemon.id, name: pokemon.name, types},
                    email: userInfo.email,
                })

                await dispatch(getUserPokemon())
                return dispatch(setToast(`${pokemon.name} added to your collection.`))
            } else {
                return dispatch(setToast(`${pokemon.name} already part of your collection.`))
            }
        } catch (err) {
            console.log(err)
        }
    }
)