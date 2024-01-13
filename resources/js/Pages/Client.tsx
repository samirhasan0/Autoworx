import Details from "@/Components/Client/Details";
import List from "@/Components/Client/List";
import MessageBox from "@/Components/Client/MessageBox";
import Title from "@/Components/Title";

export default function Client() {
  return (
    <>
      <Title>Communication Hub - Client</Title>

      <div className="mt-5 flex gap-5">
        <List />
        <MessageBox />
        <Details />
      </div>
    </>
  );
}
