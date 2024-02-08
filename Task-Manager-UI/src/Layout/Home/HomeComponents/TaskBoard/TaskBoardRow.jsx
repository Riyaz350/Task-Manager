import { FaPencil } from "react-icons/fa6";
import { BsEraser } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useTasks from '../../../../Hooks/useTasks';

const TaskBoardRow = ({task}) => {
    const [, , refetch] = useTasks()
    const axiosPublic = useAxiosPublic()
    const handleDelete =() =>{
        axiosPublic.delete(`/tasks/${task._id}`)
        .then(()=>{
            refetch()
            Swal.fire({position: "top-end",icon: "success", title: "Task Deleted", showConfirmButton: false, timer: 1500 });

        })
    }
    return (
             <tr className={`${task.difficulty == 'Low'? 'bg-blue-300 text-white' : task.difficulty == 'Medium' ? 'bg-yellow-400 text-black': 'bg-red-500 text-white'} border-2 border-black w-fit rounded-lg `}>
                <th>{task.title}</th>
                <th>{task.date}</th>
                <th>{task.difficulty}</th>
                <th className="flex gap-2">
                    <button title="Mark As Complete" className="bg-white text-green-400 rounded-full p-2"><TiTick /></button>
                    <button title="Edit" className="bg-white text-black rounded-full p-2"><FaPencil /></button>
                    <button onClick={handleDelete} title="Delete" className="bg-white text-red-500 rounded-full p-2"><BsEraser /></button>
                </th>
            </tr>
    );
};

export default TaskBoardRow;