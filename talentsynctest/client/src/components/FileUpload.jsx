import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import EmailSender from './EmailSender';

const CSVReader = () => {
  const [csvData, setCsvData] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState(false);
  const navigate = useNavigate();

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

  const handleScheduleInterviews = () => {
    navigate('/schedule-interview', { state: { csvData: csvData } });
  };


  //demo data in the formate of array
  const users = [
    {
      name: "Harshad Karale",
      email: "harshad.karale22@pccoepune.org",
      date: "2024-03-20",
      startTime: "09:00 AM",
      endTime: "11:00 AM"
    },
    {
      name: "Harshad",
      email: "harshadkarale25@gmail.com",
      date: "2024-03-21",
      startTime: "10:00 AM",
      endTime: "12:00 PM"
    },
  ];

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} multiple />
      <Button
        type='button'
        gradientDuoTone='purpleToBlue'
        size='sm'
        outline
        onClick={handleScheduleInterviews}
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

      <div>
      <EmailSender users={users} />
    </div>

    </div>
  );
};

export default CSVReader;
