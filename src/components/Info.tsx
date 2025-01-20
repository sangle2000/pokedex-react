import { useAppDispatch } from "../app/hooks";
import { addPokemonToList } from "../app/reducers/addPokemonToList";
import { setPokemonTab } from "../app/slices/AppSlice";
import { pokemonTabs } from "../utils/Constant.ts";
import {currentPokemonType, pokemonStatsType, pokemonStatType, PokemonType} from "../utils/Types.ts";
import {useEffect} from "react";

export default function Info({
                                 data,
                             }: {
    data: currentPokemonType | undefined;
}) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const progressBars = document.querySelectorAll("progress");
        progressBars.forEach((progressBar) => {
            progressBar.style.width = "10rem";
        });
    }, []);
    const createStatsArray = (types: PokemonType[], statType: pokemonStatType) => {
        const statsSet = new Set();
        types.forEach((type: PokemonType) => {
            const key = Object.keys(type)[0];
            type[key][statType]?.forEach((stat: string) => {
                if (!statsSet.has(stat)) {
                    statsSet.add(stat[0].toUpperCase() + stat.slice(1));
                }
            });
        });
        return Array.from(statsSet);
    };
    return (
        <>
            <div className="details">
                <h1 className="name">{data?.name}</h1>
                <h3>Type: {data?.types.join(" - ")}</h3>
                <h3>Evolution: {data?.evolutionLevel}</h3>
                <button onClick={() => dispatch(setPokemonTab(pokemonTabs.evolution))}>
                    See next evolution
                </button>
            </div>
            <div className="stats">
                <ul>
                    {data?.stats.map((stat: pokemonStatsType) => {
                        return (
                            <li key={stat.name}>
                                {stat.name}: {stat.value}
                                <progress max={100} value={stat.value} />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="battle-stats">
                {
                    <ul>
                        <li>
                            <span>Strengths:</span>
                            <span>
                {createStatsArray(
                    data?.types as unknown as PokemonType[],
                    "strength"
                ).join(", ")}
              </span>
                        </li>
                        <li>
                            <span>Weakness:</span>
                            <span>
                {createStatsArray(
                    data?.types as unknown as PokemonType[],
                    "weakness"
                ).join(", ")}
              </span>
                        </li>
                        <li>
                            <span>Resistant:</span>
                            <span>
                {createStatsArray(
                    data?.types as unknown as PokemonType[],
                    "resistance"
                ).join(", ")}
              </span>
                        </li>
                        <li>
                            <span>Vulnerable:</span>
                            <span>
                {createStatsArray(
                    data?.types as unknown as PokemonType[],
                    "vulnerable"
                ).join(", ")}
              </span>
                        </li>
                    </ul>
                }
                <button
                    onClick={() => dispatch(addPokemonToList(data!))}
                    className="add-pokemon"
                >
                    Add Pokemon
                </button>
            </div>
        </>
    );
}