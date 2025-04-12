import { useState, useEffect } from 'react';
import { Calendar, Clock, Filter, ChevronDown, CheckCircle, AlertCircle, XCircle, UserPlus, Search, RefreshCw } from 'lucide-react';

// Sample data based on your schema
const Appointment = [
  {
    id: '1a2b3c',
    doctor: {
      id: 'd1e2f3',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist'
    },
    appointmentDate: '2025-04-15',
    appointmentTime: '09:30:00',
    reason: 'Annual heart checkup',
    status: 'confirmed'
  },
  {
    id: '4d5e6f',
    doctor: {
      id: 'g7h8i9',
      name: 'Dr. Michael Stevens',
      specialization: 'Neurologist'
    },
    appointmentDate: '2025-04-20',
    appointmentTime: '14:00:00',
    reason: 'Follow-up consultation',
    status: 'pending'
  },
  {
    id: '7g8h9i',
    doctor: {
      id: 'j1k2l3',
      name: 'Dr. Emma Roberts',
      specialization: 'Dermatologist'
    },
    appointmentDate: '2025-04-25',
    appointmentTime: '11:15:00',
    reason: 'Skin condition assessment',
    status: 'confirmed'
  },
  {
    id: '0j1k2l',
    doctor: {
      id: 'm3n4o5',
      name: 'Dr. David Wilson',
      specialization: 'Orthopedic Surgeon'
    },
    appointmentDate: '2025-05-03',
    appointmentTime: '10:00:00',
    reason: 'Knee pain evaluation',
    status: 'cancelled'
  },
  {
    id: '3m4n5o',
    doctor: {
      id: 'p6q7r8',
      name: 'Dr. Lisa Chen',
      specialization: 'Psychiatrist'
    },
    appointmentDate: '2025-05-10',
    appointmentTime: '16:30:00',
    reason: 'Therapy session',
    status: 'pending'
  },
  {
    id: '6p7q8r',
    doctor: {
      id: 's9t0u1',
      name: 'Dr. Robert Brown',
      specialization: 'Ophthalmologist'
    },
    appointmentDate: '2025-05-12',
    appointmentTime: '13:45:00',
    reason: 'Vision check',
    status: 'completed'
  }
];

// Utility functions
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const formatTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed':
      return 'text-emerald-600 bg-emerald-50';
    case 'pending':
      return 'text-amber-600 bg-amber-50';
    case 'cancelled':
      return 'text-red-600 bg-red-50';
    case 'completed':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="w-4 h-4" />;
    case 'pending':
      return <AlertCircle className="w-4 h-4" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return null;
  }
};

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Simulate fetching data
  useEffect(() => {
    const fetchAppointments = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setAppointments(sampleAppointments);
        setFilteredAppointments(sampleAppointments);
        setIsLoading(false);
      }, 1000);
    };

    fetchAppointments();
  }, []);

  // Handle filtering and sorting
  useEffect(() => {
    let result = [...appointments];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        app => 
          app.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.reason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
      const dateB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);
      
      if (sortBy === 'date-asc') {
        return dateA - dateB;
      } else if (sortBy === 'date-desc') {
        return dateB - dateA;
      }
      
      return 0;
    });
    
    setFilteredAppointments(result);
  }, [appointments, searchTerm, statusFilter, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleSort = (sort) => {
    setSortBy(sort);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by doctor, specialty or reason"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {/* Filter and Actions */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
              </button>
              
              {isFilterOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1 divide-y divide-gray-100">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-700">Status</p>
                      <div className="mt-2 space-y-2">
                        {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((status) => (
                          <div key={status} className="flex items-center">
                            <input
                              id={`status-${status}`}
                              name="status"
                              type="radio"
                              checked={statusFilter === status}
                              onChange={() => handleStatusFilter(status)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`status-${status}`} className="ml-3 text-sm text-gray-700 capitalize">
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-700">Sort by</p>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="sort-date-asc"
                            name="sort"
                            type="radio"
                            checked={sortBy === 'date-asc'}
                            onChange={() => handleSort('date-asc')}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor="sort-date-asc" className="ml-3 text-sm text-gray-700">
                            Date (earliest first)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="sort-date-desc"
                            name="sort"
                            type="radio"
                            checked={sortBy === 'date-desc'}
                            onChange={() => handleSort('date-desc')}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor="sort-date-desc" className="ml-3 text-sm text-gray-700">
                            Date (latest first)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              New Appointment
            </button>
          </div>
        </div>
        
        {/* Appointments List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin" />
              <p className="mt-2 text-gray-500">Loading appointments...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Calendar className="h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments found</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? "Try adjusting your filters to see more results." 
                  : "You don't have any appointments scheduled."}
              </p>
              {(searchTerm || statusFilter !== 'all') && (
                <button
                  type="button"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                              {appointment.doctor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{appointment.doctor.name}</div>
                            <div className="text-sm text-gray-500">{appointment.doctor.specialization}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">{formatDate(appointment.appointmentDate)}</div>
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-500">{formatTime(appointment.appointmentTime)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{appointment.reason}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1">{appointment.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                            View
                          </button>
                          {appointment.status === 'pending' && (
                            <button className="text-red-600 hover:text-red-900 font-medium">
                              Cancel
                            </button>
                          )}
                          {appointment.status === 'confirmed' && (
                            <button className="text-amber-600 hover:text-amber-900 font-medium">
                              Reschedule
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination - simplified for this example */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAppointments.length}</span> of{' '}
                      <span className="font-medium">{filteredAppointments.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <button
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        1
                      </button>
                      <button
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}