import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Message from "./components/Message/Message";
import UserInput from "./components/UserInput/UserInput";
import { ROUTES } from "./constans/const";
import RoomHeader from "./components/RoomHeader/RoomHeader.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/message' element={<Message />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path= '/input' element={<UserInput/>} />
          <Route path= '/header' element={<RoomHeader/>} />
      </Routes>
    </Router>
  );
}

export default App;
 