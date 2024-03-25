import Create from "@/Components/Invoice/create/Create";
import Navbar from "@/Components/Invoice/Navbar";
import Title from "@/Components/Title";

export default function CreatePage() {
  return (
    <div>
      <Title>Invoice</Title>

      <Navbar />
      <Create />
    </div>
  );
}
