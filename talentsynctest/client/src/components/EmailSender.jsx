import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const EmailSender = ({ users }) => {
  const [emailsSent, setEmailsSent] = useState(false);

  emailjs.init("7hvsQsv2TgE5TSV2H");

  const onHelpButtonClick = () => {
    users.forEach(user => {
      const { name, email, date, start_time, end_time } = user;

      const params = {
        name: name,
        email: email,
        date: date,
        start_time: start_time,
        end_time: end_time
      };
      console.log(params);

      const serviceID = "service_ain75vc"; // Replace with your email service ID
      const templateID = "template_vwujnwa"; // Replace with your email template ID

      emailjs.send(serviceID, templateID, params)
      .then((res) => {
        console.log(res);
        // Optionally, do something after sending each email
      })
      .catch((err) => console.log(err));
    });

    setEmailsSent(true); // Set emailsSent to true after all emails are sent
  };

  if (emailsSent) {
    alert("Your messages have been sent successfully to all candidates!!");
    location.reload(); // Refresh the page after sending all emails
  }

  return (
    <button
      type="button"
      onClick={onHelpButtonClick}
      className="w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white py-2 px-4 rounded-md"
    >
      Send Mails
    </button>

  );
};

export default EmailSender;
