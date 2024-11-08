import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSearchText } from "@/redux/allJobSlice";
import useGetAllJob from "@/hooks/useGetAllJob";
import { motion } from "framer-motion";
const Browse = () => {
  useGetAllJob();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      console.log("Component unmounting, clearing search text");
      dispatch(setSearchText("")); // Clear search text when leaving page
    };
  }, [dispatch]);

  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-7xl m-auto">
        <h1 className="text-lg font-bold mt-4">
          Search Result ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {allJobs.map((job, index) => (
            <motion.div
              key={job?._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} 
              transition={{ duration: 0.3, delay: index * 0.1 }} 
            >
              <Job job={job}></Job>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Browse;
