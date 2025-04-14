import React, { useState } from "react";

const Heart = () => {
  const [formData, setFormData] = useState({
    age: 62,
    sex: 0,
    cp: 0,
    trestbps: 140,
    chol: 268,
    fbs: 0,
    restecg: 0,
    thalach: 160,
    exang: 0,
    oldpeak: 3.6,
    slope: 0,
    ca: 2,
    thal: 2,
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fieldDescriptions = {
    age: "Age (years)",
    sex: "Sex (0 = female, 1 = male)",
    cp: "Chest Pain Type (0-3)",
    trestbps: "Resting Blood Pressure (mm Hg)",
    chol: "Serum Cholesterol (mg/dl)",
    fbs: "Fasting Blood Sugar >120 mg/dl (0 = false, 1 = true)",
    restecg: "Resting ECG Results (0-2)",
    thalach: "Maximum Heart Rate Achieved",
    exang: "Exercise Induced Angina (0 = no, 1 = yes)",
    oldpeak: "ST Depression Induced by Exercise",
    slope: "Slope of Peak Exercise ST Segment (0-2)",
    ca: "Number of Major Vessels (0-4)",
    thal: "Thalassemia (0-3)",
  };

  const tooltips = {
    cp: "0: Typical angina, 1: Atypical angina, 2: Non-anginal pain, 3: Asymptomatic",
    restecg: "0: Normal, 1: ST-T wave abnormality, 2: Left ventricular hypertrophy",
    slope: "0: Upsloping, 1: Flat, 2: Downsloping",
    thal: "0: Normal, 1: Fixed defect, 2: Reversible defect, 3: Unknown",
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
    setError(null);
    setPredictionResult(null);

    try {
      const response = await fetch(
        "https://heart-disease-prediction-4k5l.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setPredictionResult(result.prediction);
    } catch (error) {
      console.error("Error:", error);
      setError("There was an error making the prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Group fields into logical sections
  const sections = {
    "Personal Information": ["age", "sex"],
    "Cardiac Symptoms": ["cp", "exang"],
    "Blood Measurements": ["trestbps", "chol", "fbs"],
    "Heart Function": ["restecg", "thalach", "oldpeak", "slope"],
    "Additional Tests": ["ca", "thal"],
  };

  return (
    <div className=" mx-auto py-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
        Heart Disease Risk Assessment
      </h1>
      
      <p className="mb-4 text-gray-600 text-sm">
        This tool evaluates your risk of heart disease based on various health metrics.
        Please fill in the form below with your most recent health data.
      </p>
      
      <form onSubmit={handleSubmit}>
        {Object.entries(sections).map(([sectionName, fields]) => (
          <div key={sectionName} className="mb-6">
            <h2 className="text-lg font-semibold mb-3 pb-1 border-b border-gray-200">
              {sectionName}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((key) => (
                <div key={key} className="mb-2">
                  <div className="flex items-center">
                    <label className="block mb-1 font-medium text-gray-700" htmlFor={key}>
                      {fieldDescriptions[key]}
                    </label>
                    
                    {tooltips[key] && (
                      <div className="group relative ml-2">
                        <span className="cursor-help text-blue-500">ⓘ</span>
                        <div className="opacity-0 bg-black text-white text-xs rounded p-2 absolute z-10 group-hover:opacity-100 w-64 bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-opacity duration-300">
                          {tooltips[key]}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="number"
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    step="any"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Predict Heart Disease Risk"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 border-l-4 border-red-500 bg-red-50 text-red-700">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {predictionResult && !error && (
        <div
          className={`mt-6 p-4 rounded-lg shadow ${
            predictionResult.includes("not") 
              ? "bg-green-100 border-l-4 border-green-500 text-green-700" 
              : "bg-red-100 border-l-4 border-red-500 text-red-700"
          }`}
        >
          <h3 className="font-bold text-lg mb-2">Prediction Result</h3>
          <p>{predictionResult}</p>
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium">Next Steps:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>This prediction is based on the model trained on historical data.</li>
              <li>Consult with a healthcare professional for proper diagnosis.</li>
              <li>Regular check-ups are recommended for heart health monitoring.</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-xs text-gray-500 text-center">
        <p>This tool is for educational purposes only and should not replace professional medical advice.</p>
      </div>
    </div>
  );
};

export default Heart;