import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import useGetAllJob from "@/hooks/useGetAllJob";
import { motion } from "framer-motion"; // Import motion from framer-motion

const Jobs = () => {
  useGetAllJob();
  const { allJobs, filterText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (filterText) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(filterText.toLowerCase()) ||
          job.description.toLowerCase().includes(filterText.toLowerCase()) ||
          job.location.toLowerCase().includes(filterText.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, filterText]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-3">
        <div className="flex gap-5">
          <div className="w-1/7">
            {" "}
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    appearance
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
