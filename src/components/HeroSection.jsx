import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchText } from "../redux/allJobSlice";

const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTextInput, setSearchTextInput] = useState("");

  const handleSearch = () => {
    dispatch(setSearchText(searchTextInput));
    navigate("/browse");
  };

  // Function to handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className=" ">
      <div className=" px-4 py-5 my-2 text-center">
        <h2 className=" my-2 font-medium text-xl rounded-full mt-1">
          <span className=" bg-white border border-black-2 rounded-full px-3 py-1">
            The path to your perfect job starts here!
          </span>
        </h2>
        <h1 className="display-5 fw-bold text-body-emphasis mt-3 font-serif">
          <span className=" text-[]">Discover</span> Your Dream Job <br></br>
          <span className=" text-[#6C48C5]">Apply</span>, and{" "}
          <span className=" text-[#6C48C5]">Succeed!</span>
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 mt-2">
            Seamlessly connect with top employers and land your ideal role.
          </p>
          <div className="w-full flex items-center gap-4 border border-gray-100 rounded-full bg-white pr-0 pl-2">
            <input
              onChange={(e) => setSearchTextInput(e.target.value)}
              onKeyDown={handleKeyDown} // Added onKeyDown to listen for Enter key
              type="text"
              placeholder=" find your dream job "
              className="w-full border-none outline-none py-1"
            />
            <Button
              onClick={() => handleSearch()}
              className="rounded-r-full pl-0 bg-[#6C48C5]"
            >
              <Search />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
