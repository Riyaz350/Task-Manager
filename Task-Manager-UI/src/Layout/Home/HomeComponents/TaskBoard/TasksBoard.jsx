import React from 'react';
import useTasks from '../../../../Hooks/useTasks';
import TaskBoardRow from './TaskBoardRow';

const TasksBoard = () => {
    const [tasks,,refetch] =useTasks()
    console.log(tasks)
    return (
        <div className="lg:min-h-screen">

             
            <div className="overflow-x-auto max-w-7xl mx-auto my-5 ">
             <table className="table w-full">
                {/* head */}
                <thead>
                    <tr className="text-xl w-fit">
                        <th>Title</th>
                        <th>Deadline</th>
                        <th>Priority</th>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                
                <tbody  className='w-fit'>
                {
                tasks.map(task =><TaskBoardRow key={task._id} task={task}></TaskBoardRow>)
                }
                </tbody>

            </table>
            </div>    

        
           
            
            </div>
    );
};

export default TasksBoard;