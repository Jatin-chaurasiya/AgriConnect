import React from "react";
import CalculatorCard from "./CalculatorCard";
import { useFarmCalculators } from "../Hooks/useFarmCalculators";

const FarmingCalculators = () => {
  const { state, updateField, calculate } = useFarmCalculators();

  return (
    <>
      <section className="container py-5">
        <h2 className="section-title">Farming Calculators</h2>

        <div className="row g-4">
          <CalculatorCard
            title="Fertilizer Calculator"
            type="fertilizer"
            data={state.fertilizer}
            updateField={updateField}
            calculate={calculate}
          />

          <CalculatorCard
            title="Seed Calculator"
            type="seed"
            data={state.seed}
            updateField={updateField}
            calculate={calculate}
          />

          <CalculatorCard
            title="Irrigation Calculator"
            type="irrigation"
            data={state.irrigation}
            updateField={updateField}
            calculate={calculate}
          />
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .section-title {
          color: #2c5530;
          text-align: center;
          margin-bottom: 40px;
          font-weight: 700;
        }

        .calculator-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          padding: 25px;
          height: 100%;
          transition: all 0.3s ease;
        }

        .calculator-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        .calculator-card h4 {
          color: #2c5530;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }

        .form-select,
        .form-control {
          border-radius: 8px;
          padding: 10px;
        }

        .btn-calc {
          background-color: #28a745;
          border: none;
          font-weight: 600;
          padding: 10px;
          border-radius: 8px;
          width: 100%;
          color: white;
          margin-top: 10px;
          transition: 0.3s ease;
        }

        .btn-calc:hover {
          background-color: #218838;
        }

        .result-box {
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
          margin-top: 20px;
          border-left: 5px solid #28a745;
        }

        .result-title {
          font-weight: 600;
          color: #2c5530;
          margin-bottom: 8px;
        }

        .result-value {
          font-size: 1rem;
          font-weight: 600;
          color: #495057;
        }

        @media (max-width: 768px) {
          .calculator-card {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default FarmingCalculators;
