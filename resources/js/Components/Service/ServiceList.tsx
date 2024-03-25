import { CustomerType, ServiceType } from "@/types/invoice";
import { useForm, usePage } from "@inertiajs/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";
import { usePopupStore } from "@/stores/popup";

export default function ServiceList() {
  const { props } = usePage();
  const services = props.services as ServiceType[];
  const { open } = usePopupStore();

  return (
    <table className="w-full text-left table-auto mt-10">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Discount</th>
          <th className="px-4 py-2">Total</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {services.map((service, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-300" : ""}>
            <td className="px-4 py-2">{service.name}</td>
            <td className="px-4 py-2">{service.price}</td>
            <td className="px-4 py-2">{service.description}</td>
            <td className="px-4 py-2">{service.quantity}</td>
            <td className="px-4 py-2">{service.discount}</td>
            <td className="px-4 py-2">{service.total}</td>
            <td className="px-4 py-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => open("EDIT_SERVICE", { service })}
              >
                <FaRegEdit />
              </button>
              <DeleteButton id={service.id!} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DeleteButton({ id }: { id: number }) {
  const { delete: deleteService, processing } = useForm();

  const handleDelete = () => {
    deleteService(route("service.destroy", id));
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
