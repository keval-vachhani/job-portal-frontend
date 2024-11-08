import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import {  toast } from 'react-toastify';


        
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading ,user} = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
       toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
     toast.error(error.response.data.message)
      console.log(error.response.data.message);
    
    } finally {
      dispatch(setloading(false));
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
            <Label className="text-lg    font-bold ">Log In</Label>
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

          {loading ? (
            <Button className="w-full bg-[#6C48C5] hover:bg-slate-600" type="submit">
              <Loader2 className=" mr-2 h-4 w-4 animate-spin"></Loader2>
              Please wait
            </Button>
          ) : (
            <Button className="w-full bg-[#6C48C5] hover:bg-slate-600" type="submit">
              Log In
            </Button>
          )}

          <p>
            Dont have account?
            <Link to="/signup">
              <span className="text-lg text-blue-600"> SignUp</span>
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
