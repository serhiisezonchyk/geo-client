import Map from "./pages/Map";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";

import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check, fetchPoliciesForUser } from "./http/userApi";
import { BrowserRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
        fetchPoliciesForUser(data.id).then((policies)=>{
          user.setPolicies(policies);
        })
      }).catch(()=>{
        user.setUser({});
        user.setIsAuth(false);
        user.setPolicies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Spinner
        className="d-flex justify-content-center align-items-center "
        animation={"grow"}
      />
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
