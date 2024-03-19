import React from 'react';
import { Modal, Table, Button } from 'your-ui-library'; // Import necessary components

const ScheduledInterviewsPopup = ({ showModal, scheduledInterviews, onClose, sendMails }) => {
  return (
    <Modal
      visible={showModal}
      onClose={onClose}
      title="Scheduled Interviews"
      footer={[
        <Button key="send" onClick={sendMails} type="primary">
          Send Mails
        </Button>,
      ]}
    >
      <Table>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Start Time</Table.HeadCell>
          <Table.HeadCell>End Time</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {scheduledInterviews.map((interview, index) => (
            <Table.Row key={index}>
              <Table.Cell>{interview.date}</Table.Cell>
              <Table.Cell>{interview.start_time}</Table.Cell>
              <Table.Cell>{interview.end_time}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Modal>
  );
};

export default ScheduledInterviewsPopup;
