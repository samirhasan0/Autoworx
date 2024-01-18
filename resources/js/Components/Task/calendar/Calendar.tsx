import Body from "./Body";
import Heading from "./Heading";

export default function Calender() {
  return (
    <div className="relative rounded-[18px] w-[1150px] h-[98%] bg-white app-shadow mt-4 p-4 overflow-hidden">
      <Heading />
      <Body />
    </div>
  );
}
