import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  UserCog,
  Users,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Award,
  DollarSign,
  CheckCircle,
  Loader,
} from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [userType, setUserType] = useState("patient");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { registerUser } = useAuth();

  // Reset form when user type changes to avoid field data persistence
  const handleUserTypeChange = (type) => {
    setUserType(type);
    reset(); // This will clear all form fields when changing user type
  };

  const onSubmit = (data) => {
    // Set submitting state to true to disable the button
    setIsSubmitting(true);
    
    // Remove fields that aren't relevant to the selected user type
    let userData = { ...data, role: userType };

    // Only include relevant fields based on user type
    if (userType === "patient") {
      // Remove doctor and staff specific fields
      const {
        specialization,
        qualifications,
        experienceYears,
        consultationFee,
        profilePhoto,
        department,
        position,
        employeeId,
        ...patientData
      } = userData;
      userData = patientData;
    } else if (userType === "doctor") {
      // Remove patient and staff specific fields
      const { department, position, employeeId, ...doctorData } = userData;
      userData = doctorData;
    } else if (userType === "staff") {
      // Remove patient and doctor specific fields
      const {
        age,
        address,
        specialization,
        qualifications,
        experienceYears,
        consultationFee,
        profilePhoto,
        ...staffData
      } = userData;
      userData = staffData;
    }

    // Call the registerUser mutation with the cleaned userData
    registerUser(userData)
      .then((response) => {
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "success",
          title: "Registration successful!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "small-toast",
          },
        });
        reset(); // Reset the form after successful registration
        navigate("/login"); // Redirect to login page after successful registration
      })
      .catch((error) => {
        Swal.fire({
          toast: true,
          position: "top",
          icon: "error",
          title: "Login failed!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "small-toast",
          },
        });
      })
      .finally(() => {
        // Reset submitting state regardless of success or failure
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-2">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image and tagline */}
          <div className="bg-blue-600 md:w-2/5 p-8 text-white flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">HealthPlum</h1>
            <p className="text-blue-100 mb-6">
              Join our healthcare platform for better care coordination and
              simplified appointment management.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>24/7 Online Consultations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Secure Medical Records</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Easy Appointment Scheduling</span>
              </div>
            </div>
          </div>

          {/* Right side - Registration form */}
          <div className="md:w-3/5 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Create an Account
            </h2>

            {/* User type selector */}
            <div className="flex flex-wrap mb-6 gap-2">
              <UserTypeButton
                icon={<User />}
                label="Patient"
                active={userType === "patient"}
                onClick={() => handleUserTypeChange("patient")}
              />
              <UserTypeButton
                icon={<UserCog />}
                label="Doctor"
                active={userType === "doctor"}
                onClick={() => handleUserTypeChange("doctor")}
              />
              <UserTypeButton
                icon={<Users />}
                label="Staff"
                active={userType === "staff"}
                onClick={() => handleUserTypeChange("staff")}
              />
            </div>

            {/* Registration form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Common fields for all user types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  icon={<User className="text-gray-500" />}
                  label="Full Name"
                  name="name"
                  register={register}
                  required="Full name is required"
                  error={errors.name}
                  placeholder="Enter your full name"
                />

                <InputField
                  icon={<Mail className="text-gray-500" />}
                  label="Email Address"
                  name="email"
                  type="email"
                  register={register}
                  required="Email is required"
                  pattern={{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  }}
                  error={errors.email}
                  placeholder="email@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  icon={<Lock className="text-gray-500" />}
                  label="Password"
                  name="password"
                  type="password"
                  register={register}
                  required="Password is required"
                  minLength={{
                    value: 8,
                    message: "Password must be at least 8 characters",
                  }}
                  error={errors.password}
                  placeholder="Create a strong password"
                />

                <InputField
                  icon={<Lock className="text-gray-500" />}
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  register={register}
                  required="Please confirm password"
                  error={errors.confirmPassword}
                  placeholder="Confirm your password"
                />
              </div>

              {/* Phone number - common for all user types */}
              <InputField
                icon={<Phone className="text-gray-500" />}
                label="Phone Number"
                name="phoneNumber"
                register={register}
                required="Phone number is required"
                error={errors.phoneNumber}
                placeholder="Enter phone number"
              />

              {/* User type specific fields */}
              {userType === "patient" && (
                <PatientFields register={register} errors={errors} />
              )}

              {userType === "doctor" && (
                <DoctorFields register={register} errors={errors} />
              )}

              {userType === "staff" && (
                <StaffFields register={register} errors={errors} />
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link to={'/login'} className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// User type button component
const UserTypeButton = ({ icon, label, active, onClick }) => {
  return (
    <button
      type="button"
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// Input field component
const InputField = ({
  icon,
  label,
  name,
  type = "text",
  register,
  required,
  pattern,
  minLength,
  error,
  placeholder = "",
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
          }`}
          {...register(name, {
            required: required,
            pattern: pattern,
            minLength: minLength,
          })}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs italic mt-1">{error.message}</p>
      )}
    </div>
  );
};

// Patient specific fields
const PatientFields = ({ register, errors }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={<Calendar className="text-gray-500" />}
          label="Age"
          name="age"
          type="number"
          register={register}
          required="Age is required"
          error={errors.age}
          placeholder="Enter your age"
        />

        <InputField
          icon={<MapPin className="text-gray-500" />}
          label="Address"
          name="address"
          register={register}
          required="Address is required"
          error={errors.address}
          placeholder="Enter your full address"
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="male"
                {...register("gender", { required: "Gender is required" })}
                className="accent-blue-500"
              />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="female"
                {...register("gender", { required: "Gender is required" })}
                className="accent-pink-500"
              />
              Female
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="other"
                {...register("gender", { required: "Gender is required" })}
                className="accent-green-500"
              />
              Other
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

// Doctor specific fields
const DoctorFields = ({ register, errors }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={<UserCog className="text-gray-500" />}
          label="Specialization"
          name="specialization"
          register={register}
          required="Specialization is required"
          error={errors.specialization}
          placeholder="E.g., Cardiology, Pediatrics"
        />

        <InputField
          icon={<Award className="text-gray-500" />}
          label="Qualifications"
          name="qualifications"
          register={register}
          required="Qualifications are required"
          error={errors.qualifications}
          placeholder="E.g., MBBS, MD, MS"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={<Calendar className="text-gray-500" />}
          label="Experience (years)"
          name="experienceYears"
          type="number"
          register={register}
          required="Experience is required"
          error={errors.experienceYears}
          placeholder="Years of experience"
        />

        <InputField
          icon={<DollarSign className="text-gray-500" />}
          label="Consultation Fee"
          name="consultationFee"
          type="number"
          register={register}
          required="Consultation fee is required"
          error={errors.consultationFee}
          placeholder="Fee amount"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Upload Profile Photo
        </label>
        <input
          type="file"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          {...register("profilePhoto")}
        />
      </div>
    </>
  );
};

// Staff specific fields - ONLY staff-relevant fields
const StaffFields = ({ register, errors }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={<UserCog className="text-gray-500" />}
          label="Department"
          name="department"
          register={register}
          required="Department is required"
          error={errors.department}
          placeholder="E.g., Admin, Reception, Ambulance"
        />

        <InputField
          icon={<UserCog className="text-gray-500" />}
          label="Position"
          name="position"
          register={register}
          required="Position is required"
          error={errors.position}
          placeholder="E.g., Receptionist, Driver"
        />
      </div>

      <InputField
        icon={<Calendar className="text-gray-500" />}
        label="Employee ID"
        name="employeeId"
        register={register}
        required="Employee ID is required"
        error={errors.employeeId}
        placeholder="Enter employee ID"
      />
    </>
  );
};

export default SignUpPage;