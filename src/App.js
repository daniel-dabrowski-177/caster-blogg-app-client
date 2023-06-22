import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import About from "./pages/about/About";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import { useContext } from "react";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={<Write />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

// To notice
// We are no longer using 'react-router-dom' Switch
// Instead of this, we are using Routes element

export default App;
