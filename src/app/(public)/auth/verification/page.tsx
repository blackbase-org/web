"use client";

import React, { useState, useContext } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import type { Page } from "@/types";
import { InputNumber } from "primereact/inputnumber";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import { classNames } from "primereact/utils";
import { useAuth } from "@/store/auth";
import { InputText } from "primereact/inputtext";

const Verification: Page = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const router = useRouter();
  const { verifyCode } = useAuth();

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [verify, setVerify] = useState(false);

  const goHome = () => {
    router.push("/dashboard");
  };

  const onVerifyCode = async () => {
    const code = `${value1}${value2}${value3}${value4}`;
    console.log("verify code", code);
    // call api to verify code
    const verified = await verifyCode({ type: "signup", code });
    // if code is verified, navigate to dashboard
    if (verified) router.push("/dashboard");
    // else
  };

  const focus = (event: any) => {
    const regexNum = /^\d+$/;
    const isValid = regexNum.test(event.key);
    const nextElementInputRef =
      event.currentTarget.nextElementSibling?.children[0];

    if (isValid && nextElementInputRef) {
      nextElementInputRef.focus();
    }
  };

  return (
    <div
      className={classNames("login-body", "flex", "min-h-screen", {
        "layout-light": layoutConfig.colorScheme === "light",
        "layout-dark": layoutConfig.colorScheme === "dark",
      })}
    >
      <div
        className="login-image w-6 h-screen hidden md:block"
        style={{ maxWidth: "490px" }}
      >
        <img
          src={`/layout/images/pages/verification-${
            layoutConfig.colorScheme === "dark" ? "ondark" : "onlight"
          }.png`}
          alt="atlantis"
          className="h-screen w-full"
        />
      </div>
      <div className="w-full" style={{ background: "var(--surface-ground)" }}>
        <div
          className="p-fluid min-h-screen bg-auto md:bg-contain bg-no-repeat text-center w-full flex align-items-center md:align-items-start justify-content-center flex-column bg-auto md:bg-contain bg-no-repeat"
          style={{
            padding: "20% 10% 20% 10%",
            background: "var(--exception-pages-image)",
          }}
        >
          <div className="flex flex-column">
            <div className="flex align-items-center mb-6 logo-container">
              <div className="flex align-items-center mb-6 logo-container">
                <h3>BlackBase</h3>
              </div>
              <div
                className="form-container text-left"
                style={{ maxWidth: "320px", minWidth: "270px" }}
              >
                <h4 className="text-900 font-bold mb-2">Verification</h4>
                <span className="text-600 font-medium">
                  We have sent code to your email:
                </span>
                <div className="flex align-items-center mt-1 mb-4">
                  <i className="pi pi-envelope text-600"></i>
                  <span className="text-900 font-bold ml-2">
                    dm**@gmail.com
                  </span>
                </div>
                <div className="flex justify-content-between w-full align-items-center gap-3">
                  <InputText
                    id="val1"
                    onChange={(e) => setValue1(e.target.value)}
                    className="w-3rem text-center"
                    maxLength={1}
                    onKeyUp={focus}
                  />
                  <InputText
                    id="val2"
                    onChange={(e) => setValue2(e.target.value)}
                    className="w-3rem text-center"
                    maxLength={1}
                    onKeyUp={focus}
                  />
                  <InputText
                    id="val3"
                    onChange={(e) => setValue3(e.target.value)}
                    className="w-3rem text-center"
                    maxLength={1}
                    onKeyUp={focus}
                  />
                  <InputText
                    id="val4"
                    onChange={(e) => setValue4(e.target.value)}
                    className="w-3rem text-center"
                    maxLength={1}
                  />
                </div>
              </div>
            </div>
            <div
              className="button-container mt-4 text-left"
              style={{ maxWidth: "320px", minWidth: "270px" }}
            >
              <div className="buttons flex align-items-center gap-3">
                <Button
                  onClick={goHome}
                  className="block p-button-danger p-button-outlined"
                  style={{ maxWidth: "320px", marginBottom: "32px" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={onVerifyCode}
                  className="block"
                  style={{ maxWidth: "320px", marginBottom: "32px" }}
                  disabled={!value1 || !value2 || !value3 || !value4}
                >
                  Verify
                </Button>
              </div>
            </div>
          </div>
          <div
            className="login-footer flex align-items-center absolute"
            style={{ bottom: "75px" }}
          >
            <div className="flex align-items-center login-footer-logo-container pr-4 mr-4 border-right-1 surface-border">
              <h5>BlackBase</h5>
            </div>
            <span className="text-sm text-color-secondary mr-3">
              Copyright 2024
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
