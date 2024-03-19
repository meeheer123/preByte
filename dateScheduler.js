function scheduleInterviews(candidateData, startTime, endTime, interviewDuration, breakDuration) {
    let currentDate = new Date();
    let scheduledInterviews = [];

    while (candidateData.length > 0) {
        // If it's a weekend, move to the next Monday
        while (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
            currentDate.setDate(currentDate.getDate() + 1);
        }

        let currentDateTime = new Date(currentDate);
        currentDateTime.setHours(startTime.hours, startTime.minutes, 0, 0);
        let availableSlots = [];

        while (currentDateTime.getTime() + interviewDuration.hours * 60 * 60 * 1000 + interviewDuration.minutes * 60 * 1000 + breakDuration.minutes * 60 * 1000 <= new Date(currentDate).setHours(endTime.hours, endTime.minutes)) {
            availableSlots.push(new Date(currentDateTime));
            currentDateTime.setMinutes(currentDateTime.getMinutes() + interviewDuration.minutes + breakDuration.minutes);
        }

        while (availableSlots.length > 0 && candidateData.length > 0) {
            let startDateTime = availableSlots.shift();
            let endDateTime = new Date(startDateTime);
            endDateTime.setMinutes(startDateTime.getMinutes() + interviewDuration.minutes);
            let candidate = candidateData.shift();
            // Extracting user details based on user id
            let userData = getUserData(candidate);
            scheduledInterviews.push({
                candidate: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                date: currentDateTime.toISOString().split('T')[0],
                startTime: startDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                endTime: endDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            });
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return scheduledInterviews;
}

// Function to extract user data based on user id
function getUserData(userId) {
    // Assuming candidateData is available globally as per your previous code
    let userData = candidateData.find(user => user.UserId === userId);
    return {
        firstName: userData["First Name"],
        lastName: userData["Last Name"],
        email: userData["Email"]
    };
}

// Example usage:
let candidateData = [
    { UserId: "88F7B33d2bcf9f5", "First Name": "Shelby", "Last Name": "Terrell", "Email": "elijah57@example.net" },
    { UserId: "f90cD3E76f1A9b9", "First Name": "Phillip", "Last Name": "Summers", "Email": "bethany14@example.com" },
    // Other candidate data...
];

// Customizable time slots
let startTime = { hours: 9, minutes: 0 }; // Start interviews at 9:00 AM
let endTime = { hours: 17, minutes: 0 };   // End interviews at 5:00 PM
let interviewDuration = { hours: 2, minutes: 0 }; // Interview duration is 2 hours
let breakDuration = { minutes: 30 };   // Break duration is 30 minutes

let scheduledInterviews = scheduleInterviews(candidateData.map(user => user.UserId), startTime, endTime, interviewDuration, breakDuration);
scheduledInterviews.forEach(interview => console.log(interview));

// export default scheduleInterviews;