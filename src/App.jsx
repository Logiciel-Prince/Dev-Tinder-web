import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./layout/Body";
import Login from "./layout/Login";
import Profile from "./layout/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./layout/Feed";
import Connections from "./layout/Connections";
import Requests from "./layout/Requests";

function App() {
    return (
        <>
            <Provider store={appStore}>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="/" element={<Body />}>
                            <Route path="/" element={<Feed />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/connections" element={<Connections />} />
                            <Route path="/requests" element={<Requests />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
