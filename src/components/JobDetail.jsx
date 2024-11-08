import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/allJobSlice";
import { toast } from "react-toastify";

const JobDetail = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  );
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/applyjob/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsApplied(true);
        // const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
  const fetchSingleJob = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });
      console.log(res.data); // Log the API response
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
        setIsApplied(
          res.data.job.applications.some(
            (application) => application.applicant == user?._id
          )
        );
      } else {
        toast.error("Failed to fetch job details.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching job details.");
    }
  };
  fetchSingleJob();
}, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto my-10 ">
        <div className="flex items-center justify-between bg-white p-3 rounded-md border">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="mb-2 flex mt-4 gap-3">
              <Badge
                className="text-sm px-1 py-1 font-bold  rounded-md  cursor-pointer text-[#C63C51]  "
                variant="outline"
              >
                {singleJob?.position} Positions
              </Badge>
              <Badge
                className=" text-sm px-1 py-1 font-bold rounded-md cursor-pointer text-[#6C48C5] "
                variant="outline"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                className="text-sm font-bold px-1 py-1 rounded-md cursor-pointer text-[#FB773C] "
                variant="outline"
              >
                {singleJob?.salary}LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Company Description
        </h1>
        <div>
          <div className=" bg-white rounded-md  p-3">
            <h1 className="font-bold my-2">
              Company:
              <span className="pl-4 font-normal text-gray-800">
                {singleJob?.company?.name}
              </span>
            </h1>

            <h1 className="font-bold my-2">
              Company Description:
              <span className="pl-4 font-normal text-gray-800">
                {singleJob?.company?.description}
              </span>
            </h1>
            <h1 className="font-bold my-2">
              Website:
              <span className="pl-4 font-normal text-gray-800">
                <a
                  target="_blank"
                  className=" text-blue-500 underline"
                  href={`${singleJob?.company?.website.trim()}`}
                  rel="noopener noreferrer"
                >
                  {" "}
                  {singleJob?.company?.website}
                </a>
              </span>
            </h1>
          </div>

          <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
            Job Description
          </h1>
          <div className="bg-white rounded-md  p-3">
            <h1 className="font-bold my-2">
              Location:
              <span className="pl-4 font-normal text-gray-800">
                {singleJob?.location}
              </span>
            </h1>
            <h1 className="font-bold my-2">
              Job Description:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singleJob.description}
              </span>
            </h1>
            <h1 className="font-bold my-2">
              Experience:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {" "}
                {singleJob?.experienceLevel}yrs
              </span>
            </h1>
            <h1 className="font-bold my-2">
              Salary:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singleJob?.salary}LPA
              </span>
            </h1>
            <h1 className="font-bold my-2">
              Total Applicants:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singleJob?.applications.length}
              </span>
            </h1>
            <h1 className="font-bold my-2 ">
              Posted Date:{" "}
              <span className="pl-4 font-normal text-gray-800">01/01/2024</span>
            </h1>
          </div>

          <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
            Contact Recruiter
          </h1>
          <div className=" bg-white p-3 roundend-md">
            <h1 className="font-bold my-2 ">
              Recruiter Name:
              <span className="pl-4 font-normal text-gray-800">
                {singleJob?.createdBy?.fullName}
              </span>
            </h1>
            <h1 className="font-bold my-2 ">
              Recruiter Email:
              <span className="pl-4 font-normal text-gray-800">
                {singleJob?.createdBy?.email}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
