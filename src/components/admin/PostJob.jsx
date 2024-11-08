import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  // const allCompanies=[];
  const { allCompanies } = useSelector((store) => store.company);
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    requirments: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: "",
    companyId: "",
  });
  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handleSelectChange = (value) => {
    const selectedCompany = allCompanies.find(
      (company) => company.name.toLowerCase() == value
    );

    setInputData({ ...inputData, companyId: selectedCompany?._id });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/postjob`, inputData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      });
      if (res.data.success) {
        navigate("/admin/jobs");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={handleSubmit}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={inputData.title}
                onChange={HandleOnChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={inputData.description}
                onChange={HandleOnChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>{" "}
            <div>
              <Label>requirments</Label>
              <Input
                type="text"
                name="requirments"
                value={inputData.requirments}
                onChange={HandleOnChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>salary</Label>
              <Input
                type="text"
                name="salary"
                value={inputData.salary}
                onChange={HandleOnChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>experienceLevel</Label>
              <Input
                type="text"
                name="experienceLevel"
                value={inputData.experienceLevel}
                onChange={HandleOnChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>location</Label>
              <Input
                type="text"
                name="location"
                value={inputData.location}
                onChange={HandleOnChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>jobType</Label>
              <Input
                type="text"
                name="jobType"
                value={inputData.jobType}
                onChange={HandleOnChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>position</Label>
              <Input
                type="number"
                name="position"
                value={inputData.position}
                onChange={HandleOnChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {allCompanies.map((company) => {
                    return (
                      <SelectItem
                        key={company?._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          {loading ? (
            <Button className="w-full hover:bg-slate-600 mt-4 bg-[#6C48C5]" type="submit">
              <Loader2 className=" mr-2 h-4 w-4 animate-spin"></Loader2>
              Please wait
            </Button>
          ) : (
            <Button className="w-full hover:bg-slate-600 mt-4 bg-[#6C48C5]" type="submit">
              Post New Job
            </Button>
          )}
          {allCompanies.length === 0 && (
            <p className="text-xs text-red-500 font-bold text-center my-3">
              *Please register a company first,
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
