import { useState } from 'react';
import { User, UserPlus, Shield, CheckCircle, ArrowRight, AtSign, Lock, Phone, Briefcase, Hospital, MapPin } from 'lucide-react';

export default function SignupPage() {
  const [userType, setUserType] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    hospital: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const selectUserType = (type) => {
    setUserType(type);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, would submit registration data
    setStep(4); // Move to success screen
  };

  const validateStep = () => {
    switch (step) {
      case 2: // Basic info validation
        return formData.firstName && formData.lastName && 
               formData.email && formData.password && 
               formData.confirmPassword && formData.password === formData.confirmPassword;
      case 3: // Professional/additional info validation
        if (userType === 'doctor') {
          return formData.specialization && formData.licenseNumber && formData.hospital;
        }
        return formData.address && formData.city && formData.state && formData.zipCode;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Create Your Account</h1>
          <p className="text-gray-600 mt-2">Join our healthcare platform to connect with doctors and patients</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Progress Indicator */}
          {step > 1 && step < 4 && (
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                      ${step > s ? 'bg-blue-600 text-white' : step === s ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                      {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                    </div>
                    <p className={`ml-2 text-sm font-medium ${step >= s ? 'text-black' : 'text-gray-500'}`}>
                      {s === 1 ? 'Account Type' : s === 2 ? 'Basic Info' : 'Additional Details'}
                    </p>
                    {s < 3 && <div className="mx-4 h-px w-12 bg-gray-200 hidden sm:block"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-6">
            {/* Step 1: Choose Account Type */}
            {step === 1 && (
              <div className="py-6">
                <h2 className="text-xl font-bold text-center mb-8">I want to register as a:</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Doctor Option */}
                  <button 
                    onClick={() => selectUserType('doctor')}
                    className="flex flex-col items-center p-8 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all hover:bg-blue-50"
                  >
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Briefcase className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Doctor</h3>
                    <p className="text-gray-600 text-center mt-2">
                      I'm a healthcare professional and want to offer my services
                    </p>
                  </button>
                  
                  {/* Patient Option */}
                  <button 
                    onClick={() => selectUserType('patient')}
                    className="flex flex-col items-center p-8 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all hover:bg-blue-50"
                  >
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <User className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Patient</h3>
                    <p className="text-gray-600 text-center mt-2">
                      I'm looking for medical consultations and healthcare services
                    </p>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Basic Info */}
            {step === 2 && (
              <form onSubmit={(e) => {e.preventDefault(); nextStep();}}>
                <h2 className="text-xl font-bold mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="johndoe@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full p-3 pl-10 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                    )}
                  </div>
                </div>
              </form>
            )}
            
            {/* Step 3: Additional Details */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-6">
                  {userType === 'doctor' ? 'Professional Information' : 'Additional Information'}
                </h2>
                
                {userType === 'doctor' ? (
                  <div>
                    <div className="mb-6">
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="specialization"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Specialization</option>
                          <option value="cardiology">Cardiology</option>
                          <option value="dermatology">Dermatology</option>
                          <option value="neurology">Neurology</option>
                          <option value="orthopedics">Orthopedics</option>
                          <option value="pediatrics">Pediatrics</option>
                          <option value="psychiatry">Psychiatry</option>
                          <option value="general">General Medicine</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Shield className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="licenseNumber"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="MD12345678"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic Affiliation</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Hospital className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="hospital"
                          name="hospital"
                          value={formData.hospital}
                          onChange={handleChange}
                          className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="City Medical Center"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123 Main St"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="San Francisco"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="CA"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="94105"
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              </form>
            )}
            
            {/* Step 4: Success */}
            {step === 4 && (
              <div className="py-8 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-blue-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-black mb-3">Registration Successful!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Your account has been created. You can now log in to access our healthcare platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                    Log In
                  </button>
                  
                  {userType === 'doctor' && (
                    <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition-colors duration-200">
                      Complete Profile
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer with navigation buttons */}
          {step > 1 && step < 4 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              <button 
                onClick={prevStep}
                className="flex items-center text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Back
              </button>
              
              <button 
                onClick={step === 3 ? handleSubmit : nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                disabled={!validateStep()}
              >
                {step === 3 ? 'Create Account' : 'Continue'}
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          )}
        </div>
        
        {/* Already have an account */}
        {step < 4 && (
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Log In</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}