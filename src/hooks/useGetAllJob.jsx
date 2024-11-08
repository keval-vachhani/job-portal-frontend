import { setAllJobs } from '@/redux/allJobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useSelect } from '@material-tailwind/react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJob = () => {
  const dispatch=useDispatch();
  const{searchText}=useSelector((store)=>store.job);;
 
 useEffect(()=>{
  const fetchAllJobs=async()=>{
    try {
      const res=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchText}`,{withCredentials:true});
      if(res.data.success){
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (error) {
      console.log(error);
    }
   
  } 
  fetchAllJobs();
 },[])
}

export default useGetAllJob;