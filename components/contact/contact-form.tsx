import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

interface ContactFormProps {}

const ContactForm: React.FC<ContactFormProps> = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [notificationData, setNotificationData] = useState<
    NotificationData | undefined
  >(undefined);

  useEffect(() => {
    if (notificationData && notificationData.status !== 'pending') {
      const timer = setTimeout(() => {
        setNotificationData(undefined);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notificationData]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    const email = emailInputRef.current?.value;
    const name = nameInputRef.current?.value;
    const message = messageInputRef.current?.value;

    if (
      !email ||
      email.trim().length === 0 ||
      !email.includes('@') ||
      !name ||
      name.trim().length === 0 ||
      !message ||
      message.trim().length === 0
    ) {
      return;
    }

    setNotificationData({
      title: 'Sending...',
      message: 'Your message is being sent to the server.',
      status: 'pending'
    });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
        headers: { 'Content-Type': 'application/json' }
      });
      await response.json();

      setNotificationData({
        title: 'Success',
        message: 'Your message sent successfully.',
        status: 'success'
      });
      emailInputRef.current.value = '';
      nameInputRef.current.value = '';
      messageInputRef.current.value = '';
    } catch (err) {
      console.log(err);
      setNotificationData({
        title: 'Error',
        message: 'Something went wrong.',
        status: 'error'
      });
    }
  };

  return (
    <section className={classes.contact}>
      <h1>How can i help you ?</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input ref={emailInputRef} type='email' id='email' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameInputRef} type='text' id='name' required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            ref={messageInputRef}
            id='message'
            rows={5}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type='submit'>Send Message</button>
        </div>
      </form>
      {notificationData && <Notification {...notificationData} />}
    </section>
  );
};

export default ContactForm;
