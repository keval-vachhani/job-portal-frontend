import { ContactRound, MailIcon, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobsTable from "./AppliedJobsTable";
import { useState } from "react";
import UpdateProfileBox from "./UpdateProfileBox";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAllAppliedJobs();

  const user = useSelector((store) => store.auth.user);

  const skillsArr = Array.isArray(user?.profile?.skills)
    ? user.profile.skills
    : [];
  const [open, setopen] = useState(false);
  return (
    <>
      <Navbar></Navbar>
      <div className=" max-w-4xl mx-auto border bg-white border-gray-100 shadow-sm p-3 rounded-md">
        <div className=" flex items-center justify-between">
          <div className=" flex items-center gap-4">
            {" "}
            <Avatar>
              <AvatarImage
                className=" h-16 w-16"
                src={user?.profile?.profilePhoto}
              ></AvatarImage>
            </Avatar>
            <div>
              {" "}
              <h1 className="mt-2 text-2xl font-bold">{user.fullName}</h1>
              <p>{user.bio}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setopen(true)}>
            <Pen></Pen>
          </Button>
        </div>
        <div className=" flex items gap-4 mt-4">
          <MailIcon></MailIcon>
          <h1>{user.email}</h1>
        </div>
        <div className=" flex items gap-4 mt-4">
          <ContactRound></ContactRound>
          <h1>{user.phoneNumber}</h1>
        </div>
        <div className=" mt-4">
          <h1 className=" font-mono font-semibold text-xl">Skills</h1>
          <div className="flex items-center gap-4">
            {skillsArr.length == 0 ? (
              <Badge>No skills</Badge>
            ) : (
              skillsArr.map((itm, index) => {
                return (
                  <div key={index} className="mt-2 ">
                    {" "}
                    <Badge className="bg-[#6C48C5]">{itm}</Badge>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="mt-4">
          <h1 className="font-bold mb-2">Resume</h1>
          <h1 className=" mt-2 text-gray-800   hover:text-blue-500 hover:underline">
            <a
              className=" "
              href={user.profile.resume}
              target="_blank"
              download={`${user.profile.resumeOriginalName}.pdf`}
            >
              {user.profile.resumeOriginalName}
            </a>
          </h1>
        </div>
      </div>
      <div className=" max-w-4xl mx-auto mt-4">
        <AppliedJobsTable></AppliedJobsTable>
      </div>
      <UpdateProfileBox open={open} setopen={setopen}></UpdateProfileBox>
    </>
  );
};

export default Profile;
