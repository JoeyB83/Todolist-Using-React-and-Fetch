import React from "react";
import { useState } from "react";
import IngresarTarea from "./IngresarTarea.jsx";
import Tarea from "./tarea.jsx"
import BorrarLista from "./BorrarLista.jsx";

//create your first component
const Home = () => {

	const [lista, setLista] = useState([]);

	fetch('https://assets.breatheco.de/apis/fake/todos/user/lrobles', {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(resp => {
			console.log(resp.status)
			if(resp.status== 404){
				console.log("NO SE ENCUENTRA")
				fetch('https://assets.breatheco.de/apis/fake/todos/user/lrobles', {
					method: "POST",
					body: "[]",
					headers: {
						"Content-Type": "application/json"
					}
				})
			} 
			return resp.json();
		})
		.then(data => {
			console.log(data)
		})
		.catch(error => {
			console.error(error);
		})


	const agregarTarea = (tarea) => {
		setLista(lista.concat(tarea));
	}

	const borrar = (indice) => {
		const filtro = lista.filter((e, index) => index !== indice);
		setLista(filtro)

	}


	return (
		<div className="text-center">
			<h1 className="text-center mt-5">TODO LIST</h1>
			<div className="shadow-lg col-6 mx-auto">
				<IngresarTarea nuevaTarea={agregarTarea} api={lista} />
				{lista.map((e, index) =>
					<Tarea elemento={e} indice={index} borrar={borrar} lista={lista}/>
				)}
			</div>
			<BorrarLista lista={setLista}/>
		</div>
	);
};

export default Home;
