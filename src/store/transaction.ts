import { useApi } from "./api";

export const useTransaction = () => {
    const { $get, $post } = useApi();

    const generateTransaction = async (transaction: any) => {
        try {
            const { data } = await $post("transactions/", transaction);
            return data;
        } catch (err: any) {
            return err?.response;
        }
    }

    const getTransactions = async () => {
        try {
            const { data } = await $get("transactions/");
            return data;
        } catch (err: any) {
            return err?.response;
        }
    }

    const verifyPayPalTransaction = async (transactionId: string) => {
        try {
            const { data } = await $get(`transactions/verify-paypal/${transactionId}`);
            return data;
        } catch (err: any) {
            return err?.response;
        }
    }

    const verifyNamDjeTransaction = async (transactionId: string) => {
        try {
            const { data } = await $get(`transactions/verify-namdje/${transactionId}`);
            return data;
        } catch (err: any) {
            return err?.response;
        }
    }

    return {
        generateTransaction,
        getTransactions,
        verifyPayPalTransaction,
        verifyNamDjeTransaction
    };

};