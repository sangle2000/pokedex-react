import Wrapper from "../sections/Wrapper.tsx";
import {useAppSelector} from "../app/hooks.ts";
import CompareContainer from "../components/CompareContainer.tsx";

function Compare() {

    const { compareQueue } = useAppSelector(({ pokemon }) => pokemon);

    return (
        <>
            <div
                className="compare"
            >
                <CompareContainer
                    pokemon={compareQueue[0]}
                    isEmpty={compareQueue.length < 1}
                />

                <CompareContainer
                    pokemon={compareQueue[1]}
                    isEmpty={compareQueue.length < 2}
                />
            </div>
        </>
    );
}

// Wrap Compare
const WrappedCompare = Wrapper(Compare);

export default WrappedCompare;
