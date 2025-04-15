import React, { useState } from "react";

const Diabetes = () => {
  const [formData, setFormData] = useState({
    Pregnancies: 9,
    Glucose: 171,
    BloodPressure: 110,
    SkinThickness: 24,
    Insulin: 240,
    BMI: 45.4,
    DiabetesPedigreeFunction: 0.721,
    Age: 54,
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("form");

  // Field descriptions and units for better UX
  const fieldInfo = {
    Pregnancies: {
      description: "Number of times pregnant",
      unit: "",
      min: 0,
      max: 20,
      step: 1
    },
    Glucose: {
      description: "Plasma glucose concentration (2 hours in an oral glucose tolerance test)",
      unit: "mg/dL",
      min: 0,
      max: 300,
      step: 1
    },
    BloodPressure: {
      description: "Diastolic blood pressure",
      unit: "mm Hg",
      min: 0,
      max: 200,
      step: 1
    },
    SkinThickness: {
      description: "Triceps skin fold thickness",
      unit: "mm",
      min: 0,
      max: 100,
      step: 1
    },
    Insulin: {
      description: "2-Hour serum insulin",
      unit: "mu U/ml",
      min: 0,
      max: 846,
      step: 1
    },
    BMI: {
      description: "Body mass index (weight in kg/(height in m)²)",
      unit: "kg/m²",
      min: 0,
      max: 70,
      step: 0.1
    },
    DiabetesPedigreeFunction: {
      description: "Diabetes pedigree function (genetic influence)",
      unit: "",
      min: 0,
      max: 2.5,
      step: 0.001
    },
    Age: {
      description: "Age in years",
      unit: "years",
      min: 0,
      max: 120,
      step: 1
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const getRiskColor = (value, field) => {
    // Different thresholds for different metrics
    switch (field) {
      case "Glucose":
        if (value < 100) return "bg-green-100 border-green-300";
        if (value < 126) return "bg-yellow-100 border-yellow-300";
        return "bg-red-100 border-red-300";
      case "BloodPressure":
        if (value < 80) return "bg-green-100 border-green-300";
        if (value < 90) return "bg-yellow-100 border-yellow-300";
        return "bg-red-100 border-red-300";
      case "BMI":
        if (value < 25) return "bg-green-100 border-green-300";
        if (value < 30) return "bg-yellow-100 border-yellow-300";
        return "bg-red-100 border-red-300";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(
        "https://diabetes-model-2k2p.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      setPredictionResult(result.prediction);
      setCurrentSection("result");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentSection("form");
  };

  const getHealthTips = (hasDiabetes) => {
    if (hasDiabetes) {
      return [
        "Monitor your blood glucose levels regularly",
        "Follow a balanced diet low in refined carbohydrates",
        "Engage in regular physical activity",
        "Take medications as prescribed by your doctor",
        "Schedule regular check-ups with your healthcare provider"
      ];
    } else {
      return [
        "Maintain a healthy weight through regular exercise",
        "Eat a balanced diet rich in fruits, vegetables, and whole grains",
        "Limit consumption of processed foods and added sugars",
        "Stay hydrated and get adequate sleep",
        "Have regular medical check-ups to monitor your health"
      ];
    }
  };

  return (
    <div className="min-h-screen indigo-50 py-8 ">
      <div className="max-w-6xl mx-auto">
        {currentSection === "form" ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
              <h1 className="text-3xl font-bold text-white text-center">Diabetes Risk Assessment</h1>
              <p className="text-purple-100 text-center mt-2">
                Enter your health metrics to assess your diabetes risk
              </p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <label className="font-medium text-gray-700" htmlFor={key}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <div className="group relative">
                        <button
                          type="button"
                          className="text-purple-500 hover:text-purple-600 focus:outline-none"
                        >
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
                        </button>
                        <div className="opacity-0 group-hover:opacity-100 absolute right-0 mt-1 w-64 bg-gray-800 text-white text-sm rounded p-2 shadow-lg transition-all z-10">
                          {fieldInfo[key].description}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        id={key}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${getRiskColor(formData[key], key)} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        step={fieldInfo[key].step}
                        min={fieldInfo[key].min}
                        max={fieldInfo[key].max}
                      />
                      {fieldInfo[key].unit && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                          {fieldInfo[key].unit}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition transform ${
                    isLoading
                      ? "bg-gray-400"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95"
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
                      Analyzing...
                    </span>
                  ) : (
                    "Assess Diabetes Risk"
                  )}
                </button>
              </div>
            </form>

            {/* Info Section */}
            <div className="bg-indigo-50 p-6 border-t border-indigo-100">
              <h3 className="text-lg font-medium text-indigo-800 mb-3">
                About This Assessment
              </h3>
              <p className="text-gray-600 mb-4">
                This tool uses the Pima Indians Diabetes Database to estimate diabetes risk based on 
                several health metrics. It's for educational purposes only and should not replace 
                professional medical advice.
              </p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  Always consult with a healthcare professional for medical advice.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Result Header */}
            <div className={`p-6 ${predictionResult && predictionResult.includes("not") ? "bg-gradient-to-r from-green-500 to-teal-500" : "bg-gradient-to-r from-red-500 to-orange-500"}`}>
              <h2 className="text-3xl font-bold text-white text-center">
                Assessment Result
              </h2>
              <p className="text-center mt-2 text-white text-opacity-90">
                Based on your health metrics
              </p>
            </div>

            {/* Result Content */}
            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                {predictionResult && predictionResult.includes("not") ? (
                  <div className="w-24 h-24 mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-24 h-24 mb-6 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                <h3 className={`text-2xl font-bold mb-4 ${predictionResult && predictionResult.includes("not") ? "text-green-700" : "text-red-700"}`}>
                  {predictionResult}
                </h3>

                <p className="text-gray-600 text-center mb-6">
                  {predictionResult && predictionResult.includes("not") 
                    ? "Your health metrics suggest a lower risk of diabetes, but maintaining a healthy lifestyle is still important." 
                    : "Your health metrics suggest an elevated risk of diabetes. Consider consulting with a healthcare professional."}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-medium text-gray-800 mb-4">Key Risk Factors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Glucose */}
                  <div className={`p-4 rounded-lg border ${getRiskColor(formData.Glucose, "Glucose")}`}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Glucose</span>
                      <span className={`${formData.Glucose >= 126 ? "text-red-600 font-medium" : formData.Glucose >= 100 ? "text-yellow-600 font-medium" : "text-green-600 font-medium"}`}>
                        {formData.Glucose} mg/dL
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${formData.Glucose >= 126 ? "bg-red-500" : formData.Glucose >= 100 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${Math.min(formData.Glucose / 3, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.Glucose >= 126 
                        ? "High (Diabetic range)" 
                        : formData.Glucose >= 100 
                          ? "Elevated (Pre-diabetic range)" 
                          : "Normal range"}
                    </p>
                  </div>

                  {/* BMI */}
                  <div className={`p-4 rounded-lg border ${getRiskColor(formData.BMI, "BMI")}`}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">BMI</span>
                      <span className={`${formData.BMI >= 30 ? "text-red-600 font-medium" : formData.BMI >= 25 ? "text-yellow-600 font-medium" : "text-green-600 font-medium"}`}>
                        {formData.BMI} kg/m²
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${formData.BMI >= 30 ? "bg-red-500" : formData.BMI >= 25 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${Math.min(formData.BMI * 2, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.BMI >= 30 
                        ? "Obese range" 
                        : formData.BMI >= 25 
                          ? "Overweight range" 
                          : "Healthy range"}
                    </p>
                  </div>

                  {/* Blood Pressure */}
                  <div className={`p-4 rounded-lg border ${getRiskColor(formData.BloodPressure, "BloodPressure")}`}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Blood Pressure</span>
                      <span className={`${formData.BloodPressure >= 90 ? "text-red-600 font-medium" : formData.BloodPressure >= 80 ? "text-yellow-600 font-medium" : "text-green-600 font-medium"}`}>
                        {formData.BloodPressure} mm Hg
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${formData.BloodPressure >= 90 ? "bg-red-500" : formData.BloodPressure >= 80 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${Math.min(formData.BloodPressure / 2, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.BloodPressure >= 90 
                        ? "High (Hypertension Stage 2)" 
                        : formData.BloodPressure >= 80 
                          ? "Elevated (Hypertension Stage 1)" 
                          : "Normal range"}
                    </p>
                  </div>

                  {/* Age */}
                  <div className="p-4 rounded-lg border bg-gray-50">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Age</span>
                      <span className="text-gray-700 font-medium">
                        {formData.Age} years
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-indigo-500"
                        style={{ width: `${Math.min(formData.Age * 1.2, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Risk increases with age
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-indigo-800 mb-3">Health Recommendations</h4>
                <ul className="space-y-2">
                  {getHealthTips(predictionResult && !predictionResult.includes("not")).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-500 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetForm}
                  className="px-5 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition"
                >
                  Try Another Assessment
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Print Results
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t">
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
                    clipRule="evenodd"
                  />
                </svg>
                This assessment is for educational purposes only and should not replace professional medical advice.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diabetes;