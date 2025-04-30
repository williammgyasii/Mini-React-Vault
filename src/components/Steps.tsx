import { useState } from "react";
import "../steps.css";

type Props = {};

const messages: string[] = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const Steps = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < messages.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  return (
    <div className="steps">
      <div className="numbers">
        {messages.map((_, index) => {
          return (
            <>
              <div
                className={`step-${index} ${
                  currentStep === index ? "active" : ""
                }`}
              >
                {index + 1}
              </div>
            </>
          );
        })}
      </div>

      <p className="message">{messages[currentStep]}</p>

      <div className="buttons">
        <button
          className="previous"
          onClick={handlePrevious}
          disabled={currentStep <= 0}
        >
          Previous
        </button>
        <button
          className="next"
          disabled={currentStep >= messages.length - 1}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Steps;
