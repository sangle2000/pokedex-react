import PokeBall from "../assets/pokeball.png"
import PokeBall2 from "../assets/pokeball2.png"

function Background() {
    return (
        <>
            <div
                className="background"
            >
                <img
                    src={PokeBall}
                    alt="PokeBall"
                    className="pokeball pokeball1"
                />

                <img
                    src={PokeBall2}
                    alt="PokeBall"
                    className="pokeball pokeball2"
                />

                <img
                    src={PokeBall}
                    alt="PokeBall"
                    className="pokeball pokeball3"
                />

                <img
                    src={PokeBall2}
                    alt="PokeBall"
                    className="pokeball pokeball4"
                />

                <img
                    src={PokeBall}
                    alt="PokeBall"
                    className="pokeball pokeball5"
                />

                <img
                    src={PokeBall2}
                    alt="PokeBall"
                    className="pokeball pokeball6"
                />
            </div>
        </>
    )
}

export default Background;