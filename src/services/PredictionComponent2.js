import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const PredictionComponent2 = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [predictionsFirst, setPredictionsFirst] = useState([]);
  const [predictionsSecond, setPredictionsSecond] = useState([]);

  const fetchPredictions = async (model) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/predictions/${model}`,
        {
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);
      console.log(data["predictions"]);
      console.log(data.total);
      console.log(data[0]);

      if (data.error) {
        console.error("Error from server:", data.error);
      } else {
        const predictions = data.predictions?.map((prediction) => ({
          ...prediction,
          FPE_IX: prediction.FPE_IX || 0,
          petrol_price: prediction.petrol_price || 0,
        }));

        if (model === "first") {
          setPredictionsFirst(predictions || []);
        } else if (model === "second") {
          setPredictionsSecond(predictions || []);
        }

        // Log the data in JSON format
        console.log(
          `Predictions for ${model} model:`,
          JSON.stringify(predictions, null, 2)
        );
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const chartData = (predictions, label) => ({
    labels: predictions.map((p) => p.COLLECTION_DATE),
    datasets: [
      {
        label: label,
        data: predictions.map((p) => p.prediction_label),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  });

  return (
    <div>
      <div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={() => fetchPredictions("first")}>
          Get Predictions for First Model
        </button>
        <button onClick={() => fetchPredictions("second")}>
          Get Predictions for Second Model
        </button>
      </div>
      <div>
        <h2>Predictions for First Model</h2>
        <Line data={chartData(predictionsFirst, "First Model Predictions")} />
        {/* <pre>{JSON.stringify(predictionsFirst, null, 2)}</pre>{" "} */}
        {/* Display JSON data */}
      </div>
      <div>
        <h2>Predictions for Second Model</h2>
        <Line data={chartData(predictionsSecond, "Second Model Predictions")} />
        {/* Display JSON data */}
      </div>
    </div>
  );
};

export default PredictionComponent2;
