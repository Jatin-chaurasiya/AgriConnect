import React, { useState } from "react";

const faqs = [
  {
    id: "One",
    question: "How do I register for government schemes?",
    answer:
      'You can register for government schemes through the "Government Schemes" section on this platform. We have simplified the process with step-by-step guidance. Alternatively, you can visit your nearest Common Service Center (CSC) or agricultural office with necessary documents including your Aadhaar card, land ownership papers, and bank account details.',
  },
  {
    id: "Two",
    question: "What documents are needed for agricultural loans?",
    answer:
      "Typically, you'll need your Aadhaar card, proof of land ownership (or lease agreement), bank statements from the last 6 months, credit history (if available), and a detailed project report outlining how you plan to use the loan funds. Some banks may require additional documentation based on the loan amount and type.",
  },
  {
    id: "Three",
    question: "How does the AI crop recommendation work?",
    answer:
      "Our AI crop recommendation system analyzes multiple factors including soil type, historical weather patterns, water availability, market demand trends, and your specific requirements. The system then suggests the most suitable crops with expected yield and market value projections.",
  },
  {
    id: "Four",
    question: "Is there a fee for using this platform?",
    answer:
      "Basic access to the AgriConnect platform is completely free. Premium services like detailed soil analysis and advanced market analytics may have nominal fees which will be clearly communicated.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState("One"); // default open

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center mb-5">
          Frequently Asked Questions
        </h2>

        <div className="accordion" id="faqAccordion">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div className="accordion-item" key={faq.id}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                  >
                    {faq.question}
                  </button>
                </h2>
                {isOpen && (
                  <div className="accordion-collapse">
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;