import Wrapper from "../sections/Wrapper.tsx";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultImages, images } from "../utils/getPokemonImages.ts";
import { extractColors } from "extract-colors";
import axios from "axios";
import Evolution from "./Pokemon/Evolution";
import Locations from "./Pokemon/Locations";
import CapableMoves from "./Pokemon/CapableMoves";
import Description from "./Pokemon/Description";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentPokemon } from "../app/slices/PokemonSlice";
import { setPokemonTab } from "../app/slices/AppSlice";
import Loader from "../components/Loader";
import {
    pokemonRouteDetail,
    pokemonSpeciesRoute,
    pokemonTabs,
} from "../utils/Constant.ts";
import {EncounterType, evolutionDataType, evolutionType, pokemonStatsType, pokemonStatType} from "../utils/Types.ts";

function Pokemon() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const currentPokemonTab = useAppSelector(
        ({ app: { currentPokemonTab } }) => currentPokemonTab
    );
    const currentPokemon = useAppSelector(
        ({ pokemon: { currentPokemon } }) => currentPokemon
    );

    useEffect(() => {
        dispatch(setPokemonTab(pokemonTabs.description));
    }, [dispatch]);

    const getRecursiveEvolution = useCallback(
        (evolutionChain: evolutionType, level: number, evolutionData: evolutionDataType[]) => {
            if (!evolutionChain.evolves_to.length) {
                return evolutionData.push({
                    pokemon: {
                        ...evolutionChain.species,
                        url: evolutionChain.species.url.replace(
                            "pokemon-species",
                            "pokemon"
                        ),
                    },
                    level,
                });
            }
            evolutionData.push({
                pokemon: {
                    ...evolutionChain.species,
                    url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
                },
                level,
            });
            return getRecursiveEvolution(
                evolutionChain.evolves_to[0],
                level + 1,
                evolutionData
            );
        },
        []
    );

    const getEvolutionData = useCallback(
        (evolutionChain: evolutionType) => {
            const evolutionData: evolutionDataType[] = [];
            getRecursiveEvolution(evolutionChain, 1, evolutionData);
            return evolutionData;
        },
        [getRecursiveEvolution]
    );

    const [isDataLoading, setIsDataLoading] = useState(true);
    const getPokemonInfo = useCallback(
        async (image: string) => {
            const { data } = await axios.get(`${pokemonRouteDetail}/${params.id}`);
            const { data: dataEncounters } = await axios.get(
                data.location_area_encounters
            );

            const {
                data: {
                    evolution_chain: { url: evolutionURL },
                },
            } = await axios.get(`${pokemonSpeciesRoute}/${data.id}`);
            const { data: evolutionData } = await axios.get(evolutionURL);

            const pokemonAbilities = {
                abilities: data.abilities.map(({ ability }: {ability: {name: string}}) => ability.name),
                moves: data.moves.map(({ move }: {move: {name: string}}) => move.name),
            };

            const encounters: string[] = [];
            const evolution = getEvolutionData(evolutionData.chain);
            // let evolutionLevel: number;
            const evolutionLevel: number = evolution.find(
                ({ pokemon }) => pokemon.name === data.name
            )?.level ?? 0;
            dataEncounters.forEach((encounter: EncounterType) => {
                encounters.push(
                    encounter.location_area.name.toUpperCase().split("-").join(" ")
                );
            });
            const stats = await data.stats.map(({ stat, base_stat }: {stat: pokemonStatsType, base_stat: pokemonStatType }) => ({
                name: stat.name,
                value: base_stat,
            }));
            dispatch(
                setCurrentPokemon({
                    id: data.id,
                    name: data.name,
                    types: data.types.map(({ type: { name } }) => name),
                    image,
                    stats,
                    encounters,
                    evolutionLevel,
                    evolution,
                    pokemonAbilities,
                })
            );
            setIsDataLoading(false);
        },
        [params.id, dispatch, getEvolutionData]
    );

    useEffect(() => {
        if (params){
            const imageElemet = document.createElement("img");
            imageElemet.src = images[params?.id ?? 0];
            const options = {
                pixels: 10000,
                distance: 1,
                splitPower: 10,
                // colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
                saturationDistance: 0.2,
                lightnessDistance: 0.2,
                hueDistance: 0.083333333,
            };
            const getColor = async () => {
                const color = await extractColors(imageElemet.src, options);
                const root = document.documentElement;
                root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
            };
            getColor();
            let image = images[params?.id ?? 0];
            if (!image) {
                image = defaultImages[params?.id ?? 0];
            }

            getPokemonInfo(image);
        }

    }, [params, params.id, getPokemonInfo]);

    return (
        <>
            {!isDataLoading && currentPokemon ? (
                <>
                    {currentPokemonTab === pokemonTabs.description && <Description />}
                    {currentPokemonTab === pokemonTabs.evolution && <Evolution />}
                    {currentPokemonTab === pokemonTabs.locations && <Locations />}
                    {currentPokemonTab === pokemonTabs.moves && <CapableMoves />}
                </>
            ) : (
                <Loader />
            )}
        </>
    );
}

const WrapperPokemon = Wrapper(Pokemon);

export default WrapperPokemon;