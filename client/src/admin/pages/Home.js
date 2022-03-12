import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../commonComponents/Loader";
import Sidebar from "./components/Sidebar";
import Mainbar from "./components/Mainbar";
import Homescreen from "./components/sceens/Homescreen";
import { Switch, Route } from "react-router-dom";
import Navigationscreen from "./components/sceens/Navigationscreen";
import Mainscreen from "./components/sceens/Mainscreen";
import Aboutscreen from "./components/sceens/Aboutscreen";
import Servicesscreen from "./components/sceens/Servicesscreen";
import Portfolioscreen from "./components/sceens/Portfolioscreen";
import Contactscreen from "./components/sceens/Contactscreen";

const mainClass = "admin-screen";

const Home = ({ history, match }) => {
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/admin/login");
    }

    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private/", config);
        setUsername(data.username);
        setIsReady(true);
      } catch (error) {
        // localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/admin/login");
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!isReady) {
    return <Loader loading={true} />;
  }

  return (
    <>
      <div className={mainClass}>
        <div className={`${mainClass}__content`}>
          <Sidebar mainClass={mainClass} />
          <Mainbar
            mainClass={mainClass}
            logoutHandler={logoutHandler}
            username={username}
          >
            <Switch>
              <Route exact path={`${match.path}/`}>
                <Homescreen username={username} />
              </Route>
              <Route exact path={`${match.path}/navigation`}>
                <Navigationscreen />
              </Route>
              <Route exact path={`${match.path}/mainscreen`}>
                <Mainscreen />
              </Route>
              <Route exact path={`${match.path}/aboutscreen`}>
                <Aboutscreen />
              </Route>
              <Route exact path={`${match.path}/servicesscreen`}>
                <Servicesscreen />
              </Route>
              <Route exact path={`${match.path}/portfolioscreen`}>
                <Portfolioscreen />
              </Route>
              <Route exact path={`${match.path}/contactscreen`}>
                <Contactscreen />
              </Route>
            </Switch>
          </Mainbar>
        </div>
      </div>
    </>
  );
};

export default Home;
