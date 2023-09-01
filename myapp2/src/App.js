import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleForm from "./Components/SimpleForm";
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import EditForm from "./Components/EditForm";
import AllUsers from "./Components/AllUsers";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtRoute from "./Components/ProtRoute";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div className="App">
      <h1 className=" header text-center mt-4">Maclareen Tours N Travels</h1>
      <Routes>
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signin />} />
        </>
        <>
          <Route
            path="/formDetails"
            element={<ProtRoute Component={SimpleForm} />}
          />
          <Route
            path="/allusers"
            element={<ProtRoute Component={AllUsers} />}
          />
          <Route
            path="/edit/:id"
            element={<ProtRoute Component={EditForm} />}
          />
        </>
        {/* )} */}
      </Routes>
    </div>
  );
}

export default App;
