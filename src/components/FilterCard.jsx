import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setfilterText } from "@/redux/allJobSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FilterCard = () => {
  const dispatch=useDispatch();
  const filterArray = [
    {
      filterType: "Location",
      array: ["Bengaluru", "Mumbai", "Gurugram", "Pune","Delhi NCR"],
    },
    {
      filterType: "Industry",
      array: ["Full Stack Developer", "Data Analyst", "Network Engineer","Quality Assurance (QA)","Sales"],
    },
    
  ];

  const [selectedVal, setSelectedVal] = useState("");
  useEffect(()=>{
    console.log(selectedVal);
    dispatch(setfilterText(selectedVal));
},[selectedVal]);
  return (
    <div className=" ">
      <div>Filter</div>
      <hr className="w-full h-4" />
      <div>
        <RadioGroup value={selectedVal} onValueChange={setSelectedVal}>
          {filterArray.map((itm, index) => (
            <div key={index}>
              <h1 className="text-md font-semibold">{itm.filterType}</h1>
              {itm.array.map((data, index2) => {
                const id = `RR${index}-${index2}`;
                return (
                  <div key={id} className="flex items-center gap-2 mt-2">
                    <RadioGroupItem id={id} value={data} />
                    <Label htmlFor={id} className="text-md text-gray-500">
                      {data}
                    </Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
