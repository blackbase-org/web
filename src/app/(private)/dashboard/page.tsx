"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { LayoutContext } from "../../../layout/context/layoutcontext";

const Dashboard = () => {
  const { layoutConfig } = useContext(LayoutContext);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor =
      documentStyle.getPropertyValue("--text-color") || "#ffffff";
  });
  return <div></div>;
};

export default Dashboard;
