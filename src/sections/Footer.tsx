import { MdOutlinePowerSettingsNew } from "react-icons/md";
import {useAppDispatch} from "../app/hooks.ts";
import {firebaseAuth} from "../utils/FirebaseConfig.ts";
import { signOut } from "firebase/auth"
import {setToast, setUserStatus} from "../app/slices/AppSlice.ts";

function Footer() {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        signOut(firebaseAuth)
        dispatch(setUserStatus(undefined))
        dispatch(setToast("Logged out successfully from Firebase"))
    }

    return (
        <>
            <footer>
                <div
                    className="block"
                >

                </div>

                <div
                    className="data"
                >

                </div>

                <div
                    className="block"
                >
                    <MdOutlinePowerSettingsNew
                        onClick={handleLogout}
                    />
                </div>
            </footer>
        </>
    )
}

export default Footer;