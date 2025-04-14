import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Calendar,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  useCancelAppointmentMutation,
  useGetPatientAppointmentsQuery,
  useGetPatientDetailsQuery,
} from "../../redux/api/patientAPI";

export default function Appointment() {
  const { currentUser } = useAuth();
  const patientId = currentUser?.id;
  const [cancelAppointment] = useCancelAppointmentMutation();

  const {
    data: appointments = [],
    error:patientAppointmentError,
    isLoading:patientAppointmentLoading,
  } = useGetPatientAppointmentsQuery(patientId, {
    skip: !patientId, // avoid calling before user is loaded
  });

  const { data: patient,isLoading:patientDetailsLoading,error:patientDetailsError} = useGetPatientDetailsQuery(patientId, {
    skip: !patientId, // avoid calling before user is loaded
  });

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to format time
  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: <ClockIcon size={16} className="mr-1" />,
      },
      confirmed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: <CheckCircle size={16} className="mr-1" />,
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <CheckCircle size={16} className="mr-1" />,
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: <XCircle size={16} className="mr-1" />,
      },
    };

    const style = statusStyles[status.toLowerCase()] || statusStyles.pending;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
      >
        {style.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // handle cancellation
  const handleCancelation = async (appointmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
      customClass: {
        popup: "compact-swal",
        title: "compact-title",
        htmlContainer: "compact-text",
      },
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Canceled !",
          text: "Your Appointment is cancelled",
          icon: "success",
          customClass: {
            popup: "compact-swal",
            title: "compact-title",
            htmlContainer: "compact-text",
          },
        });
        await cancelAppointment(appointmentId);
      }
    });
  };

  if (patientAppointmentLoading || patientDetailsLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (patientAppointmentError || patientDetailsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg text-red-800 mx-auto max-w-3xl mt-8">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-sm font-medium">Error loading appointments</h3>
        </div>
        <div className="mt-2 text-sm">{"Server is Down"}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-6xl mx-auto">
      {/* Patient Info Header */}
      {patient && (
        <div className="bg-blue-50 p-6 border-b border-blue-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {patient.name}'s Appointments
              </h1>
              <p className="text-gray-600 mt-1">
                {patient.email} • {patient.phone_number}
              </p>
            </div>
            <Link to={"/find-doctor"} className="mt-4 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Book New Appointment
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Appointment List */}
      <div className="p-6">
        {appointments?.appointments?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400">
              <Calendar className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No appointments found
            </h3>
            <p className="mt-1 text-gray-500">
              This patient doesn't have any scheduled appointments.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments?.appointments?.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md"
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex-1">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {formatDate(appointment.appointment_date)}
                          </p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">
                              {formatTime(appointment.appointment_time)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-start">
                          <User className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900">
                              Dr. {appointment.doctor_name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {appointment.doctor_specialization}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                      <StatusBadge status={appointment.status} />

                      {appointment.reason && (
                        <div className="mt-2 text-sm text-gray-500 max-w-xs">
                          <p className="font-medium text-gray-700">Reason:</p>
                          <p className="line-clamp-2">{appointment.reason}</p>
                        </div>
                      )}

                      <div className="mt-3 flex space-x-3">
                        {appointment.status === "pending" && (
                          <button
                            className="text-sm font-medium text-red-600 hover:text-red-500"
                            onClick={() => handleCancelation(appointment.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
