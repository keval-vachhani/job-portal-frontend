import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import { setSearchJobByText } from "@/redux/allJobSlice";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllAdminJobs();
  const [input, setinput] = useState("");
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <>
      <Navbar></Navbar>
      <div >
        <div className="max-w-6xl mx-auto my-10">
          <div className="flex items-center justify-between my-5">
            <Input
              className="w-fit"
              placeholder="Filter by name"
              onChange={(e) => setinput(e.target.value)}
            />
            <Button className="bg-[#6C48C5]" onClick={() => navigate("/admin/jobs/create")}>
              Post Job
            </Button>
          </div>
          <AdminJobsTable />
        </div>
      </div>
    </>
  );
};

export default AdminJobs;
