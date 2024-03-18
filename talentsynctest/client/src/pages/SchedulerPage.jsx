import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SchedulerForm = () => {
    // State variables to store form data and scheduled interviews
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [interviewDuration, setInterviewDuration] = useState(2);
    const [breakDuration, setBreakDuration] = useState(30);
    const [scheduledInterviews, setScheduledInterviews] = useState([]);

    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Function to handle scheduling interviews
    const handleScheduleInterviews = () => {
        // Convert start time and end time to Date objects
        const startDate = new Date();
        const endDate = new Date();
        startDate.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]), 0, 0);
        endDate.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]), 0, 0);

        // Schedule interviews
        const interviews = [];
        let currentDate = new Date(startDate);
        while (currentDate < endDate) {
            // Calculate interview end time
            const endDateTime = new Date(currentDate.getTime() + interviewDuration * 60 * 1000);
            endDateTime.setSeconds(0, 0);

            // Add scheduled interview to the list
            interviews.push({
                date: currentDate.toDateString(),
                start_time: formatTime(currentDate),
                end_time: formatTime(endDateTime)
            });

            // Move to the next available slot
            currentDate = new Date(currentDate.getTime() + (interviewDuration + breakDuration) * 60 * 1000);
        }

        // Update scheduled interviews state
        setScheduledInterviews(interviews);

        // Navigate to the scheduled interviews page
        navigate('/scheduled-interviews'); // Replace '/scheduled-interviews' with your desired route
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
                {scheduledInterviews.map((interview, index) => (
                    <p key={index}>{JSON.stringify(interview)}</p>
                ))}
            </div>
        </div>
    );
};

export default SchedulerForm;
