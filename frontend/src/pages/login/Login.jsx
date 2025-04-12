import { UserRound, UserCog, ArrowRight } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [userType, setUserType] = useState("doctor");
  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Login</h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-3 font-medium">Login as...</p>
          <div className="grid grid-cols-2 gap-4">
            <button 
              className={`flex items-center justify-center p-4 rounded-lg transition-all ${
                userType === "doctor" 
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-500" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setUserType("doctor")}
            >
              <UserCog className="mr-2" size={20} />
              Doctor
            </button>
            <button 
              className={`flex items-center justify-center p-4 rounded-lg transition-all ${
                userType === "patient" 
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-500" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setUserType("patient")}
            >
              <UserRound className="mr-2" size={20} />
              Patient
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors">
          Login
          <ArrowRight className="ml-2" size={18} />
        </button>
        
        <p className="text-center mt-6 text-gray-600 text-sm">
          Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;