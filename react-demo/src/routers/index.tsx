import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/Error/404";
import config from "./config";

const Routers = () => {
    return (
        <Router>
            <Routes>
                {config.combineRoutes.map((props: any, i: number) => (
                    <Route
                        key={i}
                        path={props.path}
                        element={React.createElement(
                            props.layout,
                            { ...props },
                            props.element &&
                                React.createElement(props.element, props)
                        )}
                    />
                ))}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default Routers;
