import {FcGoogle} from "react-icons/fc";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {firebaseAuth, usersRef} from "../utils/FirebaseConfig.ts";
import { query, where, addDoc, getDocs } from "firebase/firestore";
import {useAppDispatch} from "../app/hooks.ts";
import {setUserStatus} from "../app/slices/AppSlice.ts";

function Login() {
    const dispatch = useAppDispatch();
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        const {
            user: { email, uid },
        } = await signInWithPopup(firebaseAuth, provider);

        if (email) {
            const firestoreQuery = query(usersRef, where("uid", "==", uid))
            const fetchUser = await getDocs(firestoreQuery);
            if (fetchUser.docs.length === 0) {
                await addDoc(usersRef, { uid, email })
            }
            dispatch(setUserStatus({ email }))
        }
    }

    return (
        <>
            <div
                className="login"
            >
                <button
                    className="login-btn"
                    onClick={handleLogin}
                >
                    <FcGoogle />
                    Login with Google
                </button>
            </div>
        </>
    )
}

export default Login;