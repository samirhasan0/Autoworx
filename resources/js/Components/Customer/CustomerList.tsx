import { CustomerType } from "@/types/invoice";
import { useForm, usePage } from "@inertiajs/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";
import { usePopupStore } from "@/stores/popup";

export default function CustomerList() {
  const { props } = usePage();
  const customers = props.customers as CustomerType[];
  const { open } = usePopupStore();

  return (
    <table className="w-full text-left table-auto mt-10">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Join Date</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {customers.map((customer, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-300" : ""}>
            <td className="px-4 py-2">{customer.name}</td>
            <td className="px-4 py-2">{customer.email}</td>
            <td className="px-4 py-2">
              {moment(customer.created_at).format("DD/MM/YYYY")}
            </td>
            <td className="px-4 py-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => open("EDIT_CUSTOMER", { customer })}
              >
                <FaRegEdit />
              </button>
              <DeleteButton id={customer.id!} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DeleteButton({ id }: { id: number }) {
  const { delete: deleteCustomer, processing } = useForm();

  const handleDelete = () => {
    deleteCustomer(route("customer.destroy", id));
  };

  return (
    <button
      className="text-red-500 hover:text-red-700 ml-4"
      onClick={handleDelete}
    >
      {processing ? (
        <ThreeDots color="red" height={20} width={20} />
      ) : (
        <MdDelete />
      )}
    </button>
  );
}
