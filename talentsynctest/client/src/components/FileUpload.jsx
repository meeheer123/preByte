// CSVReader.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button } from 'flowbite-react';

const CSVReader = () => {
  const [csvData, setCsvData] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const combinedData = [];

    Array.from(files).forEach((file) => {
      Papa.parse(file, {
        complete: (result) => {
          combinedData.push(...result.data);
          setCsvData([...combinedData]);
        },
        header: true, // Set to true if your CSV has headers
      });
    });
  };

  const handleUploadImage = () => {
    // Logic to handle image upload goes here
    console.log("Image uploaded!");
    // Assuming you want to set imageUploadProgress to true while uploading
    setImageUploadProgress(true);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} multiple />
      <Button
        type='button'
        gradientDuoTone='purpleToBlue'
        size='sm'
        outline
        onClick={handleUploadImage}
        disabled={imageUploadProgress}
      >
        Schedule Interviews
      </Button>
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
