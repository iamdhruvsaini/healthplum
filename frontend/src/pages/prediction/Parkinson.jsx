import React, { useState } from "react";
import axios from "axios";

const ParkinsonsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  
  // Default values from dataset
  const defaultValues = {
    mdvp_fo_hz: 119.992,
    mdvp_fhi_hz: 157.302,
    mdvp_flo_hz: 74.997,
    mdvp_jitter_percent: 0.00784,
    mdvp_jitter_abs: 0.00007,
    mdvp_rap: 0.0037,
    mdvp_ppq: 0.00554,
    jitter_ddp: 0.01109,
    mdvp_shimmer: 0.04374,
    mdvp_shimmer_db: 0.426,
    shimmer_apq3: 0.02182,
    shimmer_apq5: 0.0313,
    mdvp_apq: 0.02971,
    shimmer_dda: 0.06545,
    nhr: 0.02211,
    hnr: 21.033,
    rpde: 0.414783,
    dfa: 0.815285,
    spread1: -4.813031,
    spread2: 0.266482,
    d2: 2.301442,
    ppe: 0.284654,
  };
  
  const [formData, setFormData] = useState(defaultValues);

  // Field descriptions for tooltips
  const fieldDescriptions = {
    mdvp_fo_hz: "Average vocal fundamental frequency (Hz)",
    mdvp_fhi_hz: "Maximum vocal fundamental frequency (Hz)",
    mdvp_flo_hz: "Minimum vocal fundamental frequency (Hz)",
    mdvp_jitter_percent: "Frequency perturbation percentage",
    mdvp_jitter_abs: "Absolute jitter in microseconds",
    mdvp_rap: "Relative amplitude perturbation",
    mdvp_ppq: "Five-point period perturbation quotient",
    jitter_ddp: "Average absolute difference of differences of periods",
    mdvp_shimmer: "Local shimmer",
    mdvp_shimmer_db: "Local shimmer in decibels",
    shimmer_apq3: "Three-point amplitude perturbation quotient",
    shimmer_apq5: "Five-point amplitude perturbation quotient",
    mdvp_apq: "11-point amplitude perturbation quotient",
    shimmer_dda: "Average absolute differences between consecutive differences",
    nhr: "Noise-to-harmonics ratio",
    hnr: "Harmonics-to-noise ratio",
    rpde: "Recurrence period density entropy measure",
    dfa: "Signal fractal scaling exponent",
    spread1: "Two nonlinear measures of fundamental frequency variation",
    spread2: "Two nonlinear measures of fundamental frequency variation",
    d2: "Correlation dimension",
    ppe: "Pitch period entropy",
  };

  // Group fields into logical categories
  const fieldGroups = {
    "Fundamental Frequency Features": ["mdvp_fo_hz", "mdvp_fhi_hz", "mdvp_flo_hz"],
    "Jitter Measurements": [
      "mdvp_jitter_percent", 
      "mdvp_jitter_abs", 
      "mdvp_rap", 
      "mdvp_ppq", 
      "jitter_ddp"
    ],
    "Shimmer Measurements": [
      "mdvp_shimmer", 
      "mdvp_shimmer_db", 
      "shimmer_apq3", 
      "shimmer_apq5", 
      "mdvp_apq", 
      "shimmer_dda"
    ],
    "Noise Ratios": ["nhr", "hnr"],
    "Nonlinear Measures": ["rpde", "dfa", "spread1", "spread2", "d2", "ppe"]
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const resetForm = () => {
    setFormData(defaultValues);
    setResult("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post(
        "https://parkinson-disease-prediction-js54.onrender.com/predict",
        formData
      );
      setResult(res.data.message);
    } catch (error) {
      console.error("Prediction error:", error);
      if (error.response) {
        setResult(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        setResult("Error: No response from server");
      } else {
        setResult("Error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatLabel = (key) => {
    return key.replace(/_/g, " ").replace(/mdvp/i, "MDVP").toUpperCase();
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12 px-6 text-center">
        <h1 className="text-4xl font-bold text-white">
          Parkinson's Disease Voice Analysis
        </h1>
        <p className="text-xl text-white mt-2">
          Early detection through advanced voice biomarker analysis
        </p>
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-blue-800">About This Tool</h2>
          <p className="mt-2 text-blue-700">
            This tool analyzes voice recording features to detect patterns associated with Parkinson's disease. 
            The analysis is based on acoustic measurements of sustained vowel phonations, which can reveal 
            subtle changes in voice often present in early stages of Parkinson's.
          </p>
          <p className="mt-2 text-blue-700">
            <strong>Note:</strong> This is a predictive tool only and should not replace professional medical diagnosis.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-6xl mx-auto mt-8 mb-12 bg-white shadow-xl rounded-2xl p-8">
        <form onSubmit={handleSubmit}>
          {Object.entries(fieldGroups).map(([groupName, fields]) => (
            <div key={groupName} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">{groupName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                {fields.map((field) => (
                  <div key={field} className="relative">
                    <div className="flex items-center">
                      <label className="block text-sm font-medium text-gray-700">
                        {formatLabel(field)}
                      </label>
                      <div className="group ml-2">
                        <span className="cursor-help text-blue-500 text-sm">ⓘ</span>
                        <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg">
                          {fieldDescriptions[field]}
                        </div>
                      </div>
                    </div>
                    <input
                      type="number"
                      step="any"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Analyze Voice Features"
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Reset Form
            </button>
          </div>
        </form>

        {result && (
          <div className={`mt-8 p-6 rounded-lg ${result.includes("Parkinson") ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"}`}>
            <h3 className="text-xl font-semibold mb-2 text-center">Analysis Result</h3>
            <p className={`text-xl font-medium text-center ${result.includes("Parkinson") ? "text-red-600" : "text-green-600"}`}>
              {result}
            </p>
            <div className="mt-4 text-gray-700">
              <h4 className="font-medium mb-2">Important Information:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>This prediction is based on voice pattern analysis and machine learning algorithms.</li>
                <li>The accuracy of this tool is not 100% and should not replace clinical diagnosis.</li>
                <li>If you have concerns about your health, please consult a healthcare professional.</li>
                <li>Early detection of Parkinson's disease can lead to better management and treatment outcomes.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-6 px-4 text-center">
        <p className="text-sm">
          Disclaimer: This tool is for educational and screening purposes only. It does not provide medical advice, diagnosis, or treatment recommendations.
        </p>
      </div>
    </div>
  );
};

export default ParkinsonsForm;