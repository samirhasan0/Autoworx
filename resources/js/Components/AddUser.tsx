import { useEffect, FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Popup from "./Popup";
import { usePopupStore } from "@/stores/popup";
import { ThreeDots } from "react-loader-spinner";

export default function AddUser() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",    
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const { close } = usePopupStore();

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register", { should_login: "false" }), {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Popup>
      <form onSubmit={submit} className="p-6 rounded-md w-[500px]">
        <h1 className="text-2xl font-semibold mb-4 text-center">Add user</h1>

        <div>
          <label htmlFor="name" className="block mb-2">
            Name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            onChange={(e) => setData("name", e.target.value)}
            required
            autoFocus
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData("email", e.target.value)}
            required
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password", e.target.value)}
            required
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="password_confirmation" className="block mb-2">
            Password Confirmation
          </label>

          <input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
            required
          />
          {errors.password_confirmation && (
            <div className="text-red-500">{errors.password_confirmation}</div>
          )}
        </div>

        <div className="flex flex-row gap-5 justify-center mt-5">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            {processing ? (
              <ThreeDots color="#fff" height={20} width={40} />
            ) : (
              "Submit"
            )}
          </button>

          <button
            type="button"
            onClick={close}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </Popup>
  );
}
