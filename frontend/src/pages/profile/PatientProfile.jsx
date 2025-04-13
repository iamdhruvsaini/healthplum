import { Calendar, Clock, Star, Phone, MapPin, Mail, Award, Briefcase, User, Activity, Clipboard, Truck, CheckCircle, Bell, Settings, LogOut, FileText } from 'lucide-react';

export function PatientProfile() {
    // Sample data for the logged-in patient
    const patient = {
      id: "a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "patient",
      age: 35,
      gender: "male",
      phone_number: "+1 (555) 123-4567",
      address: "123 Main Street, Apt 4B, Boston, MA 02115",
      upcoming_appointments: [
        {
          doctor: "Dr. Sarah Johnson",
          specialty: "Cardiology",
          date: "April 20, 2025",
          time: "10:30 AM",
          reason: "Annual checkup"
        },
        {
          doctor: "Dr. James Wilson",
          specialty: "Dermatology",
          date: "May 5, 2025",
          time: "2:15 PM",
          reason: "Skin examination"
        }
      ],
      past_appointments: [
        {
          doctor: "Dr. Sarah Johnson",
          specialty: "Cardiology",
          date: "October 15, 2024",
          time: "11:00 AM",
          notes: "Normal heart function. Continue current medication."
        }
      ],
      medications: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          refill_date: "May 1, 2025"
        }
      ]
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Profile Information */}
            <div className="md:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-500 h-24"></div>
                <div className="px-6 pb-6">
                  <div className="flex justify-center -mt-12">
                    <div className="h-24 w-24 rounded-full bg-white p-1 shadow">
                      <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-12 w-12 text-blue-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-3">
                    <h2 className="text-xl font-bold text-gray-800">{patient.name}</h2>
                    <p className="text-gray-600 text-sm">Patient ID: {patient.id.substring(0, 8)}</p>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-800">{patient.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-800">{patient.phone_number}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-800">{patient.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Medical Info Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Age</span>
                      <span className="font-medium">{patient.age} years</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gender</span>
                      <span className="font-medium capitalize">{patient.gender}</span>
                    </div>
                </div>

                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <h4 className="font-medium text-gray-800 mb-2">Current Medications</h4>
                    
                    {patient.medications.length > 0 ? (
                      <div className="space-y-3">
                        {patient.medications.map((medication, index) => (
                          <div key={index} className="bg-blue-50 rounded-md p-3">
                            <div className="flex justify-between">
                              <p className="font-medium">{medication.name}</p>
                              <p className="text-blue-600">{medication.dosage}</p>
                            </div>
                            <p className="text-sm text-gray-600">{medication.frequency}</p>
                            <div className="flex justify-between items-center mt-1 text-sm">
                              <span>Next refill: {medication.refill_date}</span>
                              <button className="text-blue-600 hover:text-blue-800">Request</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No current medications</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Appointments */}
            <div className="md:col-span-2 space-y-6">
              {/* Actions Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-300 flex flex-col items-center justify-center">
                    <Calendar className="h-6 w-6 mb-1" />
                    <span>Book Appointment</span>
                  </button>
                  <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-3 px-4 rounded-md transition duration-300 flex flex-col items-center justify-center">
                    <Truck className="h-6 w-6 mb-1 text-blue-600" />
                    <span>Request Ambulance</span>
                  </button>
                </div>
              </div>
              
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {patient.upcoming_appointments.map((appointment, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition duration-150">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{appointment.doctor}</h4>
                          <p className="text-blue-600 text-sm">{appointment.specialty}</p>
                          <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                          <div className="flex items-center mt-2">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{appointment.date}</span>
                            <Clock className="h-4 w-4 text-gray-400 ml-3 mr-1" />
                            <span className="text-sm text-gray-600">{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Past Appointments */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Medical History</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {patient.past_appointments.map((appointment, index) => (
                    <div key={index} className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-800">{appointment.doctor}</h4>
                            <span className="ml-2 text-sm text-gray-500">({appointment.date})</span>
                          </div>
                          <p className="text-blue-600 text-sm">{appointment.specialty}</p>
                          <div className="mt-2 bg-gray-50 p-3 rounded-md">
                            <p className="text-sm text-gray-700">{appointment.notes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center w-full">
                    View Complete Medical History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  