
import React, { useState, useEffect } from "react";

export default function PersonalDetails({ formik }) {
  const img = "https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
  const [profileImage, setProfileImage] = useState(img);
  useEffect(() => {
    if (formik.values.photo) {
      const objectURL = URL.createObjectURL(formik.values.photo);
      setProfileImage(objectURL);
    } else if (img) {

      const fetchImage = async () => {
        const response = await fetch(img);
        const blob = await response.blob(); 
        const file = new File([blob], "image.jpg", { type: blob.type }); 

        formik.setFieldValue("photo", file);
        
        const objectURL = URL.createObjectURL(file);
        setProfileImage(objectURL);
      };
      fetchImage();
    }
  }, [formik.values.photo]);
  


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setProfileImage(objectURL);
      formik.setFieldValue("photo", file);
    }
  };
  

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="block text-left w-full text-gray-500 text-2xl font-bold mb-6">
          Personal Details
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="profile">
              Profile Image
            </label>
            <div className="mt-1 flex flex-col items-start">
              <span className="inline-block w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={profileImage} 
                  alt="profilepic"
                  className="w-20 h-20 m-auto rounded-full shadow"
                />
              </span>
              <div className="flex items-center justify-center bg-grey-lighter">
                <label className="w-50 flex flex-col items-center px-4 py-2 mt-5 bg-blue-300 text-gray-700 rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
                  <span className="text-base leading-normal">Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {formik.touched.photo && formik.errors.photo ? (
                <div className="text-red-500 text-sm mt-1 text-left">{formik.errors.photo}</div>
              ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-x-7 md:grid-cols-2">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm mt-1 text-left">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="gender">
                Gender
              </label>
              <div className="flex space-x-7">
                <div className="flex items-center">
                  <input
                    id="gender-male"
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formik.values.gender === "male"}
                    onChange={formik.handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500"
                  />
                  <label htmlFor="gender-male" className="ms-2 text-sm font-medium text-gray-900">Male</label>
                </div>
                <div className="flex items-center">
                  <input
                    id="gender-female"
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formik.values.gender === "female"}
                    onChange={formik.handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500"
                  />
                  <label htmlFor="gender-female" className="ms-2 text-sm font-medium text-gray-900">Female</label>
                </div>
                <div className="flex items-center">
                  <input
                    id="gender-other"
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formik.values.gender === "other"}
                    onChange={formik.handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500"
                  />
                  <label htmlFor="gender-other" className="ms-2 text-sm font-medium text-gray-900">Others</label>
                </div>
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="text-red-500 text-sm mt-1 text-left">{formik.errors.gender}</div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-x-7 md:grid-cols-2">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500 text-sm mt-1 text-left">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
