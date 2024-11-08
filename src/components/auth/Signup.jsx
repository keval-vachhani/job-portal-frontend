import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
const Signup = () => {
  const [loading,setloading]=useState(false);
  const{user}=useSelector((store)=>store.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const changeFileHandler = (e) => {
    setFormData({ ...formData, file: e.target.files?.[0] });
  };
  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();

    try {
      const sentData = new FormData();
      sentData.append("fullName", formData.fullName);
      sentData.append("email", formData.email);
      sentData.append("phoneNumber", formData.phoneNumber);
      sentData.append("password", formData.password);
      sentData.append("role", formData.role);
      if (formData.file) {
        sentData.append("file", formData.file);
      }

      const res = await axios.post(`${USER_API_END_POINT}/register`, sentData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    finally{
      setloading(false);
    }
  };
  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])
  return (
    <div>
      <Navbar></Navbar>

      <div className="flex items-center  max-w-7xl justify-center mx-auto  border-red-2 ">
        <form
          onSubmit={handleSubmit}
          className=" p-6  rounded-lg w-1/2 border-2 border-black  flex flex-col gap-2"
        >
          <div>
            <Label className="text-lg    font-bold ">Sign Up</Label>
          </div>
          <div className="flex flex-col items-start  gap-1 ">
            <Label className="text-lg  font-medium text-gray-700">Name</Label>
            <Input
              type="text"
              placeholder="Enter your name here"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="fullName"
              value={formData.fullName}
              onChange={handleOnChnage}
            />
          </div>

          <div className="flex flex-col items-start  gap-1 ">
            <Label className="text-lg  font-medium text-gray-700">email</Label>
            <Input
              type="email"
              placeholder="Enter your email here"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              value={formData.email}
              onChange={handleOnChnage}
            />
          </div>

          <div className="flex flex-col items-start  gap-1 ">
            <Label className="text-lg  font-medium text-gray-700">phone</Label>
            <Input
              type="text"
              placeholder="Enter your number here"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleOnChnage}
            />
          </div>

          <div className="flex flex-col items-start  gap-1 ">
            <Label className="text-lg  font-medium text-gray-700">
              password
            </Label>
            <Input
              type="password"
              placeholder="Enter your password here"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              value={formData.password}
              onChange={handleOnChnage}
            />
          </div>

          <RadioGroup className="flex items-center gap-4 my-2 ">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                className="cursor-pointer"
                checked={formData.role === "student"}
                onChange={handleOnChnage}
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"
                checked={formData.role === "recruiter"}
                onChange={handleOnChnage}
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer"
              onChange={changeFileHandler}
            />
          </div>
          {loading ? (
            <Button className="w-full bg-[#6C48C5] hover:bg-slate-600" type="submit">
              <Loader2 className=" mr-2 h-4 w-4 animate-spin"></Loader2>
              Please wait
            </Button>
          ) : (
            <Button className="w-full bg-[#6C48C5] hover:bg-slate-600" type="submit">
              Sign Up
            </Button>
          )}
          <p>
            already have an account?
            <Link to="/login">
              <span className="text-lg text-blue-600">Login</span>
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
