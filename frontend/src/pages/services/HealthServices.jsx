import { useState } from 'react';
import { Stethoscope, Ambulance, Brain, Heart, Activity, ArrowRight, Calendar, Clipboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HealthServices() {
  const [activeTab, setActiveTab] = useState('detection');
  
  // Updated disease detection models array to match your routes
  const diseaseModels = [
    {
      id: 'heart-disease',
      name: 'Heart Disease Detection',
      description: 'Early detection using ECG data, vital signs, and patient history',
      icon: <Heart size={24} />,
      bgColor: 'bg-blue-50',
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonColor: 'text-blue-600',
      buttonHoverColor: 'hover:text-blue-800',
      link: '/heart-disease-detection'
    },
    {
      id: 'parkinsons',
      name: 'Parkinson\'s Disease Detection',
      description: 'Analysis of movement patterns, handwriting samples, and vocal biomarkers',
      icon: <Brain size={24} />,
      bgColor: 'bg-purple-50',
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      buttonColor: 'text-purple-600',
      buttonHoverColor: 'hover:text-purple-800',
      link: '/parkinson-disease-detection'
    },
    {
      id: 'breast-cancer',
      name: 'Breast Cancer Detection',
      description: 'Analysis of cell features to detect early signs of breast cancer',
      icon: <Clipboard size={24} />,
      bgColor: 'bg-pink-50',
      iconBgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
      buttonColor: 'text-pink-600',
      buttonHoverColor: 'hover:text-pink-800',
      link: '/breast-cancer-detection'
    },
    {
      id: 'calories-prediction',
      name: 'Calories Prediction',
      description: 'Estimate calorie requirements based on physical characteristics and activity level',
      icon: <Activity size={24} />,
      bgColor: 'bg-green-50',
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonColor: 'text-green-600',
      buttonHoverColor: 'hover:text-green-800',
      link: '/calories-prediction'
    },
    {
      id: 'insurance-prediction',
      name: 'Insurance Price Prediction',
      description: 'Estimate health insurance costs based on personal health factors',
      icon: <Clipboard size={24} />,
      bgColor: 'bg-yellow-50',
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      buttonColor: 'text-yellow-600',
      buttonHoverColor: 'hover:text-yellow-800',
      link: '/insurance-prediction'
    }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Modern Healthcare Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced AI diagnostics and healthcare solutions at your fingertips
          </p>
        </div>
        
        {/* Service Tabs */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('detection')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'detection' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Stethoscope size={20} />
              <span>Health Services</span>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('ambulance')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'ambulance' 
                ? 'bg-red-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Ambulance size={20} />
              <span>Ambulance Service</span>
            </div>
          </button>
        </div>
        
        {/* Content Based on Active Tab */}
        {activeTab === 'detection' ? (
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Health Services</h3>
            <p className="text-gray-600 mb-8">
              Our advanced AI models can help detect early signs of various diseases and provide health insights with high accuracy.
              Select from our range of services below.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Map through disease models */}
              {diseaseModels.map((model) => (
                <div key={model.id} className={`${model.bgColor} rounded-lg p-6 transition-all hover:shadow-md`}>
                  <div className={`${model.iconBgColor} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                    <div className={model.iconColor}>
                      {model.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{model.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {model.description}
                  </p>
                  <Link 
                    to={model.link}
                    className={`flex items-center ${model.buttonColor} font-medium text-sm ${model.buttonHoverColor} transition-colors`}
                  >
                    <span>Access Service</span>
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Emergency Ambulance Service</h3>
                <p className="text-gray-600 mb-6">
                  Request an ambulance quickly in emergency situations. Our fleet is equipped with 
                  advanced medical equipment and trained paramedics.
                </p>
                
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                  <h4 className="flex items-center text-red-700 font-medium mb-2">
                    <Ambulance size={18} className="mr-2" />
                    For medical emergencies, call our hotline:
                  </h4>
                  <p className="text-2xl font-bold text-red-700">1-800-HEALTH-911</p>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter your current address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Description</label>
                    <textarea 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Briefly describe the emergency situation"
                      rows={3}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button className="w-full bg-red-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-700 transition-colors focus:ring-4 focus:ring-red-200">
                      Request Ambulance Now
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar size={20} className="mr-2" />
                    Schedule Non-Emergency Transport
                  </h4>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                    <input 
                      type="time" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transport Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                      <option>Basic Life Support</option>
                      <option>Advanced Life Support</option>
                      <option>Critical Care Transport</option>
                      <option>Wheelchair Accessible</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-medium text-gray-700">Medical Equipment Needed</label>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-medium text-gray-700">Medical Staff Assistance Required</label>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200">
                    Schedule Transport
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}