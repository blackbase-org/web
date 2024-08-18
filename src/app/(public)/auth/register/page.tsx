"use client";

import React, { useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { Checkbox } from "primereact/checkbox";
import { Page } from "../../../../types/layout";
import { classNames } from "primereact/utils";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import { useAuth } from "@/store/auth";

const Register: Page = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [referer_id, setReferer] = useState("");
  const [step, setStep] = useState(1);

  const { layoutConfig } = useContext(LayoutContext);
  const router = useRouter();
  const { register, verifyEmail } = useAuth();
  //   const taost = useToast();

  const goToLogin = () => {
    router.push("/auth/login");
  };

  const onSignUp = async () => {
    console.log("Sign Up");

    // call api to register
    const res = await register({
      first_name,
      last_name,
      username,
      password,
      phone,
      email,
      birth,
      referer_id,
    });

    console.log("register", res);
    // if register is successful, navigate to dashboard
    if (res) {
      verifyEmail(username);
      router.push("/auth/verification");
    }
    //    else
  };

  const checkUsername = (e: any) => {
    console.log(e.target.value);
    setUsername(e.target.value);

    if (e.target.value.length < 4)
      return setUsernameError("Username must be at least 4 characters");
    // call api to check username

    // if username is already taken, show error message
    setUsernameError("Username is already taken");
  };

  const checkPassword = (e: any) => {
    console.log(e.target.value);
    setPassword(e.target.value);

    if (e.target.value.length < 8)
      return setPasswordError("Password must be at least 8 characters");
    // call api to check password

    // if password is weak, show error message
    setPasswordError("Password is weak");
  };

  const confirmPassword = (e: any) => {
    console.log(e.target.value);
    // compare password and confirm password
    // if not equal, show error message
    const confirmPassword = e.target.value;
    if (confirmPassword !== password)
      return setConfirmPasswordError("Password does not match");
    setConfirmPasswordError("");
  };

  const checkReferer = (e: any) => {
    console.log(e.target.value);
    setReferer(e.target.value);
    // Api call
    // if referer is not found, show error message
    setUsernameError("Referer not found");
  };

  const prevStep = () => {
    if (step === 1) goToLogin();
    setStep(step - 1);
  }
  const nextStep = () => {
    if (step === 3) onSignUp();
    setStep(step + 1);
  }

  return (
    <>
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
            src={`/layout/images/pages/register-${
              layoutConfig.colorScheme === "dark" ? "ondark" : "onlight"
            }.png`}
            alt="atlantis"
            className="h-screen w-full"
          />
        </div>
        <div className="w-full" style={{ background: "var(--surface-ground)" }}>
          <div
            className={classNames(
              "p-fluid",
              "min-h-screen",
              "bg-auto",
              "md:bg-contain",
              "bg-no-repeat",
              "text-center",
              "w-full",
              "flex",
              "align-items-center",
              "md:align-items-start",
              "justify-content-center",
              "flex-column",
              "bg-auto",
              "md:bg-contain",
              "bg-no-repeat"
            )}
            style={{
              padding: "10% 10% 10% 10%",
              background: "var(--exception-pages-image)",
            }}
          >
            <div className="flex flex-column">
              <div className="flex align-items-center mb-6 logo-container">
                {/* <img src={`/layout/images/logo/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-logo" style={{ width: '45px' }} alt="logo" /> */}
                {/* <img src={`/layout/images/logo/appname-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="login-appname ml-3" style={{ width: '100px' }} alt="appname" /> */}
                <h3>BlackBase</h3>
              </div>
              <div
                className="form-container text-left"
                style={{ maxWidth: "320px", minWidth: "270px" }}
              >
                <h4 className="m-0 mb-2">Register</h4>

                {step === 1 && (
                  <div>
                    <span className="block text-600 font-medium mb-4">
                      Let&lsquo;s get started
                    </span>
                    <span className="p-input-icon-left">
                      <i className="pi pi-user"></i>
                      <InputText
                        type="text"
                        autoComplete="off"
                        placeholder="firstname"
                        className="block mb-3"
                        style={{ maxWidth: "320px", minWidth: "270px" }}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </span>
                    <span className="p-input-icon-left">
                      <i className="pi pi-user"></i>
                      <InputText
                        type="text"
                        autoComplete="off"
                        placeholder="lastname"
                        className="block mb-3"
                        style={{ maxWidth: "320px", minWidth: "270px" }}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </span>
                    <span className="p-input-icon-left">
                      <i className="pi pi-calendar"></i>
                      <InputText
                        type="date"
                        autoComplete="off"
                        placeholder="birth"
                        className="block mb-3"
                        style={{ maxWidth: "320px", minWidth: "270px" }}
                        onChange={(e) => setBirth(e.target.value)}
                      />
                    </span>
                    <div className="space-y-1">
                      <span className="p-input-icon-left">
                        <i className="pi pi-user"></i>
                        <InputText
                          type="text"
                          autoComplete="off"
                          placeholder="username"
                          className="block mb-3"
                          style={{ maxWidth: "320px", minWidth: "270px" }}
                          onChange={checkUsername}
                        />
                      </span>
                      {usernameError && (
                        <div className="mb-2">
                          <small className="text-red-500 ">
                            {usernameError}
                          </small>
                        </div>
                      )}
                    </div>

                    <span className="p-input-icon-left">
                      <i className="pi pi-phone"></i>
                      <InputText
                        type="tel"
                        autoComplete="off"
                        placeholder="phone"
                        className="block mb-3"
                        style={{ maxWidth: "320px", minWidth: "270px" }}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </span>
                  </div>
                )}

                {step === 2 && (
                  <div>
                     <span className="block text-600 font-medium mb-4">
                      Add your credentials
                    </span>
                    <span className="p-input-icon-left">
                      <i className="pi pi-envelope"></i>
                      <InputText
                        type="email"
                        autoComplete="off"
                        placeholder="email"
                        className="block mb-3"
                        style={{ maxWidth: "320px", minWidth: "270px" }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </span>
                    <div>
                      <span className="p-input-icon-left">
                        <i className="pi pi-key"></i>
                        <InputText
                          type="password"
                          autoComplete="off"
                          placeholder="Password"
                          className="block mb-3"
                          style={{ maxWidth: "320px", minWidth: "270px" }}
                          onChange={checkPassword}
                        />
                      </span>
                      {passwordError && (
                        <div className="mb-2">
                          <small className="text-red-500 ">
                            {passwordError}
                          </small>
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="p-input-icon-left">
                        <i className="pi pi-key"></i>
                        <InputText
                          type="password"
                          autoComplete="off"
                          placeholder="Confirm Password"
                          className="block mb-3"
                          style={{ maxWidth: "320px", minWidth: "270px" }}
                          onChange={confirmPassword}
                        />
                      </span>
                      {confirmPasswordError && (
                        <div className="mb-2">
                          <small className="text-red-500 ">
                            {confirmPasswordError}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                     <span className="block text-600 font-medium mb-4">
                      Add your referer
                    </span>
                     <span className="p-input-icon-left">
                  <i className="pi pi-user"></i>
                  <InputText
                    type="text"
                    autoComplete="off"
                    placeholder="Referer"
                    className="block mb-3"
                    style={{ maxWidth: "320px", minWidth: "270px" }}
                    onChange={checkReferer}
                  />
                </span>
                <div className="mt-2 flex flex-wrap">
                  <Checkbox
                    type="checkbox"
                    id="confirmed"
                    checked={confirmed}
                    onChange={() => setConfirmed(!confirmed)}
                    className="mr-2"
                  />{" "}
                  <label
                    htmlFor="confirmed"
                    className="text-900 font-medium mr-2"
                  >
                    I have read the
                  </label>
                  <a className="text-600 cursor-pointer hover:text-primary cursor-pointer">
                    Terms and Conditions
                  </a>
                  </div>
    )}
                </div>
                )}
              </div>
              <div
                className="button-container mt-4 text-left"
                style={{ maxWidth: "320px", minWidth: "270px" }}
              >
                <div className="buttons flex align-items-center gap-3">
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="block p-button-danger p-button-outlined"
                    style={{ maxWidth: "320px", marginBottom: "32px" }}
                  >
                   {step === 1 ? "Cancel" : "Back"}
                  </Button>
                  <Button
                    type="button"
                    className="block"
                    style={{ maxWidth: "320px", marginBottom: "32px" }}
                    onClick={nextStep}
                  >
                    {step === 3 ? "Sign Up" : "Next"}
                  </Button>
                </div>
                <span className="font-medium text-600">
                  Already have an account?{" "}
                  <a className="font-semibold cursor-pointer text-900 hover:text-primary transition-colors transition-duration-300">
                    Login
                  </a>
                </span>
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
    </>
  );
};

export default Register;
