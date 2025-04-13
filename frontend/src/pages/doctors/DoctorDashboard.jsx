import { Star, User, Mail, DollarSign, Award, Briefcase, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { useFetchDoctorsByIdQuery } from '../../redux/api/doctorsAPI';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import m_doctor from "../../assets/images/m_doctor.jpg";  


export default function DoctorDashboard() {
  // Doctor data
  const {doctorId}=useParams();
  const {data:doctorData,isLoading} = useFetchDoctorsByIdQuery(doctorId);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if(isLoading || !doctorData) {
    return (
      <Loader/>
    );
  }
  return (
    <div className="mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold">Doctor Profile</h1>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Image Section */}
          <div className="col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <img 
                  src={m_doctor} 
                  alt={doctorData.name}
                  className="w-48 h-48 rounded-full object-contain shadow-md border-4 bg-white border-white"
                  onError={(e) => {
                    e.target.src = {m_doctor};
                    e.target.alt = "Profile image placeholder";
                  }}
                />
                {doctorData.trending && (
                  <div className="absolute -top-2 -right-2 bg-blue-400 text-white p-2 rounded-full shadow-md">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                )}
              </div>
              
              <div className="w-full text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{doctorData.name}</h2>
                <p className="text-blue-600 font-medium mb-2">{doctorData.specialization}</p>
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} 
                      className={`w-5 h-5 ${i < Math.floor(doctorData.rating) ? 'text-blue-400 fill-blue-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">{doctorData.rating}</span>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-lg font-semibold text-gray-800">${doctorData.consultation_fee}</span>
                    <span className="text-gray-500 ml-1">per session</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className={`px-3 py-1 rounded-full ${doctorData.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} font-medium flex items-center`}>
                    <CheckCircle className={`w-4 h-4 mr-1 ${doctorData.available ? 'text-green-600' : 'text-red-600'}`} />
                    {doctorData.available ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Account Info</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <span className="font-medium">User ID:</span>
                  <p className="text-gray-800 mt-1">{doctorData.user_id}</p>
                </div>
                <div>
                  <span className="font-medium">Created on:</span>
                  <p className="text-gray-800 mt-1">{formatDate(doctorData.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Information Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-800">{doctorData.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-1" />
                      <p className="font-medium text-gray-800">{doctorData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Professional Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Professional Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="font-medium text-blue-600">{doctorData.specialization}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Qualifications</p>
                    <p className="font-medium text-gray-800">{doctorData.qualifications}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium text-gray-800">{doctorData.experience_years} years</p>
                  </div>
                </div>
              </div>
              
              {/* Appointment Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Award className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Appointment Settings</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Consultation Fee</p>
                    <p className="font-medium text-gray-800">${doctorData.consultation_fee}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} 
                          className={`w-4 h-4 ${i < Math.floor(doctorData.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-1 text-gray-700">{doctorData.rating}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doctorData.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {doctorData.available ? 'Available' : 'Unavailable'}
                      </span>
                      
                      {doctorData.trending && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}