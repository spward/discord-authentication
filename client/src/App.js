import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Callback from "./components/Callback/Callback";
import Header from "./components/Header/Header";
import "./App.css";

const App = ({ userId }) => {
  //id, userid from storage will be replaced once you add token to your backend
  const [id, setId] = useState(userId);
  const [userInfo, setUserInfo] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [backendChecked, setBackendChecked] = useState(false);
  useEffect(() => {
    if (code && !userInfo && !backendChecked) {
      fetch(`callback?code=${code}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.userInfo && response.userInfo.email) {
            setUserInfo(response.userInfo);
            //in the future you will be storing token generated from your backend
            localStorage.setItem("userId", response.userInfo.id);
            setId(response.userInfo.id);
            setError("");
          } else {
            setError("sorry something when wrong");
          }
        });
    }
  }, [code, userInfo, backendChecked]);

  useEffect(() => {
    if (!userInfo && !backendChecked && (userId || (userInfo && userInfo.id))) {
      const id = userId || userInfo.id;
      fetch(`http://localhost:9000/userInfo/${id}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.userInfo && response.userInfo.email) {
            setUserInfo(response.userInfo);
          }
          setError("");
          setBackendChecked(true);
        });
    }
  }, [userInfo, backendChecked, userId]);

  const handleLogout = () => {
    const id = userId || userInfo.id;

    fetch(`http://localhost:9000/logout/${id}`)
      .then((res) => res.json())
      .then(() => {
        setCode("");
        setUserInfo({});
        setError("");
        setBackendChecked(false);
        localStorage.removeItem("userId");
        setId(null);
      });
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/dashboard">
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <Dashboard
              userInfo={userInfo}
              error={error}
              setError={setError}
              backendChecked={backendChecked}
              code={code}
              userId={id}
            />
          </Route>
          <Route exact path="/callback">
            <Callback setCode={setCode} />
          </Route>
          <Route exact path="/">
            <Home userInfo={userInfo} error={error} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
