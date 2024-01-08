import { useEffect, FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <>
      {/* Title */}
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Head>

      <form
        onSubmit={submit}
        className="max-w-md mx-auto mt-56 border p-6 rounded-md"
      >
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoFocus
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>

        <Link
          href={route("register")}
          className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center block mt-4"
        >
          Don't have an account? Register
        </Link>

        {/* Google Authentication */}
        <a
          href={route("auth.google")}
          className="border mx-auto w-[200px] text-center mt-4 py-2 rounded-md hover:bg-gray-100 flex items-center justify-center"
        >
          <FaGoogle className="inline-block mr-2 text-[#DB4437]" />
          Login with Google
        </a>

        <button
          type="submit"
          className="px-4 mt-5 py-2 bg-blue-500 text-white rounded-md mx-auto block"
        >
          Submit
        </button>
      </form>
    </>
  );
}
