import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Add your subscription logic here
    // Example: API call to subscribe endpoint
    try {
      // const response = await fetch('/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // if (response.ok) {
        toast.success('Successfully subscribed to newsletter!');
        setEmail('');
      // }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <>
      <section className="stay-updated">
        <div className="container">
          <h2 className="section-title">Stay Updated</h2>
          <p>Subscribe to our newsletter to receive the latest updates on agricultural schemes, market prices, and farming techniques.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email" 
              className="newsletter-input" 
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section>

      <style>{`
        /* Stay Updated Section - Updated Styles */
        .stay-updated {
          padding: 50px 0;
          background-color: #4A7C3A;
          text-align: center;
        }
        .stay-updated .section-title {
          font-size: 28px;
          margin-bottom: 15px;
          position: relative;
          color: #FFFFFF;
        }
        .stay-updated .section-title:after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background-color: #FFA62B;
          border-radius: 2px;
        }
        .stay-updated p {
          max-width: 600px;
          margin: 0 auto 30px;
          font-size: 16px;
          color: #FFFFFF;
          opacity: 0.9;
        }
        .newsletter-form {
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          gap: 10px;
        }
        .newsletter-input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid #d0e0c5;
          border-radius: 6px;
          font-size: 15px;
          outline: none;
        }
        .newsletter-btn {
          background-color: #FFA62B;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        .newsletter-btn:hover {
          background-color: #3a612d;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .newsletter-form {
            flex-direction: column;
          }
          .newsletter-input, .newsletter-btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Newsletter;