"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { LayoutContext } from "../../../layout/context/layoutcontext";

const Dashboard = () => {
  const { layoutConfig } = useContext(LayoutContext);
 
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor =
      documentStyle.getPropertyValue("--text-color") || "#ffffff";
    const step = localStorage.getItem("step") || "0";
  }, []);
  return (
    <div className="w-full px-8 py-2">
      
    </div>
  );
};

export default Dashboard;
