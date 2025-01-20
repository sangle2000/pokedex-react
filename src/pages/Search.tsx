import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {useEffect} from "react";
import {getInitialPokemonData} from "../app/reducers/getInitialPokemonData.ts";
import Wrapper from "../sections/Wrapper.tsx";
import {getPokemonData} from "../app/reducers/getPokemonData.ts";
import PokemonCardGrid from "../components/PokemonCardGrid.tsx";
import {debounce} from "../utils/Debounce.ts";

function Search() {
    const dispatch = useAppDispatch();

    // Truy cập vào slice pokemon từ state và lấy giá trị allPokemon từ slice pokemon
    const { allPokemon, randomPokemon } = useAppSelector(( { pokemon }) => pokemon)

    useEffect(() => {
        dispatch(getInitialPokemonData())
    }, [dispatch])

    useEffect(() => {
        if (allPokemon) {
            const clonedPokemon = [...allPokemon];
            const randomPokemonId = clonedPokemon.sort(() =>
                Math.random() - Math.random()
            ).slice(0, 20)

            dispatch(getPokemonData(randomPokemonId))
        }
    }, [allPokemon, dispatch]);

    const handleChange = debounce((value: string) => getPokemon(value), 300)

    const getPokemon = async (value: string) => {
        if (value.length) {
            const pokemonData = allPokemon?.filter((pokemon) => {
                return pokemon.name.includes(value.toLowerCase())
            })

            dispatch(getPokemonData(pokemonData!))
        } else {
            const clonedPokemon = [...(allPokemon as [])];
            const randomPokemonId = clonedPokemon.sort(() =>
                Math.random() - Math.random()
            ).slice(0, 20)

            dispatch(getPokemonData(randomPokemonId))
        }
    }

    return (
        <>
            <div
                className="search"
            >
                <input
                    type="text"
                    className="pokemon-searchbar"
                    placeholder="Search Pokemon"
                    onChange={(e) => handleChange(e.target.value)}
                />

                <PokemonCardGrid
                    pokemon={randomPokemon!}
                />
            </div>
        </>
    )
}

const WrapperSearch = Wrapper(Search);

export default WrapperSearch;