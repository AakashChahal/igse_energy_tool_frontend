// import logo from "./logo.svg";
import "./App.css";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import { useEffect } from "react";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";

function App() {
    useEffect(() => {
        fetch("http://localhost:8080/")
            .then((res) => {
                console.log(res);
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.error("error occured: ", err);
            });
    });

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forgot" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
