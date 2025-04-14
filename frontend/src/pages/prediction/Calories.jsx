import React, { useState } from "react";

const CaloriePrediction = () => {
  const [formData, setFormData] = useState({
    Gender: 1,
    Age: 20,
    Height: 166,
    Weight: 60,
    Duration: 14,
    Heart_Rate: 94,
    Body_Temp: 40.3,
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activePanel, setActivePanel] = useState("form");

  // Field descriptions for tooltips
  const fieldDescriptions = {
    Gender: "0 for female, 1 for male",
    Age: "Your age in years",
    Height: "Your height in centimeters",
    Weight: "Your weight in kilograms",
    Duration: "Exercise duration in minutes",
    Heart_Rate: "Average heart rate during exercise (bpm)",
    Body_Temp: "Body temperature during exercise (°C)",
  };

  // Label mapping for better display
  const fieldLabels = {
    Gender: "Gender",
    Age: "Age (years)",
    Height: "Height (cm)",
    Weight: "Weight (kg)",
    Duration: "Duration (min)",
    Heart_Rate: "Heart Rate (bpm)",
    Body_Temp: "Body Temperature (°C)",
  };

  // Units for each field
  const fieldUnits = {
    Age: "years",
    Height: "cm",
    Weight: "kg",
    Duration: "min",
    Heart_Rate: "bpm",
    Body_Temp: "°C",
  };

  // Min and max values for validation
  const fieldBoundaries = {
    Age: { min: 15, max: 80 },
    Height: { min: 120, max: 220 },
    Weight: { min: 30, max: 200 },
    Duration: { min: 1, max: 120 },
    Heart_Rate: { min: 40, max: 200 },
    Body_Temp: { min: 35, max: 42 },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(
        "https://calorie-predict.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      setPredictionResult(result.predicted_calories);
      setActivePanel("result");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to predict calories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setActivePanel("form");
  };

  const getCalorieCategory = (calories) => {
    if (calories < 200) return { label: "Light", color: "text-green-500" };
    if (calories < 400) return { label: "Moderate", color: "text-yellow-500" };
    if (calories < 600) return { label: "Intense", color: "text-orange-500" };
    return { label: "Extreme", color: "text-red-500" };
  };

  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case "Gender":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case "Age":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        );
      case "Height":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
          </svg>
        );
      case "Weight":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2h6a1 1 0 100-2 1 1 0 01-1-1v-1h1a1 1 0 100-2h-1V7a3 3 0 00-3-3z" clipRule="evenodd" />
          </svg>
        );
      case "Duration":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case "Heart_Rate":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        );
      case "Body_Temp":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Recommendations based on calorie burn
  const getRecommendations = (calories) => {
    if (calories < 200) {
      return "This is a light workout. Consider increasing intensity or duration for better results.";
    } else if (calories < 400) {
      return "Good moderate workout. This is ideal for maintaining fitness.";
    } else if (calories < 600) {
      return "Great intense workout! Make sure to stay hydrated and rest properly.";
    } else {
      return "Extreme calorie burn! Ensure you're not overtraining and consuming enough nutrients.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex justify-center items-center py-4">
      <div className="w-full">
        {activePanel === "form" ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 rounded-full bg-teal-400 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 rounded-full bg-blue-400 opacity-20"></div>
              <h2 className="text-3xl font-bold text-white text-center relative z-10">
                Workout Calorie Calculator
              </h2>
              <p className="text-teal-100 text-center mt-2 relative z-10">
                Estimate calories burned during your exercise
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <label
                        htmlFor={key}
                        className="text-gray-700 font-medium flex items-center"
                      >
                        <span className="mr-2">{getFieldIcon(key)}</span>
                        {fieldLabels[key] || key.replace(/_/g, " ")}
                      </label>
                      <div className="group relative">
                        <span className="cursor-help text-teal-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5A1 1 0 118 8a1 1 0 01.867-.5A1 1 0 0110 7zm0 2a1 1 0 100 2h1a1 1 0 100-2H10z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 absolute right-0 mt-1 w-48 bg-gray-800 text-white text-sm rounded p-2 shadow-lg transition-all z-10">
                          {fieldDescriptions[key]}
                        </div>
                      </div>
                    </div>

                    {key === "Gender" ? (
                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, Gender: 0 })}
                          className={`flex-1 py-3 px-4 flex items-center justify-center ${
                            formData.Gender === 0
                              ? "bg-teal-100 text-teal-800 border border-teal-300"
                              : "bg-gray-100 text-gray-600 border border-gray-300"
                          } rounded-l-lg focus:outline-none transition`}
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M9 8a1 1 0 112 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M8 9a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd" />
                          </svg>
                          Female
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, Gender: 1 })}
                          className={`flex-1 py-3 px-4 flex items-center justify-center ${
                            formData.Gender === 1
                              ? "bg-teal-100 text-teal-800 border border-teal-300"
                              : "bg-gray-100 text-gray-600 border border-gray-300"
                          } rounded-r-lg focus:outline-none transition`}
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          Male
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="number"
                          id={key}
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          className="w-full p-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          step={key === "Body_Temp" ? "0.1" : "1"}
                          min={fieldBoundaries[key]?.min}
                          max={fieldBoundaries[key]?.max}
                        />
                        {fieldUnits[key] && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            {fieldUnits[key]}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform transition ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 active:scale-95"
                }`}
              >
                {isLoading ? (
                  <span className="flex justify-center items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  "Calculate Calories Burned"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
              Estimates are based on statistical models using your physical attributes and exercise metrics.
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Result Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6">
              <h2 className="text-3xl font-bold text-white text-center">
                Workout Results
              </h2>
              <p className="text-teal-100 text-center mt-2">
                Based on your exercise parameters
              </p>
            </div>

            {/* Result Content */}
            <div className="p-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-6">
                  <svg className="w-48 h-48" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 45}
                      strokeDashoffset={
                        2 * Math.PI * 45 * (1 - Math.min(predictionResult / 800, 1))
                      }
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0d9488" />
                        <stop offset="100%" stopColor="#0369a1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-gray-800">{Math.round(predictionResult)}</span>
                    <span className="text-xl text-gray-500">calories</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-800 font-medium">
                    {getCalorieCategory(predictionResult).label} Intensity Workout
                  </span>
                </div>

                <p className="text-gray-600 text-center mb-8">
                  {getRecommendations(predictionResult)}
                </p>

                <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Your Workout Summary</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{formData.Duration} minutes</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{formData.Heart_Rate} bpm</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" />
                      </svg>
                      <span className="text-gray-600">{formData.Body_Temp}°C</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2h6a1 1 0 100-2 1 1 0 01-1-1v-1h1a1 1 0 100-2h-1V7a3 3 0 00-3-3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{Math.round(predictionResult / formData.Weight * 100) / 100} cal/kg</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={resetForm}
                    className="px-5 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition"
                  >
                    Calculate Again
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                  >
                    Save Results
                  </button>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-700 mb-3">Tips to Maximize Your Workout</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Stay hydrated before, during, and after your workout
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Maintain proper form to maximize efficiency and prevent injury
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Allow adequate recovery time between intense workout sessions
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
              This prediction is based on statistical models and is for estimation purposes only.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaloriePrediction;