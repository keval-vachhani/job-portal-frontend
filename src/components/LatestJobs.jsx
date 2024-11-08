import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const {allJobs}=useSelector(store=>store.job);
  // const LatestJobsArr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <div className="flex ml-20 items-center ">
        <h1 className=" text-5xl  font-bold mt-10  ">
          <span className=" text-[#6C48C5] ">Latest</span> Job Openings
        </h1>
      </div>
      <div className="  p-4 ml-16 grid grid-cols-3 gap-3 ">
        {allJobs.slice(0,6).map((job) => (
          <LatestJobCard  key={job._id} job={job}></LatestJobCard>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
