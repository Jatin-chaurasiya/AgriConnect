import React from "react";

const FAQ = () => {
  return (
    <section className="faq-section py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center mb-5">
          Frequently Asked Questions
        </h2>

        <div className="accordion" id="faqAccordion">
          
          {/* Item 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                How do I register for government schemes?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                You can register for government schemes through the
                "Government Schemes" section on this platform. We have
                simplified the process with step-by-step guidance.
                Alternatively, you can visit your nearest Common Service
                Center (CSC) or agricultural office with necessary
                documents including your Aadhaar card, land ownership
                papers, and bank account details.
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                What documents are needed for agricultural loans?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Typically, you'll need your Aadhaar card, proof of land
                ownership (or lease agreement), bank statements from the
                last 6 months, credit history (if available), and a
                detailed project report outlining how you plan to use
                the loan funds. Some banks may require additional
                documentation based on the loan amount and type.
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                How does the AI crop recommendation work?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Our AI crop recommendation system analyzes multiple
                factors including soil type, historical weather patterns,
                water availability, market demand trends, and your
                specific requirements. The system then suggests the most
                suitable crops with expected yield and market value
                projections.
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Is there a fee for using this platform?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Basic access to the AgriConnect platform is completely
                free. Premium services like detailed soil analysis and
                advanced market analytics may have nominal fees which
                will be clearly communicated.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
