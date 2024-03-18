import React from 'react';
import { useHistory } from 'react-router-dom';

const Schedule = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/schedule-interview'); // Corrected route path
    };

    return (
        <button onClick={handleClick}>Schedule</button>
    );
};

export default Schedule;





