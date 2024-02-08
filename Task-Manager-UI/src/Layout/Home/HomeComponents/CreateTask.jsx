import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Authentication/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useTasks from "../../../Hooks/useTasks";
import TaskBoardRow from "./TaskBoard/TaskBoardRow";
import TasksBoard from "./TaskBoard/TasksBoard";



const CreateTask = () => {

    const {user} =useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const [startDate, setStartDate] = useState(new Date());
    const [difficultyValue, setDifficultyValue] = useState('easy')
    const day = startDate.getDate()
    const month = startDate.getMonth()+1
    const year = startDate.getFullYear()
    const [,,refetch] = useTasks()

    const handleAddPhone = e =>{
        e.preventDefault()
        const form = e.target
        const name = user?.displayName
        const title = form.title.value
        const status = 'Incomplete'
        const difficulty = difficultyValue
        const date = day+'/'+month+'/'+year
        const description = form.description.value
        const addTask = {title, name, difficulty,  date, description, status}

        axiosPublic.post(`/tasks`, addTask)
        .then(data =>{
            if(data.status == 200){
                    refetch()
                    e.target.reset()
                    Swal.fire({position: "top-end",icon: "success", title: "Task Created", showConfirmButton: false, timer: 1500 });
                }
        })



    }

    const handleDifficulty = e =>{
        const difficulty = e.target.value
        setDifficultyValue(difficulty)
    }


    return (
        <div className=' flex flex-col'>
        <button className="btn btnTask w-fit mx-auto " onClick={()=>document.getElementById('my_modal_4').showModal()}>Add Task</button>
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <div className="modal-action flex flex-col">
                <form  onSubmit={handleAddPhone} className="lg:space-y-10 form my-10">
                                <div className=" md:gap-6 ">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="title"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Title" required />
                                </div>
                                
                                    <div className="lg:flex justify-around items-end gap-20 space-y-10 lg:space-y-0 mb-10">
                                        <div className="relative text-xl lg:text-3xl lg:w-[500px] mr-auto">
                                            <select className="bg-[#e11d48] text-[#FFDDB6] " onChange={handleDifficulty}>
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
                                <textarea name="description" placeholder="Description"  className="textarea textarea-bordered h-[200px] textarea-lg w-full " ></textarea>
                                </div>
                        <button type="submit" className="btnTask btn">Add Task</button>
                        </form>
                        <form method="dialog" className="w-full">
                        <button className="btn">Close</button>

                </form>
                
                </div>
            </div>
        </dialog>
            <div className=" ">

            <TasksBoard></TasksBoard>
        </div>

        </div>                                                                                       
    );
};

export default CreateTask;