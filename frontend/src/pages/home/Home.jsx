import React from "react";
import {Link} from "react-router-dom";
import doctorsImage from "../../assets/images/doctors.png";

import { Clock, Coins } from "lucide-react";

import bigPoster from "../../assets/images/bigPoster.svg";
import { useFetchTrendingDoctorsQuery } from "../../redux/api/doctorsAPI";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const Home = () => {
  const {
    data: doctors = [],
    isLoading,
    isError,
  } = useFetchTrendingDoctorsQuery();
  console.log(doctors);

  return (
    <section className="">
      <div>
        <div className="w-full flex flex-col gap-4">
          <img
            src={bigPoster}
            alt="doctors"
            className="w-full hidden sm:block"
          />
          <img src={doctorsImage} alt="doctors" className="sm:hidden" />
          <div className="flex justify-between">
            <h1 className="font-semibold text-lg">Recommended Doctors</h1>
          </div>

          {/* use swiper js for this grid */}

          <div className="w-full">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                480: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
              navigation={true}
              modules={[Navigation]}
              className="statSwiper h-full"
            >
              {doctors.map((doctor) => (
                <SwiperSlide key={doctor.doctor_id}>
                  <div className="group transition-all duration-300">
                    <div className="border border-gray-200 hover:border-gray-400 hover:shadow-md bg-white rounded-lg flex flex-col items-center p-4 gap-3 transition-all duration-300">
                      <div className="flex gap-4 py-3 items-center w-full border-b border-gray-100">
                        <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden shadow-sm flex-shrink-0">
                          {doctor.face_url ? (
                            <img
                              src={doctor.face_url}
                              alt={doctor.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400">
                              {doctor.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="text-lg font-semibold text-gray-800">
                            {doctor.name}
                          </h1>
                          <div className="flex gap-2 text-xs">
                            <div className="border-r border-gray-300 pr-2">
                              <p className="text-gray-600">specialist</p>
                            </div>
                            <p className="text-gray-600">
                              {doctor.experience_years} years experience
                            </p>
                          </div>
                          <div className="w-fit mt-1">
                            <p className="text-gray-700 bg-gray-100 text-xs py-1 px-3 rounded-full font-medium">
                              {doctor.specialization}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 w-full justify-center py-2">
                        <div className="border-r border-gray-200 pr-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <h1 className="text-sm font-medium text-gray-700">
                              Tue, Thu
                            </h1>
                          </div>
                          <p className="ml-6 text-gray-600 text-xs">
                            10:00 AM - 01:00 PM
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-gray-500" />
                            <p className="text-sm font-medium text-gray-700">
                              ${doctor.consultation_fee}
                            </p>
                          </div>
                          <p className="ml-6 text-gray-600 text-xs">
                            Starting price
                          </p>
                        </div>
                      </div>
                      <Link to={`/appointment/${doctor.doctor_id}`} className="w-full">
                      <button className="w-full py-2 px-4 bg-cyan-700 hover:bg-cyan-800 text-white font-medium rounded-md transition-colors duration-300 mt-2 shadow-sm">
                        Book an appointment
                      </button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
