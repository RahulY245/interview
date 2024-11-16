import React from "react";

export default function Credentaildetails({ formik }) {
  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Credential Details</h1>
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-left text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1 text-left">{formik.errors.password}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-left text-gray-700" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1 text-left">{formik.errors.confirmPassword}</div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
