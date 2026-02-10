import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      id: 'One',
      question: 'How do I register for government schemes?',
      answer: 'You can register for government schemes through the "Government Schemes" section on this platform. We have simplified the process with step-by-step guidance. Alternatively, you can visit your nearest Common Service Center (CSC) or agricultural office with necessary documents including your Aadhaar card, land ownership papers, and bank account details.',
      defaultOpen: true
    },
    {
      id: 'Two',
      question: 'What documents are needed for agricultural loans?',
      answer: "Typically, you'll need your Aadhaar card, proof of land ownership (or lease agreement), bank statements from the last 6 months, credit history (if available), and a detailed project report outlining how you plan to use the loan funds. Some banks may require additional documentation based on the loan amount and type.",
      defaultOpen: false
    },
    {
      id: 'Three',
      question: 'How does the AI crop recommendation work?',
      answer: 'Our AI crop recommendation system analyzes multiple factors including your soil type (which you can input or we can estimate based on location), historical weather patterns, water availability, market demand trends, and your specific requirements. The system then suggests the most suitable crops with expected yield and market value projections to help you make informed decisions.',
      defaultOpen: false
    },
    {
      id: 'Four',
      question: 'Is there a fee for using this platform?',
      answer: 'Basic access to the AgriConnect platform is completely free for all farmers. This includes weather information, basic crop recommendations, access to knowledge resources, and marketplace listings. Some premium services like detailed soil analysis, personalized consultancy, and advanced market analytics may have nominal fees, which will be clearly communicated before you access these services.',
      defaultOpen: false
    }
  ];

  return (
    <section className="faq-section py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center mb-5">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={faq.id}>
              <h2 className="accordion-header" id={`heading${faq.id}`}>
                <button
                  className={`accordion-button ${!faq.defaultOpen ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${faq.id}`}
                  aria-expanded={faq.defaultOpen}
                  aria-controls={`collapse${faq.id}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${faq.id}`}
                className={`accordion-collapse collapse ${faq.defaultOpen ? 'show' : ''}`}
                aria-labelledby={`heading${faq.id}`}
              >
                <div className="accordion-body text-dark bg-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;