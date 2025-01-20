import {PokemonType, userPokemonType} from "../utils/Types.ts";
import {IoGitCompare} from "react-icons/io5";
import {FaPlus, FaTrash} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../app/hooks.ts";
import {addToCompare} from "../app/slices/PokemonSlice.ts";
import {setToast} from "../app/slices/AppSlice.ts";
import {addPokemonToList} from "../app/reducers/addPokemonToList.ts";
import {removePokemon} from "../app/reducers/removePokemonFromUserList.ts";

function PokemonCardGrid({pokemon}: { pokemon: userPokemonType[] }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <>
            <div
                className="pokemon-card-grid-container"
            >
                <div
                    className="pokemon-card-grid"
                >
                    {
                        pokemon && pokemon.length > 0 &&
                        pokemon?.map((data: userPokemonType) => {
                            return (
                                <div
                                    key={data.id}
                                    className="pokemon-card"
                                >
                                    <div
                                        className="pokemon-card-list"
                                    >
                                        {
                                            location.pathname.includes("/pokemon") || location.pathname.includes("/search") ?
                                                (
                                                    <FaPlus className="plus" onClick={() => {
                                                        dispatch(addPokemonToList(data))
                                                    }}/>
                                                ) : <FaTrash className="trash" onClick={async () => {
                                                    await dispatch(removePokemon({id: data.firebaseId!}))
                                                    dispatch(setToast("Pokemon removed successfully."))
                                                }}/>
                                        }
                                    </div>

                                    <div
                                        className="pokemon-card-compare"
                                    >
                                        <IoGitCompare
                                            onClick={() => {
                                                dispatch(addToCompare(data))
                                                dispatch(setToast(`${data.name} has been added to Compare Queue.`))
                                            }}
                                        />
                                    </div>

                                    <h3
                                        className="pokemon-card-title"
                                    >
                                        {data.name}
                                    </h3>

                                    <img
                                        src={data.image}
                                        alt={data.name}
                                        className="pokemon-card-image"
                                        loading="lazy"
                                        onClick={() => navigate(`/pokemon/${data.id}`)}
                                    />

                                    <div
                                        className="pokemon-card-types"
                                    >
                                        {data.types?.map((type: PokemonType, index) => {
                                            const keys = Object.keys(type);
                                            return (
                                                <div
                                                    key={index}
                                                    className="pokemon-card-types-detail"
                                                >
                                                    <img
                                                        src={type[keys[0]].image}
                                                        alt={keys[0]}
                                                        className="pokemon-card-types-detail-image"
                                                        loading="lazy"
                                                    />

                                                    <h6
                                                        className="pokemon-card-types-detail-name"
                                                    >
                                                        {keys[0]}
                                                    </h6>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PokemonCardGrid