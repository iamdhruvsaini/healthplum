import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  DollarSign,
  ClockFading,
} from "lucide-react";
import { useFetchDoctorsByIdQuery } from "../../redux/api/doctorsAPI";
import { useParams } from "react-router-dom";
import m_doctor from "../../assets/images/m_doctor.jpg";
import { useAuth } from "../../context/AuthContext";
import { useBookAppointmentMutation } from "../../redux/api/patientAPI";
import Swal from "sweetalert2";

export default function AppointmentBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const { doctorId } = useParams();
  const { data: doctor, isLoading } = useFetchDoctorsByIdQuery(doctorId);
  const { currentUser } = useAuth();
  const [bookAppointment] = useBookAppointmentMutation();

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedDate: "",
      selectedTime: "",
      appointmentType: "",
      appointmentReason: "",
      isInsurance: "true", // String value for radio buttons to work correctly
      insuranceProvider: "",
      insuranceId: "",
      patientName: currentUser.name,
      patientEmail: currentUser.email,
      patientPhone: "",
      patientId: currentUser.id,
      doctorId: doctorId,
    },
  });

  // Watch form values
  const formValues = watch();

  // Generate dates for the next 10 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const formattedDate = {
        full: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
        short: date.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        }),
        value: date.toISOString().split("T")[0],
      };

      dates.push(formattedDate);
    }

    return dates;
  };

  // Generate available time slots
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
  ];

  // Appointment types
  const appointmentTypes = [
    "New Patient Visit",
    "Follow-up",
    "Annual Physical",
    "Consultation",
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data) => {
    console.log("Appointment form submitted with data:", data);
    bookAppointment(data)
      .unwrap()
      .then((response) => {
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "success",
          title: "Booking successful!",
          showConfirmButton: false,
          timer: 4500,
          customClass: {
            popup: "small-toast",
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "success",
          title: "Server Down !",
          showConfirmButton: false,
          timer: 4500,
          customClass: {
            popup: "small-toast",
          },
        });
      });
    setCurrentStep(4);
  };

  // Handle insurance radio change
  const handleInsuranceChange = (value) => {
    setValue("isInsurance", value);
    // If changing to self-pay, clear insurance fields
    if (value === "false") {
      setValue("insuranceProvider", "");
      setValue("insuranceId", "");
    }
  };

  if (isLoading || doctor === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClockFading className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-4 px-8 mx-auto">
      {/* Header with doctor info */}
      <div className="bg-gray-50 p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <img
              src={m_doctor}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-contain border-2 border-white shadow-md"
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
              <p className="text-blue-600 font-medium">
                {doctor.specialization}
              </p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(doctor.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-gray-600">
                  {doctor.rating}
                </span>
              </div>
            </div>
          </div>
          <div className="sm:ml-auto mt-3 sm:mt-0 flex flex-col sm:items-end">
            <div className="flex items-center text-gray-600 font-medium">
              <DollarSign className="w-5 h-5 text-green-600 mr-1" />
              <span>${doctor.consultation_fee}</span>
              <span className="text-sm ml-1">consultation fee</span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              {doctor.qualifications}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              {doctor.experience_years} years of experience
            </div>
          </div>
        </div>
      </div>

      {/* Progress steps */}
      <div className="px-4 md:px-6 pt-6">
        <div className="flex justify-between mb-8">
          <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className="flex items-center mb-2 sm:mb-0 relative"
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                    ${
                      currentStep === step
                        ? "bg-blue-600 text-white"
                        : currentStep > step
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                <p
                  className={`ml-2 text-xs sm:text-sm ${
                    currentStep >= step
                      ? "text-gray-800 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step === 1
                    ? "Date & Time"
                    : step === 2
                    ? "Appointment Details"
                    : step === 3
                    ? "Personal Info"
                    : "Confirmation"}
                </p>

                {step < 4 && (
                  <div className="hidden sm:block absolute h-0.5 bg-gray-200 w-8 sm:w-12 left-full ml-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 md:p-6">
          {/* Step 1: Date and Time Selection */}
          {currentStep === 1 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Select Date
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {generateDates().map((date, index) => (
                    <label
                      key={index}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer
                        ${
                          formValues.selectedDate === date.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                    >
                      <input
                        type="radio"
                        value={date.value}
                        className="sr-only"
                        {...register("selectedDate", {
                          required: "Please select a date",
                        })}
                      />
                      <p className="text-sm text-gray-500">{date.short}</p>
                      <p
                        className={`font-medium ${
                          formValues.selectedDate === date.value
                            ? "text-blue-600"
                            : "text-gray-800"
                        }`}
                      >
                        {date.value.split("-")[2]}
                      </p>
                    </label>
                  ))}
                </div>
                {errors.selectedDate && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.selectedDate.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Select Time
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {timeSlots.map((time, index) => (
                    <label
                      key={index}
                      className={`py-3 px-3 rounded-lg border-2 transition-all text-center cursor-pointer
                        ${
                          formValues.selectedTime === time
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-200 hover:border-blue-300 text-gray-800"
                        }`}
                    >
                      <input
                        type="radio"
                        value={time}
                        className="sr-only"
                        {...register("selectedTime", {
                          required: "Please select a time",
                        })}
                      />
                      {time}
                    </label>
                  ))}
                </div>
                {errors.selectedTime && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.selectedTime.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Appointment Details */}
          {currentStep === 2 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Appointment Type
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {appointmentTypes.map((type, index) => (
                    <label
                      key={index}
                      className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer
                        ${
                          formValues.appointmentType === type
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                    >
                      <input
                        type="radio"
                        value={type}
                        className="sr-only"
                        {...register("appointmentType", {
                          required: "Please select an appointment type",
                        })}
                      />
                      <p
                        className={`font-medium ${
                          formValues.appointmentType === type
                            ? "text-blue-600"
                            : "text-gray-800"
                        }`}
                      >
                        {type}
                      </p>
                    </label>
                  ))}
                </div>
                {errors.appointmentType && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.appointmentType.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Reason for Visit
                </h3>
                <textarea
                  className={`w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.appointmentReason ? "border-red-500" : ""
                  }`}
                  rows="4"
                  placeholder="Please briefly describe the reason for your visit..."
                  {...register("appointmentReason", {
                    required: "Please provide a reason for your visit",
                    minLength: {
                      value: 10,
                      message: "Please provide more details",
                    },
                  })}
                ></textarea>
                {errors.appointmentReason && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.appointmentReason.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Insurance Information
                </h3>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <label
                    className={`py-3 px-6 rounded-lg border-2 transition-all cursor-pointer
                      ${
                        formValues.isInsurance === "true"
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-800"
                      }`}
                  >
                    <input
                      type="radio"
                      value="true"
                      className="sr-only"
                      {...register("isInsurance", { required: true })}
                      onChange={() => handleInsuranceChange("true")}
                    />
                    Yes, I have insurance
                  </label>
                  <label
                    className={`py-3 px-6 rounded-lg border-2 transition-all cursor-pointer
                      ${
                        formValues.isInsurance === "false"
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-800"
                      }`}
                  >
                    <input
                      type="radio"
                      value="false"
                      className="sr-only"
                      {...register("isInsurance", { required: true })}
                      onChange={() => handleInsuranceChange("false")}
                    />
                    Self-pay
                  </label>
                </div>

                {formValues.isInsurance === "true" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Insurance Provider
                        </label>
                        <input
                          type="text"
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.insuranceProvider
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="e.g. Blue Cross"
                          {...register("insuranceProvider", {
                            required:
                              formValues.isInsurance === "true"
                                ? "Insurance provider is required"
                                : false,
                          })}
                        />
                        {errors.insuranceProvider && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.insuranceProvider.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Insurance ID
                        </label>
                        <input
                          type="text"
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.insuranceId
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="e.g. ABC123456789"
                          {...register("insuranceId", {
                            required:
                              formValues.isInsurance === "true"
                                ? "Insurance ID is required"
                                : false,
                          })}
                        />
                        {errors.insuranceId && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.insuranceId.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                        Please bring your insurance card to your appointment. We
                        will verify your coverage before your visit.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Patient Information */}
          {currentStep === 3 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.patientName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                      {...register("patientName", {
                        required: "Full name is required",
                      })}
                    />
                    {errors.patientName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.patientName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.patientEmail
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                      {...register("patientEmail", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.patientEmail && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.patientEmail.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.patientPhone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your phone number"
                      {...register("patientPhone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10,15}$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                    />
                    {errors.patientPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.patientPhone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600 flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  By scheduling this appointment, you agree to our cancellation
                  policy. Please arrive 15 minutes before your appointment time.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Appointment Confirmed
              </h3>
              <p className="text-gray-600 mb-8">
                Your appointment has been scheduled successfully.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto text-left">
                <div className="flex items-center mb-6">
                  <img
                    src={m_doctor}
                    alt={doctor.name}
                    className="w-14 h-14 rounded-full object-contain border-2 border-white shadow-sm"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/100/100";
                      e.target.alt = "Doctor profile";
                    }}
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">
                      {doctor.name}
                    </h4>
                    <p className="text-blue-600 text-sm">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-800">
                        {formValues.selectedDate
                          ? new Date(
                              formValues.selectedDate
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <Clock className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium text-gray-800">
                        {formValues.selectedTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0">
                      <span className="block w-3 h-3 bg-blue-600 rounded-full mt-1"></span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Appointment Type</p>
                      <p className="font-medium text-gray-800">
                        {formValues.appointmentType}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0">
                      <span className="block w-3 h-3 bg-blue-600 rounded-full mt-1"></span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Patient</p>
                      <p className="font-medium text-gray-800">
                        {formValues.patientName}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="font-medium text-gray-800">
                        ${doctor.consultation_fee}
                      </p>
                    </div>
                    {formValues.isInsurance === "true" && (
                      <p className="text-xs text-green-600 mt-1">
                        * May be covered by your insurance
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with navigation buttons */}
        {currentStep !== 4 && (
          <div className="px-4 md:px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain layout
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                disabled={
                  (currentStep === 1 &&
                    (!formValues.selectedDate || !formValues.selectedTime)) ||
                  (currentStep === 2 &&
                    (!formValues.appointmentType ||
                      !formValues.appointmentReason))
                }
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
              >
                Confirm Booking
                <CheckCircle className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
