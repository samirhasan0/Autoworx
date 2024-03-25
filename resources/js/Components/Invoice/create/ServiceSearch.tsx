import { useInvoiceStore } from "@/stores/invoice";
import { ServiceType } from "@/types/invoice";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function ServiceSearch() {
  const [shouldShow, setShouldShow] = useState(false);
  const { props } = usePage();
  const allServices = props.services as ServiceType[];
  const { services, addService } = useInvoiceStore();

  const [servicesToShow, setServicesToShow] = useState(allServices);

  return (
    <div className="border-none app-shadow rounded-md w-[300px] flex items-center px-2">
      <FaSearch />
      <input
        type="text"
        id="search"
        name="search"
        required
        placeholder="Search and Add Product/Service"
        className="p-1 px-3 text-sm w-full border-none focus:ring-0"
        onFocus={() => setShouldShow(true)}
        onBlur={() => setTimeout(() => setShouldShow(false), 150)}
        onChange={(e) => {
          // filter the services
          const search = e.target.value;
          const filteredServices = allServices.filter((service) =>
            service.name.toLowerCase().includes(search.toLowerCase())
          );

          setServicesToShow(filteredServices);
        }}
      />

      {shouldShow && (
        <div className="absolute w-[300px] bg-white app-shadow rounded-md mt-20 z-50">
          {servicesToShow.map((service) => (
            <div
              key={service.id}
              className="p-2 border-b border-[#EFEFEF] hover:bg-[#F4F4F4] cursor-pointer"
              onClick={() => {
                // check if the service already exists
                const exists = services.find((s) => s.id === service.id);
                if (!exists) {
                  addService(service);
                }
              }}
            >
              <p className="text-sm">{service.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
