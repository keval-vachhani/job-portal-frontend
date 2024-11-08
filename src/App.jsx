import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDetail from "./components/JobDetail";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ContactHr from "./components/ContactHr";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/signup",
      element: <Signup></Signup>,
    },
    {
      path: "/jobs",
      element: <Jobs></Jobs>,
    },
    {
      path: "/jobDetail/:id",
      element: <JobDetail></JobDetail>,
    },{
      path: "/browse",
      element: <Browse></Browse>,
    },
    {
      path: "/profile",
      element: <Profile></Profile>,
    },
    {
      path: "/contact",
      element: <ContactHr></ContactHr>,
    },
    {
      path: "/admin/companies",
      element: <ProtectedRoute><Companies></Companies></ProtectedRoute>, 
    },
    {
      path: "/admin/companies/create",
      element:  <ProtectedRoute><CreateCompany></CreateCompany></ProtectedRoute>,
    },
    {
      path: "/admin/companies/:id",
      element:  <ProtectedRoute><CompanySetup></CompanySetup></ProtectedRoute>,
    },
    {
      path: "/admin/jobs",
      element:  <ProtectedRoute><AdminJobs></AdminJobs></ProtectedRoute>,
    },
    {
      path: "/admin/jobs/create",
      element: <ProtectedRoute> <PostJob></PostJob></ProtectedRoute>,
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: <ProtectedRoute> <Applicants></Applicants></ProtectedRoute>,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}>
        <div> </div>
      </RouterProvider>
    </>
  );
}

export default App;
