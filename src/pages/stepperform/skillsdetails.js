import React from "react";

export default function SkillsDetails({ formik }) {
  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Skills Details</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="skills">
                Skills
              </label>
              <div className="mb-4">
                {formik.values.skills.map((skill, index) => (
                  <div key={index} className="flex space-x-6 mb-4">
                    <input
                      type="text"
                      name={`skills[${index}]`}
                      value={skill}
                      onChange={formik.handleChange}
                      placeholder="Add Skills"
                      className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="button"
                      onClick={() => formik.setFieldValue('skills', formik.values.skills.filter((_, i) => i !== index))}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {formik.touched.skills && formik.errors.skills && (
                  <div className="text-red-500 text-sm mt-1 text-left">{formik.errors.skills}</div>
                )}
              </div>
              <button
                type="button"
                onClick={() => formik.setFieldValue('skills', [...formik.values.skills, ''])}
                className="text-white bg-blue-700 text-left flex hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add Skills
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
