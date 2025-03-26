import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import {ROUTES} from "./constans/const";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CHAT} element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
