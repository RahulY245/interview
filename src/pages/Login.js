
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["authToken", "userType"]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://reactinterviewtask.codetentaclestechnologies.tech/api/api/login",
          values
        );
        if (response.data && response.data.token) {
          toast.success("Login successful!");
          setCookie("authToken", response.data.token , { path: "/", expires: new Date(Date.now() + 1 * 60 * 60 * 1000) }
        );
          setCookie("role", response.data.role, { path: "/", expires: new Date(Date.now() + 1 * 60 * 60 * 1000) }
        ); 
        response.data.role === "Admin" ? navigate("/List") : navigate("/Product")
          
          formik.resetForm();
        } else {
          toast.error("Invalid login response. Please try again.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      }
    },
  });

  return (
    <section
      className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img"
      style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}
    >
      <ToastContainer />
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-96 flex">
            <div className="w-full bg-login p-6 rounded-lg">
              <div className="heading-1 pt-10 m-auto">
                <img
                  src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg"
                  alt="login-img"
                  className="rounded-full m-auto p-1 border"
                  width="100px"
                  height="100px"
                />
                <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">
                  Login
                </h3>
              </div>
              <form onSubmit={formik.handleSubmit} className="pt-8 rounded">
                <div className="mb-4">
                  <input
                    className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm mt-1 text-left">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <input
                    className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm mt-1 text-left">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="mb-6 text-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
