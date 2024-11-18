
import React, { useState } from "react";
import Layout from "../../component/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from '@mui/material/CircularProgress';

export default function AddProduct() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["authToken"]);
  const [imageError, setImageError] = useState("");
  const [loading, setLoading]=useState(false)

  const formik = useFormik({
    initialValues: {
      productName: "",
      productImage: null,
      description: "",
      price: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      productImage: Yup.mixed().required("Product Image is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().typeError("Price must be a number").required("Price is required"),
    }),
    onSubmit: async (values) => {
      const file = values.productImage;
      setLoading(true)
      if (file && file.size > 2048 * 1024) {
        setImageError("The image must not be greater than 2048 kilobytes.");
        toast.error("Image size exceeds 2 MB!");
        return;
      } else {
        setImageError("");
      }

      const formData = new FormData();
      formData.append("name", values.productName);
      formData.append("image", file);
      formData.append("description", values.description);
      formData.append("price", parseFloat(values.price));
      formData.append("token", cookies.authToken);

      try {
        const response = await axios.post(
          "https://reactinterviewtask.codetentaclestechnologies.tech/api/api/add-product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Product added successfully!");
        console.log("Product added:", response.data);
        setLoading(false)
        formik.resetForm()
        navigate("/Product")
      } catch (error) {
        setLoading(false)
        toast.error(error.response?.data?.message || "Failed to add product!");
        console.error("Error adding product:", error.response ? error.response.data : error.message);
      }
    },
  });

  return (
    <Layout>
      <ToastContainer />
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
          Add Product
        </h3>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-700 text-left">
                Product Name
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="productName"
                type="text"
                name="productName"
                placeholder="Product Name"
                value={formik.values.productName}
                onChange={formik.handleChange}
              />
              {formik.touched.productName && formik.errors.productName ? (
                <p className="text-red-500 text-xs text-left">{formik.errors.productName}</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="productImage" className="block mb-2 text-sm font-medium text-gray-700 text-left">
                Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="productImage"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input
                    id="productImage"
                    type="file"
                    name="productImage"
                    className="hidden"
                    onChange={(event) => formik.setFieldValue("productImage", event.currentTarget.files[0])}
                  />
                </label>
              </div>
              {formik.touched.productImage && formik.errors.productImage ? (
                <p className="text-red-500 text-xs text-left">{formik.errors.productImage}</p>
              ) : null}
              {imageError && (
                <p className="text-red-500 text-xs">{imageError}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700 text-left">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                value={formik.values.description}
                onChange={formik.handleChange}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <p className="text-red-500 text-xs text-left">{formik.errors.description}</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700 text-left">
                Price
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                name="price"
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.touched.price && formik.errors.price ? (
                <p className="text-red-500 text-xs text-left">{formik.errors.price}</p>
              ) : null}
            </div>

            <div className="flex justify-between">
              <Link
                to="/Product"
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <CircularProgress size={24} className="mr-2 text-white" />
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
