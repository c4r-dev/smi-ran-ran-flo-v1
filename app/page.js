'use client';

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState("initial"); // Tracks the current step in the flow

  // Handlers for various steps
  const handleSmallSample = () => setStep("secondQuestion");
  const handleLargeSample = () => setStep("largeResult");
  const handleStrongCovariates = () => setStep("stratResult");
  const handleNoStrongCovariates = () => setStep("blockResult");
  const handleReset = () => setStep("initial");

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Randomization Method Selection Guide</h1>

      {/* Initial Question */}
      {step === "initial" && (
        <>
          <h4 className="text-lg font-medium mb-3">What is your sample size?</h4>
          <button 
            onClick={handleSmallSample}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-3"
          >
            Small to Moderate
          </button>
          <button 
            onClick={handleLargeSample}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Large
          </button>
        </>
      )}

      {/* Second Question */}
      {step === "secondQuestion" && (
        <>
          <h4 className="text-lg font-medium mb-3">Are there strong covariates that need to be controlled?</h4>
          <button 
            onClick={handleStrongCovariates}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-3"
          >
            Yes
          </button>
          <button 
            onClick={handleNoStrongCovariates}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            No
          </button>
        </>
      )}

      {/* Large Sample Result */}
      {step === "largeResult" && (
        <div className="border border-gray-300 rounded p-4 mt-5">
          <h4 className="text-lg font-medium mb-2">Recommended Method: Simple Randomization</h4>
          <p className="mb-3">
            With a large sample size, simple randomization is appropriate as groups will
            likely be balanced due to the law of large numbers.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Ensures complete randomness</li>
            <li>Easy to implement</li>
            <li>Requires minimal resources</li>
            <li>Most appropriate when N &gt; 200</li>
          </ul>
          <button 
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
          >
            Start Over
          </button>
        </div>
      )}

      {/* Stratified Randomization Result */}
      {step === "stratResult" && (
        <div className="border border-gray-300 rounded p-4 mt-5">
          <h4 className="text-lg font-medium mb-2">Recommended Method: Stratified Randomization</h4>
          <p className="mb-3">
            When important covariates need to be controlled, stratified randomization helps
            ensure balance across treatment groups.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Controls for known prognostic factors</li>
            <li>Ensures balanced groups for key variables</li>
            <li>Requires careful selection of stratification factors</li>
            <li>Most appropriate when 1-3 important covariates exist</li>
          </ul>
          <button 
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
          >
            Start Over
          </button>
        </div>
      )}

      {/* Block Randomization Result */}
      {step === "blockResult" && (
        <div className="border border-gray-300 rounded p-4 mt-5">
          <h4 className="text-lg font-medium mb-2">Recommended Method: Block Randomization</h4>
          <p className="mb-3">
            For smaller studies without strong covariates, block randomization helps maintain
            balanced group sizes.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Ensures equal group sizes</li>
            <li>Simple to implement</li>
            <li>Reduces risk of imbalance in small studies</li>
            <li>Flexible block sizes can reduce selection bias</li>
          </ul>
          <button 
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}