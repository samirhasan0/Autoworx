import { Link, usePage } from "@inertiajs/react";
import { FaFilePdf, FaPrint } from "react-icons/fa";

export default function Header() {
  const { props } = usePage();
  const invoice = props.invoice as any;

  return (
    <div className="flex gap-5 justify-end">
      <Link
        href="/invoice"
        className="border border-blue-700 text-blue-700 px-3 py-1 rounded-md  hover:bg-blue-700 hover:text-white"
      >
        Back
      </Link>

      <Link
        href={`/invoice/${invoice.invoice_id}/edit`}
        className="border border-blue-700 text-blue-700 px-3 py-1 rounded-md  hover:bg-blue-700 hover:text-white"
      >
        Edit
      </Link>

      <a
        href={`/invoice/${invoice.invoice_id}/pdf`}
        target="_blank"
        className="bg-green-600 px-3 py-1 rounded-md text-white flex items-center gap-1"
      >
        <FaFilePdf className="inline" />
        PDF
      </a>
    </div>
  );
}
