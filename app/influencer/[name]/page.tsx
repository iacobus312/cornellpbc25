"use client";
import { use, useState, useEffect } from "react";
import { Wallet } from '@coinbase/onchainkit/wallet';
import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';

interface InfluencerPageProps {
  // Note: params is now a Promise that resolves to an object with the name property
  params: Promise<{ name: string }>;
}

export default function InfluencerPage({ params }: InfluencerPageProps) {
  // Unwrap the params promise using React.use()
  const { name } = use(params);
  // Decode URL encoding and replace hyphens with spaces
  const formattedName = decodeURIComponent(name).replace(/-/g, " ");
  // Build the path to the public/images folder in the root
  const imageUrl = `/images/${encodeURIComponent(formattedName)}.jpg`;
  // Placeholder growth rate value
  const growthRate = "42%";

  // Modal state management
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [prediction, setPrediction] = useState<"rise" | "fall" | "">("");
  
  // Retrieve the user id from localStorage
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // State to hold submission details for on-page display
  const [submissionData, setSubmissionData] = useState<{
    influencer: string;
    prediction: string;
    amount: number;
    duration: number;
    userId: string;
  } | null>(null);

  // Open modal when either button is clicked
  const handleButtonClick = (pred: "rise" | "fall") => {
    setPrediction(pred);
    setModalOpen(true);
  };
  
  // Handle confirm: send data to backend and update submissionData
  const handleConfirm = async () => {
    const payload = {
      userId,
      influencer: formattedName,
      prediction, // "rise" or "fall"
      amount: Number(amount),
      duration: Number(duration),
       // include the internally assigned user id
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Set submission data so it displays on the page
      setSubmissionData(payload);
      // Optionally, alert the user with the user id:
      alert(`Submission successful! Your user id is: ${userId}`);
      
      // Reset input fields and close modal
      setAmount("");
      setDuration("");
      setPrediction("");
      setModalOpen(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting your data. Please try again.");
    }
  };

  // Modal component
  const Modal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter Details</h2>
        <div className="mb-4">
          <label className="block text-gray-900 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-900 rounded px-3 py-2 text-gray-900"
            placeholder="Enter amount"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 mb-2">Duration (in months)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border border-gray-900 rounded px-3 py-2 text-gray-900"
            placeholder="Enter duration"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setModalOpen(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 mt-20">
      {/* Influencer name displayed front and center */}
      <h1 className="text-7xl font-bold text-center mb-12">{formattedName}</h1>

      {/* Profile image */}
      <div className="flex justify-center mb-12">
        <img
          src={imageUrl}
          alt={`Profile image of ${formattedName}`}
          className="w-80 h-80 object-cover rounded-full"
        />
      </div>

      {/* Question and buttons */}
      <div className="text-center">
        <p className="text-2xl mb-6">Do you think that {formattedName} will...</p>
        <div className="flex justify-center space-x-8 mb-6">
          <button
            onClick={() => handleButtonClick("rise")}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white py-4 px-12 text-xl rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            rise
          </button>
          <button
            onClick={() => handleButtonClick("fall")}
            className="bg-gradient-to-r from-red-400 to-red-600 text-white py-4 px-12 text-xl rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            fall
          </button>
        </div>
        <p className="text-2xl">... in popularity this month.</p>
      </div>

      {/* Growth rate section */}
      <div className="text-center mt-12">
        <p className="text-xl">
          Average monthly growth rate to beat{" "}
          <span className="text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 text-transparent bg-clip-text animate-pulse">
            {growthRate}
          </span>
        </p>
      </div>

      {/* Render modal if open */}
      {modalOpen && <Modal />}

      {/* Display submission output including the user id */}
      {submissionData && (
        <div className="mt-8 text-center">
          <p>Influencer: {submissionData.influencer}</p>
          <p>Prediction: {submissionData.prediction}</p>
          <p>Amount: {submissionData.amount}</p>
          <p>Duration: {submissionData.duration}</p>
          <p>User ID: {submissionData.userId}</p>
        </div>
      )}
    </div>
  );
}
