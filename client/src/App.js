import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import OnImagesLoaded from "react-on-images-loaded";
import { AppProvider } from "./context";
import Admin from "./admin/Admin";
import Navbar from "./navbar/Navbar";
import "./css/App.scss";
import Header from "./header/Header";
import About from "./about/About";
import Services from "./services/Services";
import Portfolio from "./portfolio/Portfolio";
import Contact from "./contact/Contact";
import Loader from "./commonComponents/Loader";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isNavbarReady, setIsNavbarReady] = useState(false);
  const [isHeaderReady, setIsHeaderReady] = useState(false);
  const [isAboutReady, setIsAboutReady] = useState(false);
  const [isServicesReady, setIsServicesReady] = useState(false);
  const [isPortfolioReady, setIsPortfolioReady] = useState(false);
  const [isContactReady, setIsContactReady] = useState(false);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    if (
      areImagesLoaded &&
      isNavbarReady &&
      isHeaderReady &&
      isAboutReady &&
      isServicesReady &&
      isPortfolioReady &&
      isContactReady
    ) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [
    areImagesLoaded,
    isNavbarReady,
    isHeaderReady,
    isAboutReady,
    isServicesReady,
    isPortfolioReady,
    isContactReady,
  ]);

  return (
    <div className="App" ref={appRef}>
      <Router>
        <Switch>
          <Route exact path="/">
            <AppProvider>
              <Loader loading={loading} />
              <Navbar setIsNavbarReady={setIsNavbarReady} />
              <OnImagesLoaded
                onLoaded={() => {
                  setAreImagesLoaded(true);
                }}
                onTimeout={() => {
                  console.log("timeout");
                }}
                timeout={20000}
                className="onImagesLoaded"
              >
                <Header setIsHeaderReady={setIsHeaderReady} />
                <About setIsAboutReady={setIsAboutReady} />
                <Services setIsServicesReady={setIsServicesReady} />
                <Portfolio setIsPortfolioReady={setIsPortfolioReady} />
                <Contact
                  appRef={appRef}
                  setIsContactReady={setIsContactReady}
                />
              </OnImagesLoaded>
            </AppProvider>
          </Route>
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
