import Navbar from "./sections/Navbar.tsx";
import Footer from "./sections/Footer.tsx";
import Background from "./components/Background.tsx";
import "./scss/index.scss"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Search from "./pages/Search.tsx";
import MyList from "./pages/MyList.tsx";
import About from "./pages/About.tsx";
import Pokemon from "./pages/Pokemon.tsx";
import WrappedCompare from "./pages/Compare.tsx";
import {ToastContainer, ToastOptions, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {useEffect} from "react";
import {clearToast, setUserStatus} from "./app/slices/AppSlice.ts";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/FirebaseConfig.ts";

function App() {

    const {toasts} = useAppSelector(({app}) => app)
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                dispatch(setUserStatus({ email: currentUser.email }));
            }
        })
    }, [dispatch]);

    useEffect(() => {
        if (toasts.length) {
            const toastOptions: ToastOptions = {
                position: "bottom-right",
                autoClose: 2000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            }
            toasts.forEach((message: string) => {
                toast(message, toastOptions);
            })

            dispatch(clearToast())
        }
    }, [toasts, dispatch]);

    return (
        <>
            <div
                className="main-container"
            >
                <Background/>
                <BrowserRouter>
                    <div
                        className="app"
                    >
                        <Navbar/>
                        <Routes>
                            <Route element={<Search/>} path="/search"/>
                            <Route element={<MyList/>} path="/list"/>
                            <Route element={<About/>} path="/about"/>
                            <Route element={<WrappedCompare/>} path="/compare"/>
                            <Route element={<Pokemon/>} path="/pokemon/:id"/>
                            <Route element={<Navigate to="/pokemon/1"/>} path="*"/>
                        </Routes>
                        <Footer/>
                        <ToastContainer/>
                    </div>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
