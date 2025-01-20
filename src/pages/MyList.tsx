import Wrapper from "../sections/Wrapper.tsx";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import Login from "../parts/Login.tsx";
import PokemonCardGrid from "../components/PokemonCardGrid.tsx";
import {useEffect} from "react";
import {getUserPokemon} from "../app/reducers/getUserPokemon.ts";

function MyList() {
    const { userInfo } = useAppSelector(state => state.app)
    const { userPokemon } = useAppSelector(state => state.pokemon)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserPokemon())
    }, [userInfo, dispatch]);

    return (
        <>
            <div
                className="list"
            >
                {
                    userInfo ? <PokemonCardGrid pokemon={userPokemon} /> : <Login />
                }
            </div>
        </>
    )
}

const WrapperMyList = Wrapper(MyList);

export default WrapperMyList;