/* eslint-disable react/prop-types */
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Badge } from "@/components/ui/badge";

const LatestJobCard = ({ job }) => {
  return (
    <div className="hover:scale-105 transition-transform duration-200 cursor-pointer">
      <Card className="mt-3 w-90 shadow-md border border-gray-100 rounded-md">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {job?.company?.name}
          </Typography>
          <h3 className=" mb-2  text-gray-400 text-muted-foreground">
            {job?.location}
          </h3>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {job?.title}
          </Typography>
          <Typography>{job?.description}</Typography>
        </CardBody>
        <div className="mb-2 flex ml-4 gap-3">
          <Badge
            className="text-md px-1 py-1 font-bold  rounded-md  cursor-pointer text-[#C63C51]  "
            variant="outline"
          >
            {job?.position} Positions
          </Badge>
          <Badge
            className=" text-md px-1 py-1 font-bold rounded-md cursor-pointer text-[#4F1787] "
            variant="outline"
          >
            {job?.jobType}
          </Badge>
          <Badge
            className="text-md font-bold px-1 py-1 rounded-md cursor-pointer text-[#FB773C] "
            variant="outline"
          >
            {job?.salary}LPA
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default LatestJobCard;
