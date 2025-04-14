import { use, useEffect, useState } from 'react';
import { Search, MapPin, Filter, Heart, Calendar, Star, ChevronDown, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { useFetchDoctorsQuery } from '../../redux/api/doctorsAPI';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import m_doctor from "../../assets/images/m_doctor.jpg";  


export default function DoctorFinder() {
  const [specialty, setSpecialty] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 3;
  
  // Using the provided data
  const {data:allDoctors,isLoading}=useFetchDoctorsQuery();
  if(isLoading){
    return <Loader/>;
  }
  
  
  
  // Calculate pagination
  const totalPages = Math.ceil(allDoctors.length / doctorsPerPage);
  
  // Get current doctors based on pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = allDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Get all unique specializations for filter buttons
  const specializations = [...new Set(allDoctors.map(doctor => doctor.specialization))];

  
  return (
    <div className="min-h-screen bg-gray-50 py-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 sm:mb-3">Find Your Perfect Doctor</h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base">Connect with top-rated healthcare professionals in your area and book appointments instantly.</p>
        </div>
        
        {/* Search bar with location */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-10 transition-all hover:shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Search doctors, specialties..." 
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Your location" 
                defaultValue="San Francisco, CA"
              />
            </div>
            
            <div className="sm:col-span-2 lg:col-span-1">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                Find Doctors
              </button>
            </div>
          </div>
        </div>
        
        {/* Specialty categories - Horizontal scrolling on mobile */}
        <div className="mb-6 sm:mb-10 overflow-x-auto pb-2">
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 min-w-max sm:min-w-0">
            {[...specializations, 'All Specialties'].map((item) => (
              <button 
                key={item}
                onClick={() => setSpecialty(item)}
                className={`${
                  specialty === item ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-gray-100'
                } py-3 px-4 rounded-lg shadow-sm transition-all duration-200 text-center font-medium whitespace-nowrap flex-shrink-0 sm:flex-shrink`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        
        {/* Filter and sort - Mobile responsive */}
        <div className="mb-6">
          {/* Mobile view - Toggle filters button */}
          <div className="block sm:hidden mb-4">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm text-black"
            >
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters & Sort
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {showMobileFilters && (
              <div className="mt-3 grid grid-cols-1 gap-3">
               
                <div className="relative">
                  <select className="appearance-none w-full bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 focus:ring-blue-500 focus:border-blue-500">
                    <option>Sort by: Recommended</option>
                    <option>Sort by: Highest rated</option>
                    <option>Sort by: Experience</option>
                    <option>Sort by: Lowest fees</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Desktop view */}
          <div className="hidden sm:flex flex-wrap justify-between items-center">
            
            
            <div className="relative w-full sm:w-auto">
              <select className="appearance-none w-full bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 focus:ring-blue-500 focus:border-blue-500">
                <option>Sort by: Recommended</option>
                <option>Sort by: Highest rated</option>
                <option>Sort by: Experience</option>
                <option>Sort by: Lowest fees</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="grid gap-4 sm:gap-6">
          {currentDoctors.map((doctor) => (
            <div key={doctor.user_id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group">
              <div className="flex flex-col md:flex-row">
                <div className="p-4 sm:p-6 flex justify-center items-center md:w-1/4">
                  <div className="relative">
                    <Link to={`/doctor/${doctor.user_id}`}><img src={m_doctor} alt={doctor.name} className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-contain border-4 border-gray-100" /></Link>
                    <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md transition-transform group-hover:scale-110">
                      <Heart className="h-4 w-4 text-gray-500 hover:text-blue-500" />
                    </button>
                    {doctor.trending && (
                      <div className="absolute top-0 right-0 bg-blue-600 p-1 rounded-full shadow-md">
                        <TrendingUp className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 md:w-2/4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Link to={`/doctor/${doctor.user_id}`}><h3 className="text-lg sm:text-xl font-bold text-black hover:underline">{doctor.name}</h3></Link>
                    {doctor.trending && (
                      <span className="hidden sm:inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </span>
                    )}
                  </div>
                  
                  <p className="text-black mb-1">{doctor.specialization}</p>
                  <p className="text-gray-600 text-sm mb-3">{doctor.qualifications}</p>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-blue-500 fill-blue-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-black font-medium">{doctor.rating}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="inline-flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {doctor.experience_years} years exp
                    </span>
                    <span className="inline-flex items-center bg-blue-50 text-blue-800 px-2 py-1 rounded">
                      ${doctor.consultation_fee} fee
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 bg-gray-50 md:w-1/4 flex flex-col justify-center items-center">
                  <div className="text-center mb-4">
                    <span className="block text-gray-800 font-semibold">Availability</span>
                    <span className="text-blue-600 font-bold">
                      {doctor.available ? "Available Today" : "Next Week"}
                    </span>
                  </div>
                  
                  <Link to={`/appointment/${doctor.user_id}`} className="w-full">
                    <div className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                      Book Appointment
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 mb-2">
          <nav className="flex items-center space-x-1">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
        
        {/* Results summary */}
        <div className="text-center text-gray-700 text-sm mt-2">
          Showing {indexOfFirstDoctor + 1}-{Math.min(indexOfLastDoctor, allDoctors.length)} of {allDoctors.length} doctors
        </div>
      </div>
    </div>
  );
}