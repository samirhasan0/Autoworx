import { cn } from "@/lib/cn";
import moment from "moment";

const STATUSES = ["In Progress", "Completed", "Pending"];

// Function to generate random status
const getRandomStatus = () => {
  return STATUSES[Math.floor(Math.random() * STATUSES.length)];
};

// Function to format date
const formatDate = (date: Date) => {
  return moment(date).format("DD.MM.YYYY");
};

export default function Display() {
  // Define invoice data
  const invoiceDatas = {
    id: 434534674576,
    clientId: 2534,
    client: "John Doe",
    vehicle: "Chevrolet SILVERADO",
    email: "johndoe@website.com",
    price: "$4756",
    date: new Date(2023, 10, 11),
    status: "In Progress",
  };

  // Generate array of invoices
  const invoices = Array.from({ length: 20 }, () => ({
    ...invoiceDatas,
    status: getRandomStatus(),
  }));

  // Define data sections
  const dataSections = [
    { title: "Invoice ID", data: invoices.map((invoice) => invoice.id) },
    { title: "Client ID", data: invoices.map((invoice) => invoice.clientId) },
    { title: "Client", data: invoices.map((invoice) => invoice.client) },
    { title: "Vehicle", data: invoices.map((invoice) => invoice.vehicle) },
    { title: "Email", data: invoices.map((invoice) => invoice.email) },
    { title: "Price", data: invoices.map((invoice) => invoice.price) },
    {
      title: "Date",
      data: invoices.map((invoice) => formatDate(invoice.date)),
    },
    { title: "Status", data: invoices.map((invoice) => invoice.status) },
  ];

  const ids = invoices.map((invoice) => invoice.id);

  // Render component
  return (
    <div className="w-[77vw] h-[80vh] mt-3 rounded-xl bg-white text-[#66738C] app-shadow px-5 pt-8 pb-5">
      <div className="h-full flex justify-center overflow-scroll">
        {dataSections.map(({ title, data }) => (
          <div className="flex-grow">
            <h2 className="text-[16px] max-[1450px]:text-[12px] max-[1250px]:text-[10px]">
              {title}
            </h2>
            <div className="flex flex-col gap-3 mt-2">
              {data.map((item, index) => (
                <div className="flex justify-between items-center">
                  <p
                    className={cn(
                      "text-[16px] app-shadow rounded-md h-[50px] px-3 flex items-center max-[1450px]:text-[12px] max-[1250px]:text-[10px] max-[1250px]:h-[40px]",
                      // Check if the item is "Status" or not
                      title === "Status" &&
                        (item === "Completed"
                          ? "bg-[#4DB6AC]"
                          : item === "In Progress"
                          ? "bg-[#6571FF]"
                          : "bg-[#FFBD3E]"),
                      title === "Status" &&
                        "text-white w-[120px] flex justify-center text-[18px] max-[1450px]:text-[14px] max-[1450px]:w-[100px] max-[1250px]:text-[12px] max-[1250px]:w-[90px]",
                      title === "Invoice ID" && "text-[#6571FF]"
                    )}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Edit button */}
        <div>
          <h2>Edit</h2>
          <div className="flex flex-col gap-3 mt-2">
            {ids.map((id) => (
              <button className="h-[50px] px-3 flex items-center max-[1250px]:h-[40px]">
                <img
                  src="/icons/Edit.svg"
                  alt="edit"
                  className="h-5 max-[1250px]:h-4"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
