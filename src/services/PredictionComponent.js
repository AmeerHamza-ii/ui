import React, { useState } from "react";
import { getPrediction1, getPrediction2 } from "./api";
import Plot from "react-plotly.js";

const PredictionComponent = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [total, setTotal] = useState(0);
  const [predictions2, setPredictions2] = useState([]);
  const [total2, setTotal2] = useState(0);

  const handleFetchPredictions1 = () => {
    getPrediction1(startDate, endDate).then((response) => {
      setPredictions(response.data.predictions);
      setTotal(response.data.total);
      console.log(typeof response.data);
    });
  };
  const handleFetchPredictions2 = () => {
    getPrediction2(startDate, endDate).then((response) => {
      setPredictions2(response.data.predictions);
      setTotal2(response.data.total);
      console.log(typeof response.data);
    });
  };
  return (
    <div>
      <h1>Predictions</h1>
      <div>Total Sum: {total}</div>
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
      <button
        onClick={() => {
          handleFetchPredictions1();
          handleFetchPredictions2();
        }}
      >
        Get Predictions
      </button>
      <Plot
        data={[
          {
            x: predictions.map((item) => item.COLLECTION_DATE),
            y: predictions.map((item) => item.GRAND_TOTAL_AMOUNT),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            name: "Actual",
          },
          {
            x: predictions.map((item) => item.COLLECTION_DATE),
            y: predictions.map((item) => item.prediction_label),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
            name: "Predicted",
          },
        ]}
        layout={{ title: "Actual vs Predicted GRAND_TOTAL_AMOUNT" }}
      />
      <Plot
        data={[
          {
            x: predictions2.map((item) => item.COLLECTION_DATE),
            y: predictions2.map((item) => item.FPE_IX),

            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            name: "FPE Index",
          },
          {
            x: predictions2.map((item) => item.COLLECTION_DATE),
            y: predictions2.map((item) => item.petrol_price),
            mode: "lines+markers",
            type: "scatter",
            marker: { color: "green" },
            name: "Petrol Price",
          },
          {
            x: predictions2.map((item) => item.COLLECTION_DATE),
            y: predictions2.map((item) => item.prediction_label),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
            name: "Predicted",
          },
        ]}
        layout={{ title: "Predictions for Second Model" }}
      />
    </div>
  );
};

export default PredictionComponent;

// import React, { useState } from "react";
// import { getPrediction1 } from "./api";
// import Plot from "react-plotly.js";

// const PredictionComponent = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [predictions, setPredictions] = useState([]);
//   const [total, setTotal] = useState(0);

//   const handleFetchPredictions = () => {
//     getPrediction1(startDate, endDate).then((response) => {
//       setPredictions(response.data.predictions);
//       setTotal(response.data.total);
//       console.log(typeof response.data);
//     });
//   };

//   return (
//     <div>
//       <h1>Predictions</h1>
//       <div>Total Sum: {total}</div>
//       <input
//         type="date"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//       />
//       <input
//         type="date"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//       />
//       <button onClick={handleFetchPredictions}>Get Predictions</button>
//       <Plot
//         data={[
//           {
//             x: predictions.map((item) => item.COLLECTION_DATE),
//             y: predictions.map((item) => item.GRAND_TOTAL_AMOUNT),
//             type: "scatter",
//             mode: "lines+markers",
//             marker: { color: "blue" },
//             name: "Actual",
//           },
//           {
//             x: predictions.map((item) => item.COLLECTION_DATE),
//             y: predictions.map((item) => item.prediction_label),
//             type: "scatter",
//             mode: "lines+markers",
//             marker: { color: "red" },
//             name: "Predicted",
//           },
//         ]}
//         layout={{ title: "Actual vs Predicted GRAND_TOTAL_AMOUNT" }}
//       />
//     </div>
//   );
// };

// export default PredictionComponent;
