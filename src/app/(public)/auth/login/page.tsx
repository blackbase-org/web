"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Page } from "../../../../types/layout";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import { classNames } from "primereact/utils";
import { useAuth } from "@/store/auth";

const Login: Page = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const router = useRouter();
  const [verified, setVerified] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { verifyAccount, login } = useAuth();
  const goToForgotPassword = () => {
    router.push("/auth/forgotpassword");
  };

  const verifyUsername = async () => {
    // call api to verify username
    const verified = await verifyAccount({username});
    // console.log("verify username", verified);
    // const verified = false;
    // if username is verified, setVerified to true
    setVerified(verified);
    if (!verified) {
      router.push("/auth/register");
    }
  };

  const onLogin = async () => {
    console.log("login", username, password);
    // call api to login
    const res = await login({ username, password });
    // if login is successful, navigate to dashboard
    setMessage(res?.message);
    if (res?.success && res?.verified) {
      router.push("/dashboard");
    } else if (res?.success && !res?.verified) {
      router.push("/auth/verification");
    }
    // else 
  };

  return (
    <React.Fragment>
      <div
        className={classNames("login-body", "flex", "min-h-screen", {
          "layout-light": layoutConfig.colorScheme === "light",
          "layout-dark": layoutConfig.colorScheme === "dark",
        })}
      >
        {" "}
        <div
          className="login-image w-6 hidden h-screen md:block"
          style={{ maxWidth: "490px" }}
        >
          <img
            src={`/layout/images/pages/login-${
              layoutConfig.colorScheme === "dark" ? "ondark" : "onlight"
            }.png`}
            alt="atlantis"
            className="h-screen w-full"
          />
        </div>
        <div
          className="login-panel w-full"
          style={{ background: "var(--surface-ground)" }}
        >
          <div
            className="p-fluid min-h-screen bg-auto md:bg-contain bg-no-repeat text-center w-full flex align-items-center md:align-items-start justify-content-center flex-column bg-auto md:bg-contain bg-no-repeat"
            style={{
              padding: "20% 10% 20% 10%",
              background: "var(--exception-pages-image)",
            }}
          >
            <div className="flex flex-column">
              <div className="flex  align-items-center mb-6 logo-container">
                {/* <img
                  src={`/layout/images/logo/logo-${
                    layoutConfig.colorScheme === "light" ? "dark" : "light"
                  }.png`}
                  className="login-logo"
                  style={{ width: "45px" }}
                  alt="logo"
                /> */}
                <h3>BlackBase</h3>
              </div>
              <div className="form-container">
                <span className="p-input-icon-left">
                  <i className="pi pi-user"></i>
                  <InputText
                    type="text"
                    placeholder="Username, email or phone"
                    className="block mb-3"
                    style={{ maxWidth: "320px", minWidth: "270px" }}
                    readOnly={verified}
                    onChange={(e) => setUsername(e.target.value)}
                    onClick={() => setVerified(false)}
                  />
                </span>
                {verified && (
                  <>
                    <span className="p-input-icon-left">
                      <i className="pi pi-key"></i>
                      <InputText
                        type="password"
                        placeholder="Password"
                        className="block mb-3"
                        style={{ maxWidth: "320px", minWidth: "270px" }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </span>
                    <a
                      onClick={goToForgotPassword}
                      className="flex text-color-secondary mb-4 text-sm"
                    >
                      Forgot your password?
                    </a>
                  </>
                )}
              </div>
              <div className="button-container">
                {verified ? (
                  <Button
                    type="button"
                    onClick={onLogin}
                    className="block"
                    style={{ maxWidth: "320px", marginBottom: "32px" }}
                    disabled={!username || !password}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={verifyUsername}
                    className="block"
                    style={{ maxWidth: "320px", marginBottom: "32px" }}
                    disabled={!username}
                  >
                    Verify
                  </Button>
                )}
                {/* <span className="flex text-sm text-color-secondary">
                  Don’t have an account?
                  <a className="cursor-pointer ml-1">Sign-up here</a>
                </span> */}
              </div>
            </div>

            <div
              className="login-footer flex align-items-center absolute"
              style={{ bottom: "75px" }}
            >
              <div className="flex align-items-center login-footer-logo-container pr-4 mr-4 border-right-1 surface-border">
                {/* <img
                  src="/layout/images/logo/logo-gray.png"
                  className="login-footer-logo"
                  style={{ width: "22px" }}
                  alt="logo"
                />
                <img
                  src="/layout/images/logo/appname-gray.png"
                  className="login-footer-appname ml-2"
                  style={{ width: "45px" }}
                  alt="appname"
                /> */}
                BlackBase
              </div>
              <span className="text-sm text-color-secondary mr-3">
                Copyright 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
