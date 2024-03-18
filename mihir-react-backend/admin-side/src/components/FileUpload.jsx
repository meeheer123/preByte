import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVReader = ({ onProcessData }) => {
  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const combinedData = [];

    Array.from(files).forEach((file) => {
      Papa.parse(file, {
        complete: (result) => {
          combinedData.push(...result.data);
          setCsvData([...combinedData]);
          // Process data and pass it to the parent component
          onProcessData(combinedData);
        },
        header: true, // Set to true if your CSV has headers
      });
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} multiple />
      <table>
        <thead>
          <tr>
            {csvData.length > 0 &&
              Object.keys(csvData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVReader;
