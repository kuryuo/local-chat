import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ROUTES } from "./constans/const";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
 