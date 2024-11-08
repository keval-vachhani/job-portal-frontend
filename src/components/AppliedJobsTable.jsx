import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <Table className="bg-white">
      <TableCaption>A list of your applied jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAppliedJobs && allAppliedJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4 text-gray-500">
              No jobs applied yet
            </TableCell>
          </TableRow>
        ) : (
          allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob._id}>
              <TableCell className="font-medium">
                {appliedJob?.createdAt.split("T")[0]}
              </TableCell>
              <TableCell>{appliedJob?.job?.title}</TableCell>
              <TableCell>{appliedJob?.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                {appliedJob?.status === "pending" ? (
                  <Badge className="bg-[#FFA726]">
                    {appliedJob?.status.toUpperCase()}
                  </Badge>
                ) : appliedJob?.status === "accepted" ? (
                  <Badge className="bg-[#4CAF50]">
                    {appliedJob?.status.toUpperCase()}
                  </Badge>
                ) : (
                  <Badge className="bg-[#F44336]">
                    {appliedJob?.status.toUpperCase()}
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AppliedJobsTable;
