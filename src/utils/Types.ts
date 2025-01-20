export interface AppTypeInitialState {
    toasts: string[];
    userInfo: undefined | { email: string };
    currentPokemonTab: string;
}

export interface PokemonTypeInitialState {
    allPokemon: undefined | genericPokemonType[];
    randomPokemon: undefined | generatedPokemonType[];
    compareQueue: generatedPokemonType[];
    userPokemon: userPokemonType[];
    currentPokemon: undefined | currentPokemonType;
}

export interface genericPokemonType {
    name: string,
    url: string
}

export interface generatedPokemonType {
    id: number,
    name: string,
    image: string,
    types: PokemonType[]
}

export interface PokemonType {
    [key: string]: {
        image: string,
        strength: string[],
        weakness: string[],
        resistance: string[],
        vulnerable: string[],
    }
}

export interface userPokemonType extends generatedPokemonType {
    firebaseId?: string;
}

export type pokemonStatType = "vulnerable" | "weakness" | "strength" | "resistance";

export interface pokemonStatsType {
    name: string;
    value: string;
}

export interface currentPokemonType {
    id: number;
    name: string;
    types: PokemonType[];
    image: string;
    stats: pokemonStatsType[];
    encounters: string[];
    evolutionLevel: number;
    evolution: { level: number; pokemon: { name: string; url: string } }[];
    pokemonAbilities: { abilities: string[]; moves: string[] };
}

export interface Species {
    name: string;
    url: string;
}

export interface evolutionDataType {
    pokemon: Species & { url: string };
    level: number;
}

export interface evolutionType {
    species: Species;
    evolves_to: evolutionType[];
}

export interface EncounterType {
    location_area: {
        name: string;
    };
}
