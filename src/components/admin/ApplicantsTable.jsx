import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const ApplicantsTable = () => {
  const shortlistingStatus = ["Accepted", "Rejected"];
  const { applicants } = useSelector((store) => store.applicants || { applicants: { applications: [] } }); // default structure

  const handleStatusUpdate = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/updateStatus/${id}`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className=" bg-white">
      <Table>
        <TableCaption>A list of your recent applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                No applicants found
              </TableCell>
            </TableRow>
          ) : (
            applicants?.applications?.map((application) => (
              <TableRow key={application._id} className="hover:bg-gray-100">
                <TableCell>{application?.applicant?.fullName || "N/A"}</TableCell>
                <TableCell>{application?.applicant?.email || "N/A"}</TableCell>
                <TableCell>{application?.applicant?.phoneNumber || "N/A"}</TableCell>
                <TableCell>
                  <a
                    className="text-blue-600 hover:underline"
                    href={application?.applicant?.profile?.resume || "#"}
                  >
                    {application?.applicant?.profile?.resumeOriginalName || "Resume"}
                  </a>
                </TableCell>
                <TableCell>{application?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() =>
                            handleStatusUpdate(status, application._id)
                          }
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
