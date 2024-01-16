import moment from "moment";

export default function Display() {
  const invoiceDatas = [
    {
      id: 42451435,
      date: "2024-05-10",
      client: "John Doe",
    },
  ];

  const invoices = Array.from({ length: 20 }, () => invoiceDatas[0]);

  return (
    <div className="w-[728px] border h-[730px] mt-3 rounded-xl bg-white text-[#66738C] app-shadow px-5 py-8 flex flex-col">
      {/* Header */}
      <div className="flex h-fit gap-3">
        <h2 className="text-[15px] w-[260px]">Invoice ID</h2>
        <h2 className="text-[15px] w-[158px]">Date Created</h2>
        <h2 className="text-[15px] w-[232px]">Client</h2>
      </div>

      {/* Body */}
      <div className="h-[650px] overflow-auto pb-3">
        {invoices.map((invoice) => (
          <div className="flex gap-3">
            <p className="text-[18px] p-3 app-shadow rounded-md mt-3 w-[260px] border">
              {invoice.id}
            </p>
            <p className="text-[18px] p-3 app-shadow rounded-md mt-3 w-[158px] border">
              {moment(invoice.date).format("DD.MM.YYYY")}
            </p>
            <p className="text-[18px] p-3 app-shadow rounded-md mt-3 w-[232px] border">
              {invoice.client}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}