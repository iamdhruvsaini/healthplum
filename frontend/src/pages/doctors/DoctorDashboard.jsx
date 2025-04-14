import React, { useState} from 'react';
import { Calendar, Clock, User, FileText, CheckCircle, XCircle, AlertCircle,Search } from 'lucide-react';
import DoctorNavbar from './DoctorNavbar';
import { useAuth } from '../../context/AuthContext';
import { useFetchAppointmentByDoctorIDQuery, useFetchDoctorsByIdQuery } from '../../redux/api/doctorsAPI';
import m_doctor from '../../assets/images/m_doctor.jpg';

const DoctorDashboard = () => {
 

  const {currentUser}=useAuth();
  const doctorId=currentUser?.id;
  const {data:doctorInfo,isLoading:doctorProfileLoading}=useFetchDoctorsByIdQuery(doctorId);
  const {data:appointments,isLoading:appointmentsLoding}=useFetchAppointmentByDoctorIDQuery(doctorId);
 
  // State for active tab and filters
  const [activeTab, setActiveTab] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  if(doctorProfileLoading || appointmentsLoding) {
    return <div className="flex justify-center items-center h-screen"><p className="text-lg">Loading...</p></div>;
  }

  // Filter appointments based on active tab and status filter
  const filteredAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const dateMatches = 
      (activeTab === 'today' && apt.appointment_date === today) ||
      (activeTab === 'tomorrow' && apt.appointment_date === tomorrowStr) ||
      (activeTab === 'upcoming');
      
    const statusMatches = 
      statusFilter === 'all' || 
      apt.status === statusFilter;
      
    return dateMatches && statusMatches;
  });

  // Get stats for each status
  const getStatusCount = (status) => {
    return appointments.filter(apt => apt.status === status).length;
  };

  // Helper function to render status badge
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Confirmed</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Cancelled</span>;
      default:
        return null;
    }
  };

 
  return (
    <div className="min-h-screen bg-gray-50 xl:w-[1300px] mx-auto px-4">
      {/* Top navigation bar */}
      <DoctorNavbar/>

      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Doctor profile and stats */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 bg-blue-600 text-white">
                <div className="flex items-center space-x-4">
                  <img 
                    src={m_doctor || "/api/placeholder/80/80"} 
                    alt="Doctor profile" 
                    className="h-16 w-16 rounded-full object-contain border-4 border-white bg-white" 
                  />
                  <div>
                    <h2 className="text-xl font-bold">{currentUser.name}</h2>
                    <p className="text-blue-100">{doctorInfo.specialization}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Profile Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Qualifications:</span>
                      <span className="font-medium text-gray-900">{doctorInfo.qualifications}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Experience:</span>
                      <span className="font-medium text-gray-900">{doctorInfo.experience_years} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Consultation Fee:</span>
                      <span className="font-medium text-gray-900">${doctorInfo.consultation_fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating:</span>
                      <span className="font-medium text-gray-900">{doctorInfo.rating}5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`font-medium ${doctorInfo.available ? 'text-green-600' : 'text-red-600'}`}>
                        {doctorInfo.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Appointment Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-blue-600">{getStatusCount('confirmed')}</p>
                      <p className="text-sm text-gray-500">Confirmed</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-yellow-600">{getStatusCount('pending')}</p>
                      <p className="text-sm text-gray-500">Pending</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-green-600">{getStatusCount('completed')}</p>
                      <p className="text-sm text-gray-500">Completed</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-red-600">{getStatusCount('cancelled')}</p>
                      <p className="text-sm text-gray-500">Cancelled</p>
                    </div>
                  </div>
                </div>
                
               
              </div>
            </div>
          </div>
          
          {/* Main content - Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('today')}
                    className={`px-4 py-4 text-sm font-medium ${
                      activeTab === 'today' 
                        ? 'border-b-2 border-blue-600 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Today's Appointments
                  </button>
                  <button
                    onClick={() => setActiveTab('tomorrow')}
                    className={`px-4 py-4 text-sm font-medium ${
                      activeTab === 'tomorrow' 
                        ? 'border-b-2 border-blue-600 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Tomorrow
                  </button>
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-4 text-sm font-medium ${
                      activeTab === 'upcoming' 
                        ? 'border-b-2 border-blue-600 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Upcoming
                  </button>
                </div>
              </div>
              
              {/* Search and filter */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                  <div className="relative max-w-xs">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search patients..."
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Appointments list */}
              <div className="overflow-hidden">
                {filteredAppointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Schedule
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reason
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAppointments.map((appointment) => (
                          <tr key={appointment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <User size={24} className="mx-auto h-10 w-10 rounded-full bg-gray-100 p-2 text-gray-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {appointment.patient.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {appointment.patient.age} yrs, {appointment.patient.gender}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Calendar size={16} className="mr-1 text-gray-500" /> 
                                  {new Date(appointment.appointment_date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <Clock size={16} className="mr-1 text-gray-500" /> 
                                  {appointment.appointment_time}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis">
                                {appointment.reason}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {renderStatusBadge(appointment.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex space-x-2">
                                {appointment.status === 'pending' && (
                                  <>
                                    <button className="text-green-600 hover:text-green-900">
                                      <CheckCircle size={18} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                      <XCircle size={18} />
                                    </button>
                                  </>
                                )}
                                {appointment.status === 'confirmed' && (
                                  <button className="text-blue-600 hover:text-blue-900">
                                    <FileText size={18} />
                                  </button>
                                )}
                                <button className="text-gray-600 hover:text-gray-900">
                                  <AlertCircle size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Calendar size={48} className="mx-auto text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {activeTab === 'today' 
                        ? "You don't have any appointments scheduled for today." 
                        : activeTab === 'tomorrow'
                          ? "You don't have any appointments scheduled for tomorrow."
                          : "No upcoming appointments match your filters."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;