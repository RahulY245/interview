
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useCookies } from "react-cookie";
import { fetchCountries, fetchStates } from "../../services/api";

export default function CountryDetails({ formik }) {
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cookies] = useCookies(["authToken", "userType"]);

  useEffect(() => {
     fetchCountries()
      .then((response) => {
        console.log("Fetched Countries:", response.data); 
        const countries = response.data.data.map((country) => ({
          value: country.id,
          label: country.name,
        }));
        setCountryOptions(countries);
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }, [cookies.authToken]);

  
  useEffect(() => {
    if (selectedCountry) {
       fetchStates(selectedCountry.value)
        .then((response) => {
          const states = response.data.data.map((state) => ({
            value: state.id,
            label: state.name,
          }));
          setStateOptions(states);
        })
        .catch((error) =>
          console.error("Error fetching state data:", error)
        );
    }
  }, [selectedCountry, cookies.authToken]);

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
          Details
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-2 md:grid-cols-2">
            {/* Country Select */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                htmlFor="country"
              >
                Select Country
              </label>
              <Select
                className="basic-single text-left text-sm text-gray-700 rounded border border-gray-200"
                classNamePrefix="select"
                name="country"
                options={countryOptions.length ? countryOptions : [{ value: '', label: 'Loading...' }]}
                value={countryOptions.find(
                  (option) => option.value === formik.values.country
                ) || null}
                onChange={(option) => {
                  formik.setFieldValue("country", option.value);
                  setSelectedCountry(option);
                }}
              />
              {formik.touched.country && formik.errors.country ? (
                <div className="text-red-500 text-sm mt-1 text-left">
                  {formik.errors.country}
                </div>
              ) : null}
            </div>

            {/* State Select */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                htmlFor="state"
              >
                Select State
              </label>
              <Select
                className="basic-single text-left text-sm text-gray-700 rounded border border-gray-200"
                classNamePrefix="select"
                name="state"
                options={stateOptions}
                value={stateOptions.find(
                  (option) => option.value === formik.values.state
                )}
                onChange={(option) => formik.setFieldValue("state", option.value)}
                isDisabled={!selectedCountry}
              />
              {formik.touched.state && formik.errors.state ? (
                <div className="text-red-500 text-sm mt-1 text-left">
                  {formik.errors.state}
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
