import React , {useState} from "react";

const Tarea = (props)=>{
    const [visible,setVisible] = useState("hidden");
    const borrar = ()=>{
        props.borrar(props.indice)
    }

    const botonX = ()=>{
        setVisible("visible")
    }

    const botonXfuea = ()=>{
        setVisible("hidden")
    }

    return (
        <div className="w-100 d-flex" style={{height:"60px"}} onMouseEnter={botonX} onMouseLeave={botonXfuea}>
            <div className="col-11" >
                <span className="ms-4 pt-3 float-start">{props.elemento}</span>
            </div>
            <div style={{visibility:visible}}className="col-1 d-flex align-items-center"  onClick={borrar}>
                X
            </div>
        </div>
    )
}

export default Tarea;