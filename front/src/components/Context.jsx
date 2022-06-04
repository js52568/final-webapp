import React, {createContext, useEffect} from "react";
import axios from "axios";

const myContext = createContext({});
function Context(props) {

    useEffect(() => {
        
    }, []);

    return <myContext.Provider>{props.children}</myContext.Provider>

}

export default Context;