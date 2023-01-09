import React, { useState, useEffect } from "react";
import Item from "./Item.jsx";

export const Input = () => {
    const [list, addToList] = useState([]);

    const url = `https://assets.breatheco.de/apis/fake/todos/user/joeyb83`

    useEffect( () => {
        function getFetch() {
            return fetch(url)
            .then(response => {
                if(!response.ok){
                    console.log("Response from GET is not ok")
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => {
                console.log('Looks like there was a problem doing GET: \n', error);
                return false
            })
        }

        function postFetch() {
            return fetch(url, {
                method: "POST",
                body: JSON.stringify([]),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if(!response.ok){
                    console.log("Response from POST is not ok")
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(
                console.log("User list initialized")
            )
            .catch(error => {
                console.log('Looks like there was a problem doing POST: \n', error);
                return false
            })
        }

        const getUserList = async () => {
            let userList = []
            let getFetchResult = await getFetch()

            if(getFetchResult === false){
                await postFetch()
            }
            else{
                userList = getFetchResult
            }
            addToList(userList)
        }
        getUserList();
    },[])

    const deleteTask = (index) => {
        const newListOfTodos = list.filter((_, idx) => idx !== index)
        addToList(newListOfTodos)

        fetch(url, {
            method: "PUT",
            body: JSON.stringify(newListOfTodos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(!response.ok){
                console.log("Response from PUT is not ok")
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(
            console.log("User list initialized")
        )
        .catch(error => {
            console.log('Looks like there was a problem doing PUT: \n', error);
            return false
        })
    }

    const cleanTasks = async () =>{
		await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		addToList([])        
		
		await fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(response =>{
				if(!response.ok){
					console.log("Response from POST is not ok")
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(
				console.log("User list initialized")
				)
			.catch(error => {
				console.log('Looks like there was a problem doing POST: \n', error);
				return false
			})	
	}

    const listOfTodos= list.map((task, index)=>
	{
	return <li 
    className="list-group-item d-flex justify-content-between" 
    key={index}>{task.label}
	<button 
    id={index}     
    className="button btn-close justify-content-end" 
    onClick={()=>deleteTask(index)}>
    </button>
	</li>
	})
	console.log("todoList:", list)
	return (
		<div className="w-50 m-auto">
			<h1 className="text-center my-3">Todos</h1>
			<button                
				className="btn btn-danger"
				onClick={cleanTasks}
			>
				Clean All Tasks
			</button>
			<ul className="list-group">
					<Item 
						list={list}
						handleAddToList={value=>addToList(value)}
						url={url}

					/>
				{
					listOfTodos.length > 0 ?
					listOfTodos
					:
					<li className="list-group-item">No tasks, add a task</li>
				}
				{(list.length > 0) ? <li className="list-group-item"><b>{list.length}</b> items left</li> : null }
			</ul>
		</div>
	);
}