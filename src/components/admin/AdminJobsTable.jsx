import { Edit2, Eye, MoreHorizontal } from "lucide-react";
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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterAdminJob, setFilterAdminJob] = useState(allAdminJobs);

  useEffect(() => {
    console.log("alljobs", allAdminJobs);
    const filteredAdminJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterAdminJob(filteredAdminJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div className=" bg-white">
      <Table className=" bg-white">
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company </TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {filterAdminJob?.map((adminJob) => (
            <tr key={adminJob?._id} className=" hover:bg-gray-100">
              <TableCell >
                {" "}
                <Avatar>
                  <AvatarImage
                    src={adminJob?.company?.logo}
                    className="object-contain w-full h-full rounded-full"
                  />
                </Avatar>
              </TableCell>
              <TableCell>{adminJob?.company?.name}</TableCell>
              <TableCell>{adminJob?.title}</TableCell>
              <TableCell>{adminJob?.createdAt?.split("T")[0]}</TableCell>

              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div className="flex  flex-col items-start gap-2 w-fit cursor-pointer">
                      <div className=" flex gap-2">
                        {" "}
                        <Edit2 className="w-4" />
                        <Link>
                          {" "}
                          <span>Edit</span>
                        </Link>
                      </div>
                      <div className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                        <Eye className="w-4" />
                        <Link to={`/admin/jobs/${adminJob?._id}/applicants`}>
                          {" "}
                          <span>Applicants</span>
                        </Link>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
