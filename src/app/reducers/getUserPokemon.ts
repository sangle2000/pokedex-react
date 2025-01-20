import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {getDocs, query, where} from "firebase/firestore";
import {pokemonListRef} from "../../utils/FirebaseConfig.ts";
import {PokemonType, userPokemonType} from "../../utils/Types.ts";
import {defaultImages, images} from "../../utils/getPokemonImages.ts";

export const getUserPokemon = createAsyncThunk(
    "pokemon/userList",
    async (_, { getState }) => {
        try {
            const {
                app: { userInfo }
            } = getState() as RootState

            if (!userInfo?.email) {
                return;
            }

            const firestoreQuery = query(pokemonListRef, where("email", "==", userInfo.email));
            const fetchedPokemon = await getDocs(firestoreQuery);

            if (fetchedPokemon.docs.length) {
                const userPokemon: userPokemonType[] = [];
                for (const pokemon of fetchedPokemon.docs) {
                    const pokemonData = await pokemon.data().pokemon;
                    let image = images[pokemonData.id];

                    if (!image) {
                        image = defaultImages[pokemonData.id];
                    }

                    const types = pokemonData.types.map((type: PokemonType) => {
                        const key: string = Object.keys(type)[0]
                        return {
                            [key]: type[key],
                        }
                    });

                    userPokemon.push({
                        ...pokemonData,
                        firebaseId: pokemon.id,
                        image,
                        types
                    });
                }
                return userPokemon;
            }
            return []
        } catch (err) {
            console.log(err)
        }
    }
)