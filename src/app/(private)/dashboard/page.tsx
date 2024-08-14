"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { LayoutContext } from "../../../layout/context/layoutcontext";

const Dashboard = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const [step, setStep] = useState(1);
  const plans = [
    {
      name: "Basic",
      price: 0,
      storage: "1GB",
      bandwidth: "10GB",
      websites: 1,
      support: "24/7",
    },
    {
      name: "Standard",
      price: 10,
      storage: "10GB",
      bandwidth: "100GB",
      websites: 10,
      support: "24/7",
    },
    {
      name: "Premium",
      price: 20,
      storage: "100GB",
      bandwidth: "1000GB",
      websites: 100,
      support: "24/7",
    },
  ];
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor =
      documentStyle.getPropertyValue("--text-color") || "#ffffff";
    const step = localStorage.getItem("step") || "0";
    setStep(parseInt(step));
  }, [step]);
  return (
    <div className="w-full px-8 py-2">
      {step === 0 ? (
        <div className="w-full">
          <p>Welcome to Blackbase dashboard</p>
          <h1>Choose your hosting plan</h1>
          <div className="flex gap-4 justify-between w-full  ">
            { plans.map((plan, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 w-1/4 rounded-lg"
              >
                <h2>{plan.name}</h2>
                <p>Price: ${plan.price}</p>
                <p>Storage: {plan.storage}</p>
                <p>Bandwidth: {plan.bandwidth}</p>
                <p>Websites: {plan.websites}</p>
                <p>Support: {plan.support}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    localStorage.setItem("step", "1");
                    localStorage.setItem("plan", index.toString());
                    setStep(1);
                  }}
                >
                  Select
                </button>
              </div>
            ))

            }
           

          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
