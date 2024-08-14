import { useApi } from "./api";

export const useOffer = () => {
  const { $get, $post } = useApi();
  const getOffers = async () => {
    try {
      const { data } = await $get("offers/");
      return data;
    } catch (err: any) {
      return err?.response;
    }
  };

  const getOfferLimit = async () => {
    try {
      const { data } = await $get("offers/limit/");
      return data;
    } catch (err: any) {
      return err?.response;
    }
  };

  const joinWaitlist = async (email: string) => {
    try {
      const { data } = await $post("offers/waitlist/", { email });
      return data;
    } catch (err: any) {
      return err?.response;
    }
  };

  const getUserWaitingListInfos = async () => {
    try {
      const { data } = await $get("offers/waitlist/");
      return data;
    } catch (err: any) {
      return err?.response;
    }
  }

  return {
    getOffers,
    getOfferLimit,
    joinWaitlist,
  };
};
