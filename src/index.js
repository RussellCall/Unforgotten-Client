import React from "react"
import ReactDOM from "react-dom"
import 'mapbox-gl/dist/mapbox-gl.css'
import { BrowserRouter as Router } from "react-router-dom"
import { App } from "./components/App.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
