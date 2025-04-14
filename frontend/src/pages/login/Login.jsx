import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, UserCog, Users, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';
import Processing from "../../components/Processing";


const Login = () => {
  const [userType, setUserType] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      
      if (response?.error) {
        throw new Error("Login failed");
      }
      const user = response?.data?.user?.role;
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "small-toast",
        },
      });
      
      reset();
      if(user === "patient"){
        navigate("/");
      }
      else if(user === "doctor"){
        navigate("/doctor-portal");
      }
    } catch (error) {
      console.log(error);
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
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
   
  if(isLoading){
    return <Processing/>
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-4">
      <div className=" bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Brand and tagline */}
          <div className="bg-blue-600 md:w-2/5 p-8 text-white flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">HealthPlum</h1>
            <p className="text-blue-100 mb-6">
              Your health, our priority. Access your healthcare services with a
              simple login.
            </p>
            <div className="mt-6">
              <div className="flex items-center space-x-2 text-blue-100 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span>Patient Portal</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <UserCog className="h-4 w-4" />
                </div>
                <span>Doctor Dashboard</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
                <span>Staff Management</span>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="md:w-3/5 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 mb-6">Sign in to your account</p>

            {/* User type selector */}
            <div className="flex flex-wrap mb-6 gap-2">
              <UserTypeButton
                icon={<User />}
                label="Patient"
                active={userType === "patient"}
                onClick={() => setUserType("patient")}
              />
              <UserTypeButton
                icon={<UserCog />}
                label="Doctor"
                active={userType === "doctor"}
                onClick={() => setUserType("doctor")}
              />
              <UserTypeButton
                icon={<Users />}
                label="Staff"
                active={userType === "staff"}
                onClick={() => setUserType("staff")}
              />
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-500 h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                      errors.email
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="your@email.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-500 h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                      errors.password
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...register("rememberMe")}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

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
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to={'/register'} className="text-blue-600 hover:underline">
                Create one
              </Link>
            </div>

            {userType === "patient" && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Need urgent care?{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Book an emergency consultation
                    </a>
                  </p>
                </div>
              </div>
            )}
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

export default Login;