import useGetAllJob from "@/hooks/useGetAllJob";
import Category from "./Category";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Navbar from "./shared/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJob();
  const navigate=useNavigate();
  const {user} =useSelector(store=>store.auth);
  useEffect(()=>{
  if(user.role==="recruiter"){
    navigate("/admin/companies");
  }
  },[]);
  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <Category></Category>
      <LatestJobs></LatestJobs>
      <Footer></Footer>
    </>
  );
};

export default Home;
