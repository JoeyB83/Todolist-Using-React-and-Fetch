import React from "react";

const BorrarLista =(props)=>{
    const borrar = ()=>{
        fetch('http://assets.breatheco.de/apis/fake/todos/user/lrobles',{
            method:"DELETE",
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
        props.lista([])
    }
    return(
        <button className="btn-danger mt-3 col-1" onClick={borrar}> BORRAR LISTA</button>
    )
}

export default BorrarLista;