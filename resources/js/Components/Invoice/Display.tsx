import { cn } from "@/lib/cn";
import { Link, usePage } from "@inertiajs/react";
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
  const { props } = usePage();
  const { invoices } = props as any;

  console.log(invoices);

  // Define data sections
  const dataSections = [
    {
      title: "Invoice ID",
      data: invoices.map((invoice: any) => invoice.invoice_id),
    },
    {
      title: "Client ID",
      data: invoices.map((invoice: any) => invoice.customer_id),
    },
    {
      title: "Client",
      data: invoices.map((invoice: any) => invoice.customer_name),
    },
    {
      title: "Vehicle",
      data: invoices.map((invoice: any) => invoice.vehicle_model),
    },
    {
      title: "Email",
      data: invoices.map((invoice: any) => invoice.customer_email),
    },
    {
      title: "Price",
      data: invoices.map((invoice: any) => invoice.grand_total),
    },
    {
      title: "Date",
      data: invoices.map((invoice: any) => formatDate(invoice.issue_date)),
    },
    { title: "Status", data: invoices.map((invoice: any) => invoice.status) },
  ];

  const ids = invoices.map((invoice: any) => invoice.invoice_id);

  // Render component
  return (
    <div className="w-[77vw] h-[80vh] rounded-xl bg-white text-[#66738C] app-shadow px-5 pt-8 pb-5 invoice-display">
      <div className="h-full flex justify-center overflow-scroll">
        {dataSections.map(({ title, data }) => (
          <div className="flex-grow">
            <h2 className="text-[16px] max-[1450px]:text-[12px] max-[1250px]:text-[10px]">
              {title}
            </h2>
            <div className="flex flex-col gap-3 mt-2">
              {data.map((item: any, index: number) => (
                <div className="flex justify-between items-center">
                  {title === "Invoice ID" ? (
                    <Link
                      href={`/invoice/${item}`}
                      className="text-[16px] app-shadow rounded-md h-[50px] px-3 flex items-center max-[1450px]:text-[12px] max-[1250px]:text-[10px] max-[1250px]:h-[40px] text-[#6571FF]"
                    >
                      {item}
                    </Link>
                  ) : (
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
                          "text-white w-[120px] flex justify-center text-[18px] max-[1450px]:text-[14px] max-[1450px]:w-[100px] max-[1250px]:text-[12px] max-[1250px]:w-[90px]"
                      )}
                    >
                      {item}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Edit button */}
        <div>
          <h2>Edit</h2>
          <div className="flex flex-col gap-3 mt-2">
            {ids.map((id: any) => (
              <Link
                className="h-[50px] px-3 flex items-center max-[1250px]:h-[40px]"
                href={`/invoice/${id}/edit`}
              >
                <img
                  src="/icons/Edit.svg"
                  alt="edit"
                  className="h-5 max-[1250px]:h-4"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
