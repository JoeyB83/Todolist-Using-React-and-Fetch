import React from "react";
import { useState } from "react";
import IngresarTarea from "./IngresarTarea.jsx";
import Tarea from "./tarea.jsx"

//create your first component
const Home = () => {

	const [lista, setLista] = useState([]);

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
				<IngresarTarea nuevaTarea={agregarTarea} />
				{lista.map((e, index) =>
					<Tarea elemento={e} indice={index} borrar={borrar}/>
				)}
			</div>
		</div>
	);
};

export default Home;
