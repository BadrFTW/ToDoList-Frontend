import React from 'react'
import axios from "axios";
import {useState} from "react";
const ToDoItem = ({task,setData ,setTask,setEdit ,setUpdatedId}) => {
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const handleDelete = async () => {

    const res =await axios.delete(`http://localhost:5000/api/tasks/${task.id}`, {});
    if(res.data)
            setData(res.data.data);
    else
        setData([]);

    }


    //

    const handleEdit =  () => {
        setEdit(true);
        setTask(task.task);
        setUpdatedId(task.id);
    }



    ///
    const handleComplete = async  () => {


        const res =await axios.put(`http://localhost:5000/api/tasks/completed/${task.id}`, {completed:!isCompleted});
        setIsCompleted(task.completed);
        setData(res.data.data);

    }
    return (

        <li className="w-80  h-30 bg-blue-100 rounded-lg shadow-md p-3  flex flex-row  justify-between">


            <div className="flex flex-col items-start justify-center gap-1 ">
                <p className="font-bold">{task.task}</p>
                <p className='font-light text-gray-700'>{ new Date(task.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
                <p>Status: {isCompleted ? "Completed ": "Active"}</p>

            </div>


            <div className="flex flex-col items-start justify-center gap-1 ">
                <button className="text-blue-600 cursor-pointer"  onClick={handleEdit}>Edit</button>
                <button className="text-red-500 cursor-pointer " onClick={handleDelete}>Delete</button>
                <button className="text-green-500 cursor-pointer" onClick={handleComplete}>Completed</button>

            </div>




        </li>
    )
}
export default ToDoItem
