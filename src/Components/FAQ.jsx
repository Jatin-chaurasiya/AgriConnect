import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState("One");
  const faqs = [
    {
      id: "One",
      question: t("faq.governmentSchemeRegistrationQuestion"),
      answer: t("faq.governmentSchemeRegistrationAnswer"),
    },
    {
      id: "Two",
      question: t("faq.agriculturalLoanDocumentsQuestion"),
      answer: t("faq.agriculturalLoanDocumentsAnswer"),
    },
    {
      id: "Three",
      question: t("faq.cropRecommendationQuestion"),
      answer: t("faq.cropRecommendationAnswer"),
    },
    {
      id: "Four",
      question: t("faq.platformFeeQuestion"),
      answer: t("faq.platformFeeAnswer"),
    },
  ];

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center mb-5">{t("faq.title")}</h2>

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
