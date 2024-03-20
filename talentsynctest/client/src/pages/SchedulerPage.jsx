import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SchedulerForm = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [interviewDuration, setInterviewDuration] = useState(2);
    const [breakDuration, setBreakDuration] = useState(30);
    const [scheduledInterviews, setScheduledInterviews] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.csvData) {
            // Retrieve CSV data from location state
            const csvData = location.state.csvData;
            setCsvData(csvData);
        }
    }, [location.state]);

    // Function to handle scheduling interviews
    const handleScheduleInterviews = () => {
        // Convert start time and end time to Date objects
        const startDate = new Date();
        const endDate = new Date();
        startDate.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]), 0, 0);
        endDate.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]), 0, 0);

        console.log(csvData);
    
        // Prepare request body
        const requestData = {
            candidates: csvData, // Fill this with your candidates data
            start_time: startTime,
            end_time: endTime,
            interview_duration: interviewDuration,
            break_time: breakDuration
        };
    
        // Make POST request to the API
        const handleScheduleInterviews = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/schedule-interviews', requestData);
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                const data = response.data;
                setScheduledInterviews(data.scheduled_interviews);
                console.log('Scheduled Interviews:', data.scheduled_interviews);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        handleScheduleInterviews(); // Call the function to initiate the POST request
    };

    // Function to format time as HH:MM
    const formatTime = (date) => {
        return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    };

    return (
        <div>
            <main className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Schedule Interviews</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Start Time
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md dark:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            End Time
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md dark:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label htmlFor="interviewDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Interview Duration (hours)
                        </label>
                        <input
                            type="number"
                            id="interviewDuration"
                            name="interviewDuration"
                            min="1"
                            value={interviewDuration}
                            onChange={(e) => setInterviewDuration(parseInt(e.target.value))}
                            required
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md dark:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label htmlFor="breakDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Break Duration (minutes)
                        </label>
                        <input
                            type="number"
                            id="breakDuration"
                            name="breakDuration"
                            min="0"
                            value={breakDuration}
                            onChange={(e) => setBreakDuration(parseInt(e.target.value))}
                            required
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md dark:bg-gray-800"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleScheduleInterviews}
                        className="w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white py-2 px-4 rounded-md"
                    >
                        Schedule Interviews
                    </button>
                </form>
            </main>
            <div id="scheduledInterviews" className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Scheduled Interviews</h2>
                <ul>
                    {scheduledInterviews.map((interview, index) => (
                        <li key={index}>
                            <strong>Date:</strong> {interview.date}<br />
                            <strong>Start Time:</strong> {interview.start_time}<br />
                            <strong>End Time:</strong> {interview.end_time}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SchedulerForm;
