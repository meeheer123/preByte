import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'flowbite-react';
import EmailSender from './EmailSender';

export default function Confirmation() {
  const location = useLocation();
  const { scheduledInterviews } = location.state || { scheduledInterviews: [] };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-center text-2xl font-bold mb-4'>Confirmation of Scheduled Interviews</h1>
      {scheduledInterviews.length > 0 ? (
        <Table striped bordered hover className='shadow-md'>
          <thead>
            <tr>
              <th className='text-lg'>Date</th>
              <th className='text-lg'>Start Time</th>
              <th className='text-lg'>End Time</th>
              <th className='text-lg'>Name</th>
              <th className='text-lg'>Email</th>
            </tr>
          </thead>
          <tbody>
            {scheduledInterviews.map((interview, index) => (
              <tr key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <td className='text-base'>{interview.date}</td>
                <td className='text-base'>{interview.start_time}</td>
                <td className='text-base'>{interview.end_time}</td>
                <td className='text-base'>{interview.name}</td>
                <td className='text-base'>{interview.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No interviews have been scheduled.</p>
      )}

      <div className='mt-4'>
        <EmailSender users={scheduledInterviews} />
      </div>
    </div>
  );
}
