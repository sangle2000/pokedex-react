export interface AppTypeInitialState {
    toasts: string[];
    userInfo: undefined | { email: string };
}

export interface PokemonTypeInitialState {
    allPokemon: undefined | genericPokemonType[];
    randomPokemon: undefined | generatedPokemonType[];
    compareQueue: generatedPokemonType[];
    userPokemon: userPokemonType[];
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
