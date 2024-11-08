import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";

// eslint-disable-next-line react/prop-types
const UpdateProfileBox = ({ open, setopen }) => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const [input, setinput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    number: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };
  const handleonChange = (e) => {
    const { name, value } = e.target;

    setinput({
      ...input,
      [name]: value,
    });
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    const sentData = new FormData();
    sentData.append("fullName", input.fullName);
    sentData.append("email", input.email);
    sentData.append("phoneNumber", input.number);
    sentData.append("bio", input.bio);
    sentData.append("skills", input.skills);
    if (input.file) {
      sentData.append("file", input.file);
    }
    try {
      setloading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        sentData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
      setopen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setopen(false)}
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={updateProfile} className=" flex flex-col gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full Name
            </Label>
            <Input
              id="name"
              name="fullName"
              value={input.fullName}
              className="col-span-3 "
              type="text"
              onChange={handleonChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              email
            </Label>
            <Input
              id="email"
              name="email"
              value={input.email}
              className="col-span-3"
              onChange={handleonChange}
              type="email"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Number
            </Label>
            <Input
              id="number"
              name="number"
              onChange={handleonChange}
              value={input.number}
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              bio
            </Label>
            <Input
              id="bio"
              name="bio"
              onChange={handleonChange}
              value={input.bio}
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
              skills
            </Label>
            <Input
              id="skills"
              value={input.skills}
              name="skills"
              onChange={handleonChange}
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resume" className="text-right">
              Resume
            </Label>
            <Input
              id="resume"
              name="file"
              accept="application/pdf"
              onChange={changeFileHandler}
              className="col-span-3"
              type="file"
            />
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full hover:bg-slate-600">
                <Loader2 className=" mr-2 h-4 w-4 animate-spin"></Loader2>
                Please wait
              </Button>
            ) : (
              <Button className="w-full hover:bg-slate-600" type="submit">
                update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileBox;
