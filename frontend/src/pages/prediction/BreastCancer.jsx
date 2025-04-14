import React, { useState } from "react";

const BreastCancer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    radius_mean: 13.54,
    texture_mean: 14.36,
    perimeter_mean: 87.46,
    area_mean: 566.3,
    smoothness_mean: 0.09779,
    compactness_mean: 0.08129,
    concavity_mean: 0.06664,
    concave_points_mean: 0.04781, // This is correct with underscore
    symmetry_mean: 0.1885,
    fractal_dimension_mean: 0.05766,
    radius_se: 0.2699,
    texture_se: 0.7886,
    perimeter_se: 2.058,
    area_se: 23.56,
    smoothness_se: 0.008462,
    compactness_se: 0.0146,
    concavity_se: 0.02387,
    concave_points_se: 0.01315, // This is correct with underscore
    symmetry_se: 0.0198,
    fractal_dimension_se: 0.0023,
    radius_worst: 15.11,
    texture_worst: 19.26,
    perimeter_worst: 99.7,
    area_worst: 711.2,
    smoothness_worst: 0.144,
    compactness_worst: 0.1773,
    concavity_worst: 0.239,
    concave_points_worst: 0.1288, // This is correct with underscore
    symmetry_worst: 0.2977,
    fractal_dimension_worst: 0.07259,
  });

  const [predictionResult, setPredictionResult] = useState(null);

  // Group fields into categories for better organization
  const featureGroups = {
    "Mean Values": [
      "radius_mean", 
      "texture_mean", 
      "perimeter_mean", 
      "area_mean", 
      "smoothness_mean", 
      "compactness_mean", 
      "concavity_mean", 
      "concave_points_mean", 
      "symmetry_mean", 
      "fractal_dimension_mean"
    ],
    "Standard Error": [
      "radius_se", 
      "texture_se", 
      "perimeter_se", 
      "area_se", 
      "smoothness_se", 
      "compactness_se", 
      "concavity_se", 
      "concave_points_se", 
      "symmetry_se", 
      "fractal_dimension_se"
    ],
    "Worst Values": [
      "radius_worst", 
      "texture_worst", 
      "perimeter_worst", 
      "area_worst", 
      "smoothness_worst", 
      "compactness_worst", 
      "concavity_worst", 
      "concave_points_worst", 
      "symmetry_worst", 
      "fractal_dimension_worst"
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    
    if (!isNaN(parsedValue)) {
      setFormData({
        ...formData,
        [name]: parsedValue,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);
    
    try {
      console.log("Sending data:", formData);
      
      const response = await fetch(
        "https://breast-cancer-detection-wrml.onrender.com/predict", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Response received:", result);
      
      // Adjust this based on your API response structure
      if (result.result) {
        setPredictionResult(result.result); // Use 'result' field from API
      } else if (result.prediction !== undefined) {
        // Handle numeric prediction
        const predictionText = result.prediction === 0 
          ? "The Breast Cancer is Malignant" 
          : "The Breast Cancer is Benign";
        setPredictionResult(predictionText);
      } else {
        throw new Error("Unexpected response format from server");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to get prediction. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format the field name for display
  const formatFieldName = (field) => {
    // Convert underscores to spaces and capitalize first letter of each word
    return field
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-pink-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-800">Breast Cancer Risk Assessment</h1>
          <p className="text-gray-600 mt-2">
            This tool analyzes cell nucleus features from fine needle aspirates to assess breast cancer risk
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
            {Object.entries(featureGroups).map(([groupName, fields]) => (
              <div key={groupName} className="mb-8">
                <h3 className="text-xl font-semibold text-pink-700 mb-4 pb-2 border-b border-pink-200">
                  {groupName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fields.map((field) => (
                    <div key={field} className="mb-2">
                      <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor={field}>
                        {formatFieldName(field)}
                      </label>
                      <input
                        type="number"
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        step="any"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-6 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:bg-pink-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Analyze Cell Features"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {predictionResult && (
          <div 
            className={`mb-8 p-6 rounded-lg shadow-md ${
              predictionResult.includes("Benign") 
                ? "bg-green-50 border-l-4 border-green-500" 
                : "bg-red-50 border-l-4 border-red-500"
            }`}
          >
            <h3 className="text-xl font-bold mb-3">Analysis Result</h3>
            <p className={`text-lg font-medium ${
              predictionResult.includes("Benign")
                ? "text-green-700" 
                : "text-red-700"
            }`}>
              {predictionResult}
            </p>
            
            <div className="mt-4 text-gray-700">
              <h4 className="font-medium mb-2">Important Information:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>This is an algorithmic assessment only</li>
                <li>Consult with healthcare professionals for proper diagnosis</li>
                <li>Regular screenings are important for early detection</li>
              </ul>
            </div>
          </div>
        )}

        {/* Debug Info - Remove in production */}
        <div className="bg-gray-100 p-4 rounded-md mb-8 text-xs">
          <h4 className="font-bold mb-2">Debug Information:</h4>
          <p>API URL: https://breast-cancer-detection-wrml.onrender.com/predict</p>
          <p>Request Method: POST with JSON body</p>
          <p>All fields included: {Object.keys(formData).length === 30 ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default BreastCancer;