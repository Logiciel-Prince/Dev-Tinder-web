import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./layout/Body";
import Login from "./layout/Login";
import Profile from "./layout/Profile";

function App() {
    return (
        <>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
