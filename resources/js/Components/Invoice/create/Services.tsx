import { useInvoiceStore } from "@/stores/invoice";
import { ServiceType } from "@/types/invoice";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Services() {
  const { props } = usePage();
  const { errors } = props as any;
  const { services, removeService, setServices } = useInvoiceStore();

  function calculateTotal(service: ServiceType) {
    const price = service.price;
    const quantity = service.quantity;
    const discount = service.discount;

    if (!price) return service.total;

    const total = price * (quantity ? quantity : 1) - (discount ? discount : 0);
    return total;
  }

  function handleServiceChange(
    id: number,
    key: keyof ServiceType,
    value: string | number
  ) {
    const updatedServices = services.map((service) => {
      if (service.id === id) {
        return {
          ...service,
          [key]: value,
        };
      }

      return service;
    });

    updatedServices.forEach((service) => {
      service.total = calculateTotal(service);
    });
    setServices(updatedServices);
  }

  return (
    <div className="h-44 overflow-y-scroll relative overflow-x-auto">
      <table className="mt-3 w-full table-fixed">
        <thead>
          <tr className="text-xs text-white uppercase flex gap-2">
            <th className="text-left bg-[#6571FF] w-[20%] p-2">Services</th>
            <th className="text-left bg-[#6571FF] w-[30%] p-2">Description</th>
            <th className="text-left bg-[#6571FF] w-[10%] p-2">Price</th>
            <th className="text-left bg-[#6571FF] w-[10%] p-2">Qty/hr</th>
            <th className="text-left bg-[#6571FF] w-[10%] p-2">Discount</th>
            <th className="text-left bg-[#6571FF] w-[10%] p-2">Total</th>
            <th className="text-left bg-[#6571FF] w-[10%] p-2">Action</th>
          </tr>
        </thead>
        {errors.services && services.length <= 0 && (
          <p className="text-xl text-center text-red-500">
            Services are required
          </p>
        )}
        <tbody>
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const bgColor = !isEven ? "bg-[#F4F4F4]" : "bg-[#EAEAEA]";

            return (
              <tr className="text-sm text-black flex gap-2">
                <td className={`text-left ${bgColor} p-2 w-[20%]`}>
                  {service.name}
                </td>
                <td className={`text-left ${bgColor} p-2 w-[30%]`}>
                  {service.description}
                </td>
                <td className={`text-left ${bgColor} p-2 w-[10%]`}>
                  {/* {service.price} */}
                  <input
                    type="number"
                    className="w-full py-0 px-1 bg-transparent border-none"
                    value={service.price}
                    onChange={(e) =>
                      handleServiceChange(
                        service.id,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td className={`text-left ${bgColor} p-2 w-[10%]`}>
                  {/* {service.quantity} */}
                  <input
                    type="number"
                    className="w-full py-0 px-1 bg-transparent border-none"
                    value={service.quantity}
                    onChange={(e) =>
                      handleServiceChange(
                        service.id,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </td>
                <td className={`text-left ${bgColor} p-2 w-[10%]`}>
                  {/* {service.discount} */}
                  <input
                    type="number"
                    className="w-full py-0 px-1 bg-transparent border-none"
                    value={service.discount}
                    onChange={(e) =>
                      handleServiceChange(
                        service.id,
                        "discount",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td className={`text-left ${bgColor} p-2 w-[10%] text-base`}>
                  {service.total}
                </td>

                <td className={`text-center ${bgColor} p-2 w-[10%]`}>
                  {/* Delete button */}
                  <button
                    className="text-red-500 text-base"
                    onClick={() => removeService(service.id)}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
