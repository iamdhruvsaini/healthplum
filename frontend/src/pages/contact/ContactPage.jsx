import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async(data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("access_key", import.meta.env.VITE_WEBMAIL);
  

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const res = await response.json();

    if (res.success) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } else {
      alert("Error Occuered !")
      console.log("Error", data);
    }
    reset();

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 sm:mb-3">
            Contact Us
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base">
            Have questions or need assistance? We're here to help. Reach out to
            our team.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-100 text-green-800 border border-green-300 p-4 mb-6 rounded-lg text-center font-medium">
            ✅ Your message has been sent successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 text-sm">
            <div className="flex items-start space-x-4">
              <MapPin className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-gray-800 font-semibold">Address</h3>
                <p className="text-gray-600">
                  123 Health Lane, MediCity, India
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-gray-800 font-semibold">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-gray-800 font-semibold">Email</h3>
                <p className="text-gray-600">support@healthcare.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-gray-800 font-semibold">Working Hours</h3>
                <p className="text-gray-600">Mon - Fri: 9 AM - 6 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-black mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="johndoe@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Booking Help"
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="6"
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your message here..."
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("privacy", {
                        required: "You must agree to the privacy policy",
                      })}
                      className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.privacy && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.privacy.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center"
                  >
                    Send Message
                    <Send className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
        </div>
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "How do I schedule an appointment?",
              answer:
                "You can schedule an appointment through our website by using the Find a Doctor tool, or by calling our office directly.",
            },
            {
              question: "What insurance plans do you accept?",
              answer:
                "We accept most major insurance plans. Please contact our office to verify that we accept your specific insurance plan.",
            },
            {
              question: "How can I access my medical records?",
              answer:
                "You can access your medical records through our patient portal. If you need assistance, please contact our support team.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors duration-200"
            >
              <h3 className="font-semibold text-black mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

    
      {/* CTA Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Need Urgent Care?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          For emergencies or urgent care needs, our specialists are available
          24/7. Don't hesitate to reach out.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+1800URGENTCARE"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Emergency Line
          </a>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border border-white">
            Learn About Urgent Care
          </button>
        </div>
      </div>
    </div>
  );
}
