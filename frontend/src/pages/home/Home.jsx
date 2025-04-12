import React from "react";

import doctors from "../../assets/images/doctors.png";
import { CiClock2 } from "react-icons/ci";
import { PiCoins } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

import bigPoster from "../../assets/images/bigPoster.svg";

const Home = () => {
  return (
    <section className="grid grid-flow-row place-items-center content">
      <div>
        <div className="w-full flex flex-col gap-4">
          <img
            src={bigPoster}
            alt="doctors"
            className="w-full hidden sm:block"
          />
          <img src={doctors} alt="doctors" className="sm:hidden" />
          <div className="flex justify-between">
            <h1 className="font-semibold">Recommended Doctors</h1>
            <div className="center">
              <button>
                <FaAngleLeft />
              </button>
              <button>
                <FaAngleRight />
              </button>
            </div>
          </div>
          <div className="grid xl:grid-cols-4 min-[960px]:grid-cols-3 sm:grid-cols-2  gap-2">
            <div className="flex flex-col">
              <div className="border-2 flex flex-col items-center p-3 gap-2 rounded-md">
                <div className="flex gap-4 py-2 items-center w-fit border-b-2 ">
                  <div className="w-16 h-16 rounded-full bg-slate-200"></div>
                  <div className="flex flex-col xl:gap-2">
                    <h1 className="text-md font-medium">Amanda Clara</h1>
                    <div className="flex gap-2">
                      <div className="border-e-2 pr-2">
                        <p className="text-gray-700 text-sm"> specialist</p>
                      </div>
                      <p className="text-gray-700 text-sm">
                        12 years experience
                      </p>
                    </div>
                    <div className="w-fit">
                      <p className="text-iconblue bg-teal-50 text-sm p-1 rounded-xl">
                        Padiatric
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-fit">
                  <div className="border-r-2 px-4">
                    <div className="flex items-center gap-2">
                      <CiClock2 />
                      <h1 className="text-sm font-medium">Tue,Thu</h1>
                    </div>
                    <p className="ml-6 text-gray-700 text-sm">
                      10:00 AM-01:00 PM
                    </p>
                  </div>
                  <div>
                    <div>
                      <div className="flex items-center gap-2">
                        <PiCoins />
                        <p className="text-sm font-medium">$25</p>
                      </div>
                      <p className="ml-6 text-gray-700 text-sm">Starting</p>
                    </div>
                  </div>
                </div>

                <button className="btn text-md w-full">
                  Book an appointment
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="border-2 flex flex-col items-center p-3 gap-2 rounded-md">
                <div className="flex gap-4 py-2 items-center w-fit border-b-2 ">
                  <div className="w-16 h-16 rounded-full bg-slate-200"></div>
                  <div className="flex flex-col xl:gap-2">
                    <h1 className="text-md font-medium">Amanda Clara</h1>
                    <div className="flex gap-2">
                      <div className="border-e-2 pr-2">
                        <p className="text-gray-700 text-sm"> specialist</p>
                      </div>
                      <p className="text-gray-700 text-sm">
                        12 years experience
                      </p>
                    </div>
                    <div className="w-fit">
                      <p className="text-iconblue bg-teal-50 text-sm p-1 rounded-xl">
                        Padiatric
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-fit">
                  <div className="border-r-2 px-4">
                    <div className="flex items-center gap-2">
                      <CiClock2 />
                      <h1 className="text-sm font-medium">Tue,Thu</h1>
                    </div>
                    <p className="ml-6 text-gray-700 text-sm">
                      10:00 AM-01:00 PM
                    </p>
                  </div>
                  <div>
                    <div>
                      <div className="flex items-center gap-2">
                        <PiCoins />
                        <p className="text-sm font-medium">$25</p>
                      </div>
                      <p className="ml-6 text-gray-700 text-sm">Starting</p>
                    </div>
                  </div>
                </div>

                <button className="btn text-md w-full">
                  Book an appointment
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="border-2 flex flex-col items-center p-3 gap-2 rounded-md">
                <div className="flex gap-4 py-2 items-center w-fit border-b-2 ">
                  <div className="w-16 h-16 rounded-full bg-slate-200"></div>
                  <div className="flex flex-col xl:gap-2">
                    <h1 className="text-md font-medium">Amanda Clara</h1>
                    <div className="flex gap-2">
                      <div className="border-e-2 pr-2">
                        <p className="text-gray-700 text-sm"> specialist</p>
                      </div>
                      <p className="text-gray-700 text-sm">
                        12 years experience
                      </p>
                    </div>
                    <div className="w-fit">
                      <p className="text-iconblue bg-teal-50 text-sm p-1 rounded-xl">
                        Padiatric
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-fit">
                  <div className="border-r-2 px-4">
                    <div className="flex items-center gap-2">
                      <CiClock2 />
                      <h1 className="text-sm font-medium">Tue,Thu</h1>
                    </div>
                    <p className="ml-6 text-gray-700 text-sm">
                      10:00 AM-01:00 PM
                    </p>
                  </div>
                  <div>
                    <div>
                      <div className="flex items-center gap-2">
                        <PiCoins />
                        <p className="text-sm font-medium">$25</p>
                      </div>
                      <p className="ml-6 text-gray-700 text-sm">Starting</p>
                    </div>
                  </div>
                </div>

                <button className="btn text-md w-full">
                  Book an appointment
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="border-2 flex flex-col items-center p-3 gap-2 rounded-md">
                <div className="flex gap-4 py-2 items-center w-fit border-b-2 ">
                  <div className="w-16 h-16 rounded-full bg-slate-200"></div>
                  <div className="flex flex-col xl:gap-2">
                    <h1 className="text-md font-medium">Amanda Clara</h1>
                    <div className="flex gap-2">
                      <div className="border-e-2 pr-2">
                        <p className="text-gray-700 text-sm"> specialist</p>
                      </div>
                      <p className="text-gray-700 text-sm">
                        12 years experience
                      </p>
                    </div>
                    <div className="w-fit">
                      <p className="text-iconblue bg-teal-50 text-sm p-1 rounded-xl">
                        Padiatric
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-fit">
                  <div className="border-r-2 px-4">
                    <div className="flex items-center gap-2">
                      <CiClock2 />
                      <h1 className="text-sm font-medium">Tue,Thu</h1>
                    </div>
                    <p className="ml-6 text-gray-700 text-sm">
                      10:00 AM-01:00 PM
                    </p>
                  </div>
                  <div>
                    <div>
                      <div className="flex items-center gap-2">
                        <PiCoins />
                        <p className="text-sm font-medium">$25</p>
                      </div>
                      <p className="ml-6 text-gray-700 text-sm">Starting</p>
                    </div>
                  </div>
                </div>

                <button className="btn text-md w-full">
                  Book an appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
