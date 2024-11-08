import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/allJobSlice";

const Category = () => {
  const category = [
    "full stack developer",
    "software engineer",
    "fresher",
    "Software Developer",
    "Project Manager",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (cat) => {
    dispatch(setSearchText(cat));
    navigate("/browse");
    
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto ">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              onClick={() => handleSearch(cat)}
              className="md:basis-1/2 lg-basis-1/3"
              key={index}
            >
              <Button variant="outline" className="rounded-full bg-[#98DED9]">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Category;
