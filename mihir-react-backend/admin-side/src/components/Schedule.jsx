// Assuming you have parsed CSV data and extracted candidate information into an array called candidatesData

const scheduleInterviews = (availableTime) => {
    const interviewDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    let currentTime = new Date(availableTime);
  
    // Function to format time as HH:MM AM/PM
    const formatTime = (time) => {
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
  
    // Iterate over candidate data and schedule interviews
    const scheduledInterviews = candidatesData.map((candidate, index) => {
      const interviewStartTime = currentTime.getTime();
      const interviewEndTime = interviewStartTime + interviewDuration;
  
      const scheduledInterview = {
        candidateName: candidate.name,
        startTime: formatTime(new Date(interviewStartTime)),
        endTime: formatTime(new Date(interviewEndTime)),
      };
  
      // Update current time for next interview
      currentTime = new Date(interviewEndTime);
  
      return scheduledInterview;
    });
  
    return scheduledInterviews;
  };
  
  // Usage:
  const availableTime = new Date('2024-03-18T09:00:00'); // Assuming user input for available time
  const scheduledInterviews = scheduleInterviews(availableTime);
  
  console.log(scheduledInterviews);
  