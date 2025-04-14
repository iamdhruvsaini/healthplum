import React, { useState } from "react";

const InsurancePricePrediction = () => {
  const [formData, setFormData] = useState({
    age: 31,
    sex: 1,
    bmi: 25.74,
    children: 0,
    smoker: 1,
    region: 0,
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("input");

  // Field descriptions for tooltips
  const fieldDescriptions = {
    age: "Your current age in years",
    sex: "0 for female, 1 for male",
    bmi: "Body Mass Index (weight in kg / height in m²)",
    children: "Number of dependents covered by insurance",
    smoker: "0 for non-smoker, 1 for smoker",
    region: "0 for Northeast, 1 for Northwest, 2 for Southeast, 3 for Southwest"
  };

  // Label mapping for better display
  const fieldLabels = {
    age: "Age (years)",
    sex: "Sex",
    bmi: "BMI",
    children: "Dependents",
    smoker: "Smoker",
    region: "Region"
  };

  // Options for select fields
  const selectOptions = {
    sex: [
      { value: 0, label: "Female" },
      { value: 1, label: "Male" }
    ],
    smoker: [
      { value: 0, label: "Non-smoker" },
      { value: 1, label: "Smoker" }
    ],
    region: [
      { value: 0, label: "Northeast" },
      { value: 1, label: "Northwest" },
      { value: 2, label: "Southeast" },
      { value: 3, label: "Southwest" }
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(
        "https://insurance-prediction-tvnl.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      setPredictionResult(result.predicted_cost_usd);
      setActiveTab("result");
    } catch (error) {
      console.error("Error:", error);
      setPredictionResult(null);
      alert("Failed to predict insurance cost. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (key) => {
    if (selectOptions[key]) {
      return (
        <select
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {selectOptions[key].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="number"
        id={key}
        name={key}
        value={formData[key]}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        step={key === "age" || key === "children" ? "1" : "0.01"}
        min={key === "age" ? "18" : key === "children" ? "0" : "0"}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center items-center py-4">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Insurance Cost Predictor
            </h2>
            <p className="text-blue-100 text-center mt-2">
              Enter your details to estimate your insurance premium
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("input")}
              className={`flex-1 py-4 font-medium text-center ${
                activeTab === "input"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Input Data
            </button>
            <button
              onClick={() => setActiveTab("result")}
              className={`flex-1 py-4 font-medium text-center ${
                activeTab === "result"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              disabled={predictionResult === null}
            >
              Results
            </button>
          </div>

          {/* Form Panel */}
          {activeTab === "input" && (
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <label
                        htmlFor={key}
                        className="text-gray-700 font-medium"
                      >
                        {fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <div className="group relative">
                        <span className="cursor-help text-blue-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5A1 1 0 118 8a1 1 0 01.867-.5A1 1 0 0110 7zm0 2a1 1 0 100 2 1 1 0 000-2zm0 6a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 absolute right-0 mt-1 w-48 bg-gray-800 text-white text-sm rounded p-2 shadow-lg transition-all z-10">
                          {fieldDescriptions[key]}
                        </div>
                      </div>
                    </div>
                    {renderField(key)}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-95"
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
                    Processing...
                  </span>
                ) : (
                  "Calculate Insurance Premium"
                )}
              </button>
            </form>
          )}

          {/* Results Panel */}
          {activeTab === "result" && predictionResult !== null && (
            <div className="p-6 text-center">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Your Estimated Premium
                </h3>
                <div className="text-5xl font-bold text-blue-600 mb-4">
                  ${predictionResult.toFixed(2)}
                </div>
                <p className="text-gray-500">Annually</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-blue-700 mb-2">
                  Key Factors Affecting Your Premium
                </h4>
                <ul className="text-left text-gray-600">
                  {formData.smoker === 1 && (
                    <li className="flex items-center py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Smoking significantly increases your premium
                    </li>
                  )}
                  {formData.bmi > 30 && (
                    <li className="flex items-center py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Higher BMI may lead to increased costs
                    </li>
                  )}
                  {formData.age > 50 && (
                    <li className="flex items-center py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 100 2h1a1 1 0 100-2H10z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Age is a factor in your premium calculation
                    </li>
                  )}
                  {formData.children > 0 && (
                    <li className="flex items-center py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 100 2h1a1 1 0 100-2H10z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Number of dependents affects your coverage
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setActiveTab("input")}
                  className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Modify Inputs
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save Results
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
            This prediction is based on statistical models and is for estimation purposes only.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePricePrediction;