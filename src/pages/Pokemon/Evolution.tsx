import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PokemonCardGrid from "../../components/PokemonCardGrid";
import { getPokemonData } from "../../app/reducers/getPokemonData.ts";
import Loader from "../../components/Loader";
import { genericPokemonType } from "../../utils/Types.ts";

function Evolution() {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useAppDispatch();
    const pokemonData = useAppSelector(({ pokemon }) => pokemon);
    useEffect(() => {
        const fetchData = async () => {
            const pokemons: genericPokemonType[] =
                pokemonData.currentPokemon!.evolution.map(
                    ({ pokemon }: { pokemon: genericPokemonType }) => pokemon
                );
            await dispatch(getPokemonData(pokemons));
            setIsLoaded(true);
        };
        fetchData();
    }, [dispatch, pokemonData.currentPokemon]);

    return (
        <div className="page">
            {isLoaded ? (
                <PokemonCardGrid pokemon={pokemonData.randomPokemon!} />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default Evolution;