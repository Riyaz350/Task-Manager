import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useTasks = () => {
    const axiosPublic = useAxiosPublic()

    const {data:tasks =[], isPending:tasksLoading, refetch} =useQuery({
        queryKey:['tasks'],
        queryFn: async()=>{
            
                const res = await axiosPublic.get('/tasks')
                return res.data
        }
    })
    return [tasks, tasksLoading, refetch]
};

export default useTasks;