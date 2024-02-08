import { FaPencil } from "react-icons/fa6";
import { BsEraser } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useTasks from '../../../../Hooks/useTasks';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const TaskBoardRow = ({task}) => {
    const [, , refetch] = useTasks()
    const [difficultyValue, setDifficultyValue] = useState('easy')
    const [startDate, setStartDate] = useState(new Date());
    const axiosPublic = useAxiosPublic()
    const handleDelete =() =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/tasks/${task._id}`)
            .then(()=>{
                refetch()
                Swal.fire({position: "top-end",icon: "success", title: "Task Deleted", showConfirmButton: false, timer: 1500 });

            })
            }
          });
        
    }
    const handleDifficulty = e =>{
        const difficulty = e.target.value
        setDifficultyValue(difficulty)
    }
    const handleUpdateTask = e =>{
        const day = startDate.getDate()
        const month = startDate.getMonth()
        const year = startDate.getFullYear()
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const difficulty = difficultyValue
        const date = day+'/'+month+'/'+year
        const description = form.description.value
        const addTask = {title, difficulty,  date, description}

        axiosPublic.put(`/tasks/${task._id}`, addTask)
        .then(data =>{
            if(data.status == 200){
                    refetch()
                    e.target.reset()
                    Swal.fire({position: "top-end",icon: "success", title: "Task updated", showConfirmButton: false, timer: 1500 });
                }
        })
    }

    const handleComplete=()=>{
        axiosPublic.patch(`/tasks/${task._id}`, {statuss:'Completed'})
        .then(()=>{
            refetch()
            Swal.fire({position: "top-end",icon: "success", title: "Task Completed", showConfirmButton: false, timer: 1500 });
        })
    }
    return (
             <tr className={`${task.difficulty == 'Low'? 'bg-blue-300 text-white' : task.difficulty == 'Medium' ? 'bg-yellow-400 text-black': 'bg-red-500 text-white'} border-2 border-black w-fit rounded-lg `}>
                <th>{task.title}</th>
                <th>{task.date}</th>
                <th>{task.difficulty}</th>
                <th className="flex gap-2">
                    <button onClick={handleComplete} title="Mark As Complete" className="bg-white text-green-400 rounded-full p-2"><TiTick /></button>

                    <button title="Edit" className="bg-white text-black rounded-full p-2" onClick={()=>document.getElementById(task._id).showModal()}><FaPencil /></button>
                        <dialog id={task._id} className="modal">
                            <div className="modal-box w-11/12 max-w-5xl">
                                <div className="modal-action flex flex-col">
                                <form  onSubmit={handleUpdateTask} className="lg:space-y-10 form my-10">
                                                <div className=" md:gap-6 ">
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input defaultValue={task.title} type="text" name="title"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Title" required />
                                                </div>
                                                
                                                    <div className="lg:flex justify-around items-end gap-20 space-y-10 lg:space-y-0 mb-10">
                                                        <div className="relative text-xl lg:text-3xl lg:w-[500px] mr-auto">
                                                            <select defaultValue={task.difficulty} className="bg-[#e11d48] text-[#FFDDB6] " onChange={handleDifficulty}>
                                                                <option value="Low">Low</option>
                                                                <option value="Medium">Medium</option>
                                                                <option value="High">High</option>
                                                            </select>
                                                        </div>

                                                        <div className="lg:w-[500px] mx-auto  text-[#FFDDB6]">
                                                            <h1 className="text-black text-xl">Dead line:</h1>
                                                            <DatePicker className="lg:text-3xl bg-[#e11d48] text-center text-xl" selected={startDate} onChange={(date)  => setStartDate(date)} />
                                                        </div>

                                                        
                                                        
                                                    
                                                    </div>
                                                </div>
                                                <div>
                                                    <textarea  defaultValue={task.description} name="description" placeholder="Description"  className="textarea text-black textarea-bordered h-[200px] textarea-lg w-full " ></textarea>
                                                </div>
                                        <button type="submit" className="btnTask btn">Update Task</button>
                                        </form>
                                        <form method="dialog" className="w-full">
                                        <button className="btn">Close</button>

                                </form>
                                
                                </div>
                            </div>
                        </dialog>
                    <button onClick={handleDelete} title="Delete" className="bg-white text-red-500 rounded-full p-2"><BsEraser /></button>
                </th>
                <th ><h1 className={`${task.stats == 'Completed' ? 'text-green-500' : 'text-red-500'} bg-white p-1 rounded-lg w-fit`}>{task.status}</h1></th>
            </tr>
    );
};

export default TaskBoardRow;