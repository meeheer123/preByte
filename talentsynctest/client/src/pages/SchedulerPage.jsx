import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SchedulerForm = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [interviewDuration, setInterviewDuration] = useState(30); // Assuming minutes
    const [breakDuration, setBreakDuration] = useState(10); // Assuming minutes
    const [scheduledInterviews, setScheduledInterviews] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.csvData) {
            setCsvData(location.state.csvData);
        }
    }, [location.state]);

    const handleScheduleInterviews = async () => {
        const requestData = {
            candidates: csvData,
            start_time: startTime,
            end_time: endTime,
            interview_duration: interviewDuration,
            break_time: breakDuration
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/schedule-interviews', requestData);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            setScheduledInterviews(data.scheduled_interviews);
            console.log('Scheduled Interviews:', data.scheduled_interviews);
    
            // Navigate to the confirmation page with scheduled interviews data
            navigate('/confirmation', { state: { scheduledInterviews: data.scheduled_interviews } });
            console.log( data.scheduled_interviews);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    

    return (
        <div>
            <main className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Schedule Interviews</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
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
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
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
                        <label htmlFor="interviewDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Interview Duration (minutes)</label>
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
                        <label htmlFor="breakDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Break Duration (minutes)</label>
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
        </div>
    );
};

export default SchedulerForm;
