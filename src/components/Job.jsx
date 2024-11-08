/* eslint-disable react/prop-types */
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  
  return (
    <div className=" flex flex-col gap-2 border border-gray-100 shadow-lg p-2 rounded-md bg-white font-serif">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className=" flex items-center gap-2 mt-2">
        <Avatar className="w-12 h-12 ml-2">
          <AvatarImage
            className="w-full h-full object-contain  border border-gray-200"
            src={job?.company?.logo}
          ></AvatarImage>
        </Avatar>
        <div>
          <p className=" text-xl font-semibold">{job?.company?.name}</p>
          <p>{job?.location}</p>
        </div>
      </div>
      <h1 className=" font-bold text-xl ">{job?.title}</h1>
      <p className=" text-gray-500">{job?.description} </p>
      <div className="mb-2 flex  gap-3">
        <Badge
          className="text-md px-1 py-1 font-bold  rounded-md  cursor-pointer text-[#C63C51]  "
          variant="outline"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className=" text-md px-1 py-1 font-bold rounded-md cursor-pointer text-[#4F1787] "
          variant="outline"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-md font-bold px-1 py-1 rounded-md cursor-pointer text-[#FB773C] "
          variant="outline"
        >
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/jobDetail/${job._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#6C48C5]" onClick={()=>navigate("/profile")}> Your Profile</Button>
      </div>
    </div>
  );
};

export default Job;
