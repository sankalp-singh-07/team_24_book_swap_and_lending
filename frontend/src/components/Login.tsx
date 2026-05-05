import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { apiEndpoints } from "../api/apiEnpoints";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post(apiEndpoints.LOGIN, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Logged in Successfully");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => {}, 2000);
        }
      });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-900 dark:text-gray-100"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Login</h3>

            <div className="mt-4 space-y-2">
              <label className="block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-xs text-red-500 ml-2">
                  This field is required
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <label className="block">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-xs text-red-500 ml-2">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex justify-around mt-6">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700 duration-200">
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer dark:text-blue-400"
                >
                  Signup
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
