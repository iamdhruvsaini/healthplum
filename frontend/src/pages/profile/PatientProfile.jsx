import React from 'react';
import { User, Phone, MapPin, Calendar, Clock, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGetPatientAppointmentsQuery, useGetPatientProfileQuery } from '../../redux/api/patientAPI';

export function PatientProfile() {
  const { currentUser } = useAuth();
  const patientId = currentUser?.id;
  
  const { data: patientData ,isLoading:profileQueryLoading,isError:profileQueryError} = useGetPatientProfileQuery(patientId);
  const { data: appointments, isLoading:appointmentQueryLoading , isError:appointmentQueryError } = useGetPatientAppointmentsQuery(patientId);
  
  const patient = patientData?.patient;
  const patientAppointments = appointments?.appointments || [];

  if (profileQueryLoading || appointmentQueryLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (profileQueryError || appointmentQueryError) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-red-600 max-w-3xl mx-auto my-4 shadow-sm">
        <p className="text-center font-medium">An error occurred while fetching your data. Please try again later.</p>
      </div>
    );
  }

  // Format time from 24h format to 12h format
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Format date from YYYY-MM-DD to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Get status style based on appointment status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mx-auto my-6 transition-all duration-300 hover:shadow-xl">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-5 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <User className="text-white" size={24} />
          Patient Profile
        </h2>
        <p className="mt-1 opacity-80 text-sm">View and manage your health information</p>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Basic Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span>Personal Information</span>
            <div className="h-px bg-gray-200 flex-grow ml-3"></div>
          </h3>
          <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 hover:bg-gray-100 transition-colors duration-300">
            <div className="transform transition hover:translate-x-1 duration-300">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
              <p className="font-semibold text-gray-800">{patient.name}</p>
            </div>
            <div className="transform transition hover:translate-x-1 duration-300">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
              <p className="font-medium text-gray-800 break-all">{patient.email}</p>
            </div>
            <div className="transform transition hover:translate-x-1 duration-300">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Age</p>
              <p className="font-semibold text-gray-800">{patient.age} years</p>
            </div>
            <div className="transform transition hover:translate-x-1 duration-300">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Gender</p>
              <p className="font-semibold text-gray-800 capitalize">{patient.gender}</p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span>Contact Details</span>
            <div className="h-px bg-gray-200 flex-grow ml-3"></div>
          </h3>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3 hover:bg-gray-100 transition-colors duration-300">
            <div className="flex items-center gap-3 transform transition hover:translate-x-1 duration-300">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                <p className="font-semibold text-gray-800">{patient.phone_number}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 transform transition hover:translate-x-1 duration-300">
              <div className="bg-blue-100 p-2 rounded-full mt-1">
                <MapPin size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Address</p>
                <p className="font-semibold text-gray-800">{patient.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span>Your Appointments</span>
            <div className="h-px bg-gray-200 flex-grow ml-3"></div>
          </h3>
          
          {patientAppointments.length > 0 ? (
            <div className="space-y-3">
              {patientAppointments.map(appointment => (
                <div 
                  key={appointment.id} 
                  className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors duration-300 border border-transparent hover:border-blue-200"
                >
                  <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="font-semibold text-gray-800">{appointment.doctor_name}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{appointment.specialization}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar size={16} className="text-blue-500" />
                      <span>{formatDate(appointment.appointment_date)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock size={16} className="text-blue-500" />
                      <span>{formatTime(appointment.appointment_time)}</span>
                    </div>
                  </div>
                  {appointment.reason && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-700"><span className="font-medium">Reason:</span> {appointment.reason}</p>
                    </div>
                  )}
                 
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-xl text-center border border-dashed border-gray-300">
              <Activity className="mx-auto text-gray-400 mb-3" size={32} />
              <p className="text-gray-600 font-medium mb-1">No appointments found</p>
              <p className="text-gray-500 text-sm">Schedule your first appointment to get started</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
                Book Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}