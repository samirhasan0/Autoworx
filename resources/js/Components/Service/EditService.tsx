import { FaTimes } from "react-icons/fa";
import Popup from "../Popup";
import { usePopupStore } from "@/stores/popup";
import { useForm } from "@inertiajs/react";
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";

export default function EditService() {
  const { close, data } = usePopupStore();
  const {
    data: formData,
    setData,
    put,
    processing,
    errors,
    reset,
  } = useForm<{
    name: string;
    price: number | null;
    description: string;
    quantity: number | null;
    discount: number | null;
    total: number | null;
  }>({
    name: data.service.name,
    price: data.service.price,
    description: data.service.description,
    quantity: data.service.quantity,
    discount: data.service.discount,
    total: data.service.total,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    put(route("service.update", data.service.id), {
      onSuccess: () => {
        close();
      },
    });
  };

  useEffect(() => {
    // calculate total
    const price = formData.price;
    const quantity = formData.quantity;
    const discount = formData.discount;

    if (price === null || quantity === null || discount === null) return;

    const total = price * quantity - discount;
    setData("total", total);
  }, [formData.price, formData.quantity, formData.discount]);

  return (
    <Popup>
      <div className="px-2 py-3 w-[30rem]">
        <div className="px-3 py-1 flex justify-between items-center">
          <h2 className="font-bold text-xl">Edit Service</h2>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mt-2">
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              id="price"
              name="price"
              required
              value={formData.price!}
              onChange={(e) => setData("price", parseFloat(e.target.value))}
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          <div className="mt-2">
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={(e) => setData("description", e.target.value)}
              placeholder="Description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="mt-2">
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              id="quantity"
              name="quantity"
              required
              value={formData.quantity!}
              onChange={(e) => setData("quantity", parseInt(e.target.value))}
              placeholder="Quantity"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>

          <div className="mt-2">
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              id="discount"
              name="discount"
              required
              value={formData.discount!}
              onChange={(e) => setData("discount", parseFloat(e.target.value))}
              placeholder="Discount"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm">{errors.discount}</p>
            )}
          </div>

          <div className="mt-2">
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              id="total"
              name="total"
              required
              value={formData.total!}
              onChange={(e) => setData("total", parseFloat(e.target.value))}
              placeholder="Total"
            />
            {errors.total && (
              <p className="text-red-500 text-sm">{errors.total}</p>
            )}
          </div>

          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md active:scale-95 mx-auto block"
            type="submit"
          >
            {processing ? (
              <ThreeDots color="#fff" height={20} width={40} />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </Popup>
  );
}
