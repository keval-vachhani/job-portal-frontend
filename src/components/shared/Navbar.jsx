import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(false));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray rounded-lg border border-x-black bg-white m-3 max-w-7xl p-2 md:p-4 lg:p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#6C48C5] text-xl sm:text-2xl font-bold font-serif">
          Job<span className="text-black">Fusion</span>
        </h1>

        <div className="flex items-center gap-5 flex-wrap">
          <div>
            <ol className="flex items-center gap-2 sm:gap-4">
              {user.role === "student" ? (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                </>
              )}
            </ol>
          </div>

          {!user ? (
            <div className="flex gap-3">
              <Link to="/login">
                <Button className="bg-[#6C48C5] hover:bg-blue-500 text-xs sm:text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="text-xs sm:text-sm">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4>{user?.fullName}</h4>
                        <h4 className="text-sm text-muted-foreground">
                          {user.profile.bio}
                        </h4>
                      </div>
                    </div>

                    {user && user.role === "student" && (
                      <div className="flex gap-2 items-center">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex gap-2 items-center">
                      <LogOut />
                      <Button variant="link" onClick={logoutHandler}>
                        Log Out
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
