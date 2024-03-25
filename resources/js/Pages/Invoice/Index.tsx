import Display from "@/Components/Invoice/Display";
import Navbar from "@/Components/Invoice/Navbar";
import TempDisplay from "@/Components/Invoice/TempDisplay";
import Title from "@/Components/Title";

export default function Index() {
  return (
    <div>
      <Title>Invoice</Title>

      <Navbar />
      {/* <Display /> */}
      <TempDisplay />
    </div>
  );
}
