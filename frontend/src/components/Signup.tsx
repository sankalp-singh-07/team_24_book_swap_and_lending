import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { apiEndpoints } from "../api/apiEnpoints";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [role, setRole] = useState("user"); // Add a state for the role

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      address: data.address, // Include address in the submitted data
      number: data.number,
      role: role, // Add the role to the user info
    };

    await axios
      .post(apiEndpoints.SIGNUP, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-[600px]">
          <div className="modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-900 dark:text-gray-100"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              <div className="flex absolute right-7 top-7">
                {/* <p className="text-xl dark:text-gray-300">
                  Organization?{" "}
                  <Link
                    to="/signup/organization"
                    className="underline text-blue-500 dark:text-blue-400 cursor-pointer"
                  >
                    Signup
                  </Link>{" "}
                </p> */}
              </div>
              
                {/* Radio button for role selection */}
                <div className="mt-4 space-y-2">
                <label className="block">Signup as</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="user"
                      checked={role === "user"}
                      onChange={() => setRole("user")}
                      className="form-radio"
                    />
                    <span>User</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="organization"
                      checked={role === "organization"}
                      onChange={() => setRole("organization")}
                      className="form-radio"
                    />
                    <span>Organization</span>
                  </label>
                </div>
              </div>

              {/* Fullname */}
              <div className="mt-4 space-y-2">
                <label className="block">Name</label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <label className="block">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 border rounded-md outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Number */}
              <div className="mt-4 space-y-2">
                <label className="block">Number</label>
                <input
                  type="text"
                  placeholder="Enter your number"
                  className="w-80 px-3 py-1 border rounded-md outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  {...register("number", { required: true })}
                />
                {errors.number && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="mt-4 space-y-2">
                <label className="block">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-80 px-3 py-1 border rounded-md outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 border rounded-md outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Button */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700 duration-200">
                  Signup
                </button>
                <p className="text-xl dark:text-gray-300">
                  Have an account?{" "}
                  <button
                    className="underline text-blue-500 dark:text-blue-400 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>{" "}
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
