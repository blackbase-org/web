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

  const getOfferLimit = async (params: {package: string, sub_package: string}) => {
    try {
      const { data } = await $get(`/package_limit/action/?package=${params.package}&sub_package=${params.sub_package}`);
      return data;
    } catch (err: any) {
      return err?.response;
    }
  };

  const joinWaitlist = async (params: {package: string, sub_package: string}) => {
    try {
      const { data } = await $post("/waitlist/", params);
      return data;
    } catch (err: any) {
      return err?.response;
    }
  };

  const getUserWaitingListInfos = async () => {
    try {
      const { data } = await $get("/waitlist/");
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
