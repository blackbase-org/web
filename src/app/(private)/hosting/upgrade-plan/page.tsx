"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import { Button } from "primereact/button";
import { ColorScheme } from "@/types";
import { PrimeReactContext } from "primereact/api";
import { useRouter } from "next/navigation";

const ChoosePlan = () => {
  const { layoutConfig, setLayoutConfig } = useContext(LayoutContext);
  const { changeTheme } = useContext(PrimeReactContext);
  const router = useRouter();
  const [step, setStep] = useState(0);
  const plans = [
    {
      name: "Basic",
      price: 1,
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

  const changeColorScheme = (colorScheme: ColorScheme) => {
    changeTheme?.(layoutConfig.colorScheme, colorScheme, "theme-link", () => {
      setLayoutConfig((prevState) => ({
        ...prevState,
        colorScheme,
        menuTheme: layoutConfig.colorScheme === "dark" ? "dark" : "light",
      }));
    });
  };

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor =
      documentStyle.getPropertyValue("--text-color") || "#ffffff";
    // const step = localStorage.getItem("step") || "0";
    // setStep(parseInt(step));
    changeColorScheme("dark");
    setLayoutConfig((prevState) => ({
      ...prevState,
      menuTheme: "dark",
    }));
  }, [step]);

  const choosePlan = (index: number) => {
    localStorage.setItem("cart", JSON.stringify(plans[index]));
    router.push("/checkout");
  };

  return (
    <div className="w-full px-8 py-2 ">
      {step === 0 ? (
        <div className=" px-4 py-8 md:px-6 lg:px-8">
          <div className="text-900 font-bold text-6xl mb-4 text-center">
            Pricing Plans
          </div>
          <div className="text-700 text-xl mb-6 text-center line-height-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
            numquam eligendi quos.
          </div>

          <div className="grid">
            {plans.map((plan, index) => (
              <div className="col-12 lg:col-4" key={index}>
                <div className="p-3 h-full">
                  <div className="shadow-2 p-3 h-full flex flex-column surface-card rounded-md">
                    <div className="text-900 font-bold text-xl mb-2">
                      {plan.name}
                    </div>
                    <div className="text-600">Plan description</div>
                    <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                    <div className="flex align-items-center">
                      <span className="font-bold text-2xl text-900">
                        ${plan.price}
                      </span>
                      <span className="ml-2 font-bold text-600">per month</span>
                    </div>
                    <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
                    <ul className="list-none p-0 m-0 flex-grow-1">
                      <li className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <span>{plan.storage} Storage</span>
                      </li>
                      <li className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <span>{plan.bandwidth} Bandwidth</span>
                      </li>
                      <li className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <span>{plan.websites} Websites</span>
                      </li>
                      <li className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <span>{plan.support} Support</span>
                      </li>
                    </ul>

                    <hr className="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                    <Button
                      onClick={() => choosePlan(index)}
                      label="Buy Now"
                      className="p-3 w-full mt-auto"
                    ></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChoosePlan;
