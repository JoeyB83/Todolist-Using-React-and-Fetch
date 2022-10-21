import React , {useState} from "react";

const Tarea = (props)=>{
    let newArr = []
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
//--------aqui agrega la lista nueva por cada elemento
    props.lista.map((elemento)=>{
        newArr.push({
            label:elemento,
            done: false
        })
    })
    console.log(newArr)
    fetch('http://assets.breatheco.de/apis/fake/todos/user/lrobles',{
        method:"PUT",
        body: JSON.stringify(newArr),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp=>{
        console.log(resp.status)
        return resp.json()
    })
    .then(data=>{
        console.log(data)
    })
    .catch(error=>{
        console.error(error);
    })
//-----------------------------------------------------------------
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