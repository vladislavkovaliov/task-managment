import React from "react";
import { DashboardScreen, ProcessScreen } from "./screens";
import { Header } from "./modules";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";

import "./App.css";

function App() {
    return (
        <>
            <Router>
                <Header />
                <AnimationApp />
            </Router>
        </>
    );
}

export function AnimationApp() {
    let location = useLocation();

    return (
        <TransitionGroup className="relative">
            <CSSTransition key={location.key} classNames="fade" timeout={250}>
                <Switch location={location}>
                    <Route
                        exact
                        path="/"
                        children={
                            <div className="fill">
                                <DashboardScreen />
                            </div>
                        }
                    />
                    <Route
                        exact
                        path="/jobs/:jobId"
                        children={
                            <div className="fill">
                                <ProcessScreen />
                            </div>
                        }
                    />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default App;
