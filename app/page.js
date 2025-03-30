'use client';

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState("initial"); // Tracks the current step in the flow
  const [sampleSize, setSampleSize] = useState(""); // Tracks selected sample size

  // Handlers for various steps
  const handleContinue = () => {
    if (sampleSize === "small" || sampleSize === "moderate") {
      setStep("secondQuestion");
    } else if (sampleSize === "large") {
      setStep("largeResult");
    }
  };
  
  const handleStrongCovariates = () => setStep("stratResult");
  const handleNoStrongCovariates = () => setStep("blockResult");
  const handleReset = () => {
    setStep("initial");
    setSampleSize("");
  };

  return (
    <div className="flowchart-container">
      <h1 className="main-heading">This interactive flowchart guides researchers through selecting an appropriate randomization method for their study design. Users answer questions about their study characteristics to receive a recommended randomization approach with relevant considerations and implementation guidance.</h1>

      {/* Initial Question */}
      {step === "initial" && (
        <>
          <h4 className="question-heading">What is your sample size?</h4>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '10px' }}>
              <input 
                type="radio" 
                id="small" 
                name="sampleSize" 
                value="small" 
                checked={sampleSize === "small"}
                onChange={() => setSampleSize("small")}
                style={{ marginRight: '10px' }}
              />
              <label htmlFor="small">Small</label>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <input 
                type="radio" 
                id="moderate" 
                name="sampleSize" 
                value="moderate" 
                checked={sampleSize === "moderate"}
                onChange={() => setSampleSize("moderate")}
                style={{ marginRight: '10px' }}
              />
              <label htmlFor="moderate">Moderate</label>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <input 
                type="radio" 
                id="large" 
                name="sampleSize" 
                value="large" 
                checked={sampleSize === "large"}
                onChange={() => setSampleSize("large")}
                style={{ marginRight: '10px' }}
              />
              <label htmlFor="large">Large</label>
            </div>
          </div>
          
          <button 
            onClick={handleContinue}
            className="action-button"
            disabled={!sampleSize}
            style={{ opacity: !sampleSize ? 0.6 : 1 }}
          >
            Continue
          </button>
        </>
      )}

      {/* Second Question */}
      {step === "secondQuestion" && (
        <>
          <h4 className="question-heading">Are there strong covariates that need to be controlled?</h4>
          <button 
            onClick={handleStrongCovariates}
            className="action-button"
          >
            Yes
          </button>
          <button 
            onClick={handleNoStrongCovariates}
            className="action-button"
          >
            No
          </button>
        </>
      )}

      {/* Large Sample Result */}
      {step === "largeResult" && (
        <div className="result-container">
          <h4 className="result-heading">Recommended Method: Simple Randomization</h4>
          <p className="result-description">
            With a large sample size, simple randomization is appropriate as groups will
            likely be balanced due to the law of large numbers.
          </p>
          <ul className="result-list">
            <li>Ensures complete randomness</li>
            <li>Easy to implement</li>
            <li>Requires minimal resources</li>
            <li>Most appropriate when N &gt; 200</li>
          </ul>
          <button 
            onClick={handleReset}
            className="reset-button"
          >
            Start Over
          </button>
        </div>
      )}

      {/* Stratified Randomization Result */}
      {step === "stratResult" && (
        <div className="result-container">
          <h4 className="result-heading">Recommended Method: Stratified Randomization</h4>
          <p className="result-description">
            When important covariates need to be controlled, stratified randomization helps
            ensure balance across treatment groups.
          </p>
          <ul className="result-list">
            <li>Controls for known prognostic factors</li>
            <li>Ensures balanced groups for key variables</li>
            <li>Requires careful selection of stratification factors</li>
            <li>Most appropriate when 1-3 important covariates exist</li>
          </ul>
          <button 
            onClick={handleReset}
            className="reset-button"
          >
            Start Over
          </button>
        </div>
      )}

      {/* Block Randomization Result */}
      {step === "blockResult" && (
        <div className="result-container">
          <h4 className="result-heading">Recommended Method: Block Randomization</h4>
          <p className="result-description">
            For smaller studies without strong covariates, block randomization helps maintain
            balanced group sizes.
          </p>
          <ul className="result-list">
            <li>Ensures equal group sizes</li>
            <li>Simple to implement</li>
            <li>Reduces risk of imbalance in small studies</li>
            <li>Flexible block sizes can reduce selection bias</li>
          </ul>
          <button 
            onClick={handleReset}
            className="reset-button"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}