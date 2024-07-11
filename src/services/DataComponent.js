import React, { useEffect, useState } from "react";
import { getData } from "./api";
import Plot from "react-plotly.js";

const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((response) => {
      // console.log(response);
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Data</h1>
      <Plot
        data={[
          {
            x: data.map((item) => item.COLLECTION_DATE),
            y: data.map((item) => item.GRAND_TOTAL_AMOUNT),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{ title: "GRAND_TOTAL_AMOUNT Over Time" }}
      />
    </div>
  );
};

export default DataComponent;
