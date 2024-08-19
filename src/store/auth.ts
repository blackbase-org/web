// import { ConfirmationResult, signInWithPhoneNumber } from "firebase/auth"
import { useApi } from "./api";
import axios, { AxiosHeaders } from "axios";

// let confirmationResult: ConfirmationResult

export const useAuth = () => {
  const { $post, $get, setTokens } = useApi();


  const verifyAccount = async (credentials: any) => {
    // console.log(credentials)
    const data = await $post(
      "account/action/check_if_account_exists/",
      credentials,
      false
    );
    // console.log("data", data);
    return data;
  };

  const verifyPhoneNumber = async (phoneNumber: string, appVerifier: any) => {
    try {
      // confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      // console.log(confirmationResult)
      // return confirmationResult?.verificationId
    //   signInAnonymously(auth);
      const headers: AxiosHeaders = new AxiosHeaders();
      headers.setContentType("application/json");
      // headers.setAccept("*/*");
      const { data } = await axios.post(
        "https://blackbase.optico.dev/authentication/api/v1/account/send-otp",
        { credential: phoneNumber }
      );
      //   console.log(data.);
      return data;
    } catch (err: any) {
      window.alert(err.message);
      console.log(err.message);
      return;
    }
  };

  const verifyOtp = async (phoneNumber: string, otp: string) => {
    console.log("Otp", otp, phoneNumber);
    try {
      //   const res = await confirmationResult.confirm(otp);
      //   console.log(res);
      //   return res.user;
      const { data } = await axios.post(
        "https://blackbase.optico.dev/authentication/api/v1/account/confirm-otp",
        { credential: phoneNumber, otp }
      );
      console.log(data);
      return data?.verified;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const verifyEmail = async (username: string) => {
    try {
      const { data } = await $post("account/action/send_code_via_email/", { username }, false);
      return data;
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const verifyCode = async (credentials: {type: string, code: string}) => {
    try {
        const { type, code } = credentials
        console.log(credentials)
      const {data}  = await $post("account/action/validate_code_via_email/", { type, code }, true);
      console.log(data);
      return { success: data.res === "Success", message: data.message };
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const resetToken = async () => {};

  const setProfile = (profile: any) => {
    window.sessionStorage.setItem("nj_profile", JSON.stringify(profile));
  };

  const getProfile = () => {
    return JSON.parse(window.sessionStorage.getItem("nj_profile") as string);
  };

  const login = async (credentials: any) => {
    // console.log(credentials)
    const data = await $post("account/signin/", credentials, false);
    if (!data) return;
    const { res, message, ...profile} = data;
    if (res == "pending") {
      const res2 = await verifyEmail(credentials.username);
      console.log('verify mail response', res2);
      return { success: true, verified: false ,message };
    }
    if (profile && profile.username) {
      setProfile(profile);
      // setTokens(data.tokens.access, data.tokens.refresh);
      return { success: true, verified: true, message: "Login Successful" };
    }
   
    return { success: false, message };
  };

  const logout = async (account_type: any) => {
    const data = await $post("account/signout/", { account_type }, false);
    console.log(data);
    if (!data) return;
    if (data.res !== "Success") return;
    return true;
  };

  const register = async (credentials: any) => {
    console.log(credentials);
    const data = await $post("account/signup/", credentials, false);
    console.log(data);
    if (!data) return;
    if(data.res == "Success") {
      return verifyEmail(credentials.username);
    } ;
    // if (tokens) {
    //   console.log(tokens);
    //   setTokens(tokens.access, tokens.refresh);
    // }
  };



  const updatePassword = async (credentials: any) => {
    console.log('credentials' ,credentials)
    if (!credentials.username) credentials.username = "";
    const data = await $post("account/reset_password/", credentials, false);
    console.log(data);
    return { success: data.res === "Success" };
  };


  const changeUsername = async ({ username, password }: any) => {
    const data = await $post(
      "account/update_username/",
      { username, password },
      false
    );
    console.log(data);
    return { success: data.res === "Success", message: data.message };
  };

  const changePhone = async ({ phone, password }: any) => {
    const data = await $post(
      "account/update_phone/",
      { phone, password },
      false
    );
    console.log(data);
    return { success: data.res === "Success", message: data.message };
  };

  return {
    verifyPhoneNumber,
    verifyAccount,
    resetToken,
    verifyOtp,
    login,
    register,
    updatePassword,
    getProfile,
    logout,
    changePhone,
    verifyEmail,
    verifyCode,
  };
};
