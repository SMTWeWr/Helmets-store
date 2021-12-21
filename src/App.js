import React from "react";
import {Header} from "./components/Header/Header";
import {Home} from "./pages/Home";
import {Route} from "react-router-dom";
import Cart from "./pages/Cart";


function App() {
    return (
        <div className="wrapper">
         <Header />
            <div className="content">
                <Route exact path='/' component={Home} />
                <Route path='/cart' component={Cart} />
            </div>
        </div>
    )
}

export default App;
