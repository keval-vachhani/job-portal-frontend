import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };
  const HandleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInputData({ ...inputData, file });
  };
  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("description", inputData.description);
    formData.append("website", inputData.website);
    formData.append("location", inputData.location);
    if (inputData.file) {
      formData.append("file", inputData.file);
    }
    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/formdata",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    setInputData({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file,
    });
  }, [singleCompany]);
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 bg-white p-3 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl border border-black-2 rounded-md p-1">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                onChange={HandleChange}
                value={inputData.name}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                onChange={HandleChange}
                value={inputData.description}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                onChange={HandleChange}
                value={inputData.website}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                onChange={HandleChange}
                value={inputData.location}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={HandleFileChange} />
            </div>
          </div>

          {loading ? (
            <Button className="w-full hover:bg-slate-600 bg-[#6C48C5]" type="submit">
              <Loader2 className=" mr-2 h-4 w-4 animate-spin"></Loader2>
              Please wait
            </Button>
          ) : (
            <Button className="w-full hover:bg-slate-600 mt-2 bg-[#6C48C5]" type="submit">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
