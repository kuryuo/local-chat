import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/LoginPage.tsx";
import ChatRoom from "../pages/ChatRoom/ChatRoom.tsx";
import { ROUTES } from "@/shared/consts/const.ts";

function App() {

    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path="/chat/:chatname" element={<ChatRoom />} />
            </Routes>
        </Router>
    );
}

export default App;
