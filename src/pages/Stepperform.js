
import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import Layout from "../component/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from '@mui/material/CircularProgress';
import { registerUser } from "../services/api";


const steps = ['Personal Information', 'Details', 'Skills Details', 'Credential Details'];

export default function Stepperform() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cookies] = useCookies(["authToken"]);
  const [loading, setLoading]=useState(false)

  const stepSchemas = [
    Yup.object({
      name: Yup.string().required("Name is required"),
      gender: Yup.string().required("Gender is required"),
      phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
      photo: Yup.mixed().required("Profile image is required"),
    }),
    Yup.object({
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
    }),
    Yup.object({
      skills: Yup.array().of(Yup.string().required('Skill is required')),
    }),
    Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
    })
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      phoneNumber: "",
      country: "",
      state: "",
      skills: [""],
      email: "",
      password: "",
      confirmPassword: "",
      photo:null
    },
    validationSchema: stepSchemas[activeStep],
    onSubmit: async (values) => {
      setLoading(true)
      if (activeStep === steps.length - 1) {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('password_confirmation', values.confirmPassword);
        formData.append('skills', values.skills.join(',')); 
        formData.append('gender', values.gender);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('token', cookies.authToken);
        formData.append('countryId', values.country);
        formData.append('stateId', values.state);
        if (values.photo) {
          formData.append('photo', values.photo);
        }
        
        try {
          const response = await registerUser(formData);
          console.log("Registration Success:", response.data);
          setLoading(false)
          toast.success("Registration Successful!");
          formik.resetForm()
          navigate("/List")
        } catch (error) {
          setLoading(false)
          console.error("Registration failed:", error);
          toast.error( error?.response?.data?.message[0] ||  "Error in Registration." );

        }
      } else {
        setLoading(false)
        handleNext();
      }
    },
  });

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Personaldetails formik={formik} />;
      case 1:
        return <Countrydetails formik={formik} />;
      case 2:
        return <Skillsdetails formik={formik} />;
      case 3:
        return <Credentaildetails formik={formik} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="text-[1.125rem] font-semibold text-left">Stepper Form</h3>
      </div>
      <div className="bg-white p-4 rounded-lg dark:border-gray-700">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="bg-white p-4 rounded-lg dark:border-gray-700">
        {activeStep === steps.length ? (
          <div className="flex justify-center w-full mt-5">
            <Typography variant="h5" className="mt-10 mb-10 pb-10">Thank you for submitting the form!</Typography>
            <Link to="/List" className="text-white bg-blue-700 px-5 py-2.5 rounded-lg">View List</Link>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            {getStepContent(activeStep)}
            <div className="flex justify-between mt-4">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                className="flex items-center"
              >
                {loading ? (
                  <CircularProgress size={24} className="mr-2" />
                ) : (
                  activeStep === steps.length - 1 ? 'Submit' : 'Next'
                )}
              </Button>

            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
