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
    console.log("data", data);
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
    console.log('upload document data', data);
    if (!data) return;
    if (data.res == "Success") {
      const {
        pic,
        username,
        name,
        qr_image,
        cash,
        number,
        card_status,
        card_qr,
        notifications_count,
        bonus,
        required_document,
        required_documents_status,
        title,
        res,
      } = data;
      if (res.toLowerCase() === "Success".toLowerCase()) {
        // setTokens(tokens.access, tokens.refresh)
        setProfile({
          username,
          name,
          avatar: pic
            ? pic.includes("//")
              ? pic
              : "http://127.0.0.1:8000" + pic
            : null,
          qr_image,
          cash,
          number,
          card_status,
          card_qr,
          notifications_count,
          bonus,
          required_document,
          required_documents_status,
          title
        });
      }
    }
    return {
      isAuth: data.res === "Success",
      message: data.message,
      remaining_trials: data.remaining_trials,
    };
  };

  const logout = async (account_type: any) => {
    const data = await $post("account/signout/", { account_type }, false);
    console.log(data);
    if (!data) return;
    if (data.res !== "Success") return;
    return true;
  };

  const register = async (credentials: any) => {
    const data = await $post("account/signup/", credentials, false);
    console.log(data);
    if (!data) return;
    if (data.res !== "Success") return;
    const { tokens, required_document, required_documents_status } = data;
    if (tokens) {
      console.log(tokens);
      setTokens(tokens.access, tokens.refresh);
    }
    return { required_document, required_documents_status };
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
  };
};
