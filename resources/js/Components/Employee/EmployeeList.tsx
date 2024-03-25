import { usePopupStore } from "@/stores/popup";
import { EmployeeType } from "@/types/employee";
import { useForm, usePage } from "@inertiajs/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";

export default function EmployeeList() {
  const { props } = usePage();
  const employees = props.employees as EmployeeType[];
  const { open } = usePopupStore();

  return (
    <table className="w-full text-left table-auto mt-10">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Mobile</th>
          <th className="px-4 py-2">Department</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Current Assign</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {employees.map((employee, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-300" : ""}>
            <td className="px-4 py-2">{employee.name}</td>
            <td className="px-4 py-2">{employee.email}</td>
            <td className="px-4 py-2">{employee.phone}</td>
            <td className="px-4 py-2">{employee.employee_department}</td>
            <td className="px-4 py-2">{employee.employee_type}</td>
            <td className="px-4 py-2">{""}</td>
            <td className="px-4 py-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => open("EDIT_EMPLOYEE", { employee })}
              >
                <FaRegEdit />
              </button>
              <DeleteButton id={employee.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DeleteButton({ id }: { id: number }) {
  const { delete: deleteEmployee, processing } = useForm();

  const handleDelete = () => {
    deleteEmployee(route("employee.destroy", id));
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
