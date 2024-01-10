import { useEffect, FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaGoogle } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <>
      <Head title="Register" />

      <form
        onSubmit={submit}
        className="max-w-md mx-auto mt-56 border p-6 rounded-md"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

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

        <Link
          href={route("login")}
          className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center block mt-4"
        >
          Already registered?
        </Link>

        {/* Google Authentication */}
        <a
          href={route("auth.google")}
          className="border mx-auto w-[200px] text-center mt-4 py-2 rounded-md hover:bg-gray-100 flex items-center justify-center"
        >
          <FaGoogle className="inline-block mr-2 text-[#DB4437]" />
          Sign up using Google
        </a>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-10 rounded-md mx-auto block mt-4"
        >
          {processing ? (
            <ThreeDots color="#fff" height={20} width={40} />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
}
