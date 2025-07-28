import React, {useState,useEffect} from 'react'
import ToDoItem from "../components/ToDoItem.jsx";
import axios from 'axios'
const Home = () => {

    const [tab, setTab] = useState(1);
    const [task, setTask] = useState('');
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updatedId, setUpdatedId] = useState()

    const handleTab = (tab) => {
        setTab(tab);
    }

    const handleAddTask =  (e) => {
        e.preventDefault();
         axios.post("http://localhost:5000/api/tasks", {task} )
             .then((res)=>{
                 setTask('')
                 setData(res.data.data);
             })
    }

    const handleUpdateTask  = async () => {

        const res = await axios.put(`http://localhost:5000/api/tasks/${updatedId}`, {task})
        setEdit(false);
        setTask("")
        setData(res.data.data);


    }

    useEffect( () => {

        const data =  axios.get("http://localhost:5000/api/tasks")
            .then(res => setData(res.data.data))


    },[])
    return (
        <div className=" w-screen h-screen flex  ">
            <div className=" flex flex-col items-center justify-start h-screen  w-screen gap-5">


                    <h2 className="text-xl font-bold text-gray-900 p-5">
                        TO DO LIST
                    </h2>



                <div className="flex items-center gap-3" >

                    <input  value={task} onChange={(e)=> setTask(e.target.value)} className=" border py-1 px-4 outline-none rounded-xl text-gray-500 border-gray-400  " placeholder="to do"/>
                    {!edit ? <button className="bg-blue-300 py-1 px-4  rounded-4xl  cursor-pointer" onClick={handleAddTask} >
                        add
                    </button> : <button className="bg-green-300 py-1 px-4  rounded-4xl  cursor-pointer" onClick={handleUpdateTask} >
                        update task
                    </button>}
                </div>
                <div className='flex w-80 justify-evenly mt-4'>
                    <p className='cursor-pointer' onClick={()=> handleTab(1) }>All</p>
                    <p className='cursor-pointer' onClick={()=> handleTab(2)} >Active</p>
                    <p className='cursor-pointer' onClick={()=> handleTab(3)}> Completed</p>


                </div>

                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  mt-5c lg:mt-14  md:mt-8  '>

                {data ? tab===1 && data.map((task,index) => (
                    <ToDoItem task={task} key={index}  setData={setData} setTask={setTask} setEdit={setEdit} edit={edit} setUpdatedId={setUpdatedId}  />
                ))


                    :<p>not found</p> }
                    {data ? tab===2 && data.filter(task=>task.completed == false).map((task,index) => (
                        <ToDoItem task={task} key={index}  setData={setData} setTask={setTask} setEdit={setEdit} edit={edit} setUpdatedId={setUpdatedId}  />
                    ))


                        :<p>not found</p> }

                    {data ? tab===3 && data.filter(task=>task.completed == true).map((task,index) => (
                        <ToDoItem task={task} key={index}  setData={setData} setTask={setTask} setEdit={setEdit} edit={edit} setUpdatedId={setUpdatedId}  />
                    ))


                        :<p>not found</p> }



                </ul>

            </div>
        </div>
    )
}
export default Home
