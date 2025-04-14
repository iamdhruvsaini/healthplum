import { useState } from 'react';
import { Calendar, Clock, Star } from 'lucide-react';

// Doctor Profile Component
export function DoctorProfile() {
  // Sample data for the logged-in doctor
  const doctor = {
    id: "d5f3c6b9-8a4e-4d1f-9c7b-2e3f5a6b7c8d",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@healthplum.com",
    role: "doctor",
    specialization: "Cardiology",
    qualifications: "MD, PhD, FACC",
    experience_years: 12,
    consultation_fee: 150.00,
    face_url: "/api/placeholder/400/400",
    trending: true,
    rating: 4.8,
    available: true,
    appointments: [
      {
        patient: "Michael Chen",
        date: "April 14, 2025",
        time: "9:30 AM",
        reason: "Heart palpitations follow-up"
      },
      {
        patient: "Emma Rodriguez",
        date: "April 14, 2025",
        time: "11:00 AM",
        reason: "Initial consultation"
      },
      {
        patient: "David Kim",
        date: "April 15, 2025",
        time: "2:15 PM",
        reason: "Annual checkup"
      }
    ]
  };

  const [isAvailable, setIsAvailable] = useState(doctor.available);

  return (
    <div className="min-h-screen bg-gray-50">
    
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src={doctor.face_url}
              alt={doctor.name}
              className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-sm mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
              <p className="text-blue-600">{doctor.specialization}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
              <Star className="text-yellow-400 h-5 w-5 mr-1" />
              <span className="font-medium">{doctor.rating}/5</span>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={isAvailable} 
                onChange={() => setIsAvailable(!isAvailable)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-800">
                {isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Details</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium">{doctor.experience_years} years</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="font-medium">${doctor.consultation_fee}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Qualifications</span>
                    <span className="font-medium">{doctor.qualifications}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{doctor.email}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Schedule Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Working Hours</h3>
                
                <div className="space-y-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                    <div key={day} className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
                      <span className="text-gray-600">{day}</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm py-2">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-500">Closed</span>
                  </div>
                </div>
                
                <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Modify Schedule
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Appointments */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800">Today's Appointments</h3>
                  <p className="text-gray-600">Monday, April 14, 2025</p>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {doctor.appointments.filter(appt => appt.date === "April 14, 2025").map((appointment, index) => (
                  <div key={index} className="p-6 hover:bg-blue-50 transition duration-150">
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{appointment.patient}</h4>
                          <p className="text-sm text-gray-600">{appointment.reason}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Start
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 text-gray-600 text-sm rounded hover:bg-gray-50">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
                
                <div className="divide-y divide-gray-100">
                  {doctor.appointments.filter(appt => appt.date !== "April 14, 2025").map((appointment, index) => (
                    <div key={index} className="py-4 hover:bg-gray-50 transition duration-150">
                      <div className="flex justify-between items-start">
                        <div className="flex">
                          <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center text-gray-600 font-bold mr-3">
                            {appointment.patient.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{appointment.patient}</h4>
                            <p className="text-sm text-gray-600">{appointment.reason}</p>
                            <div className="flex items-center mt-1">
                              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{appointment.date}</span>
                              <Clock className="h-4 w-4 text-gray-400 ml-2 mr-1" />
                              <span className="text-sm text-gray-600">{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  View Full Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Patient Profile Component
