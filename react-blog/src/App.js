import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { Route, Routes } from "react-router-dom";

import LoggedIn from "./utils/LoggedIn";
import IsNotLoggedIn from "./utils/isNotLoggedIn";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route element={<IsNotLoggedIn user={user} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<LoggedIn user={user} />}>
          <Route path="/settings" element={<Settings />} />
          <Route path="/write" element={<Write />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<Single />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
