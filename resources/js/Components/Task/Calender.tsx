import Body from "./Body";
import Heading from "./Heading";

export default function Calender() {
  return (
    <div className="rounded-[18px] w-[1150px] h-[730px] bg-white calender-shadow mt-4 p-4 relative">
      <Heading />
      <Body />
    </div>
  );
}
