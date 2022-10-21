import { useState } from "react";
import React from "react";

const IngresarTarea = (props) => {

    const [input, setInput] = useState("");
    const tarea = (event) => {
        setInput(event.target.value)
    }

    const ingresarTarea = (event) => {
        if (event.key == "Enter" && input !== "") {                 
                props.nuevaTarea(input);
                setInput("");
        }
    }

    return (
        <div className="w-100" style={{ height: "60px" }}>
            <input id="entrada" className="border border-0  float-start h-100 mx-4 w-75" type="text" placeholder="What needs be done?"
                onChange={tarea} value={input} onKeyDown={ingresarTarea} />
        </div>
    )
}

export default IngresarTarea;