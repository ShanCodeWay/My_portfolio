import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
    const { id, value } = e.target;
    setFormData({
        ...formData,
        [id]: value
    });
};

interface SubmitEvent {
    preventDefault: () => void;
}

const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
};

  return (
    <form className="contact-form scroll-animate" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3 className="form-title">Send me a message</h3>
        <p className="form-subtitle">I'll get back to you as soon as possible</p>
        <div className="form-decoration"></div>
      </div>

      <div className="form-content">
        <div className="form-group">
          <div className="input-container">
            <input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="name" className="form-label">Your Name</label>
            <div className="input-underline"></div>
            <div className="input-glow"></div>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-underline"></div>
            <div className="input-glow"></div>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <textarea 
              id="message" 
              value={formData.message}
              onChange={handleChange}
              className="form-input textarea"
              placeholder=" "
              rows={5}
              required
            ></textarea>
            <label htmlFor="message" className="form-label">Your Message</label>
            <div className="input-underline"></div>
            <div className="input-glow"></div>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
        >
          <span className="button-text">Send Message</span>
          <span className="button-icon">
            <svg className="send-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </span>
          <span className="button-glow"></span>
        </button>
      </div>

      <div className="form-footer">
        <p className="form-note">
          <svg className="lock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your information is secure and will never be shared
        </p>
      </div>
    </form>
  );
}