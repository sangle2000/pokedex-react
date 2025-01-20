import PokeBallIcon from "../assets/pokeball-icon.png"
import {GiHamburgerMenu} from "react-icons/gi";
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";

function Navbar() {
    const location = useLocation();

    // eslint disable-next-line react-hooks/exhaustive-deps
    const navigationRoutes = [
        {
            name: "Search",
            route: "/search"
        },
        {
            name: "Compare",
            route: "/compare"
        },
        {
            name: "Pokemon",
            route: "/pokemon"
        },
        {
            name: "My List",
            route: "/list"
        }, {
            name: "About",
            route: "/about"
        }
    ]

    useEffect(() => {
        const index = navigationRoutes.findIndex(({route}) => location.pathname.includes(route));
        ul(index)
    }, [location.pathname, navigationRoutes])

    function ul (index: number) {
        const underline = document.querySelectorAll<HTMLElement>(".underline");
        for (let i = 0; i < underline.length; i++) {
            underline[i].style.transform = "translate3d(" + index * 100 + "%, 0, 0)"
        }
    }

    return (
        <>
            <nav>
                <div
                    className="block"
                >
                    <img
                        src={PokeBallIcon}
                        alt="PokeBall Icon"
                    />
                </div>

                <div
                    className="data"
                >
                    <ul>
                        <div className="underline"></div>
                        <div className="underline"></div>
                        <div className="underline"></div>

                        {navigationRoutes.map(({name, route}, index) => (
                            <Link to={route} key={index}>
                                <li>
                                    {name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div
                    className="block"
                >
                    <GiHamburgerMenu/>
                </div>
            </nav>
        </>
    )
}

export default Navbar;