"use client";
import { useAuth } from "@/store/auth";
import { useOffer } from "@/store/offer";
import { useTransaction } from "@/store/transaction";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

function CheckoutForm() {
  const [value, setValue] = useState("");
  const [quantities] = useState([1, 1, 1]);
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [profile, setProfile] = useState();
  const [cart, setCart] = useState<any>(
    JSON.parse(localStorage.getItem("cart") as string)
  );
  const [methods] = useState<any[]>([
    { name: "PayPal", code: "PP" },
    { name: "NamDje", code: "NJ" },
  ]);
  const [transaction, setTransaction] = useState();

  const router = useRouter();
  const { getProfile } = useAuth();
  const {
    generateTransaction,
    verifyNamDjeTransaction,
    verifyPayPalTransaction,
  } = useTransaction();
  const { getOfferLimit, joinWaitlist } = useOffer();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getProfile();
    console.log(data);
    setProfile(data);
  };

  const checkPackageAvailibilty = async () => {
    const availibilty: any = await getOfferLimit({
      package: cart.name,
      sub_package: "combo",
    });
    return availibilty.success;
  };

  const onMakePayment = async () => {
    if (!selectedMethod) return;
    const isAvailable = await checkPackageAvailibilty();
    if (!isAvailable) {
      return onJoinWaitlist();
    }

    const res = await generateTransaction({
      package: cart.name,
      sub_package: "combo",
    });
    // Open payment tab
    if (res.success) {
      listeningPaymentStatus(res.data);
      window.open(res?.payment_url, "_blank");
    }
  };

  const onJoinWaitlist = async () => {
    const res = await joinWaitlist({
      package: cart.name,
      sub_package: "combo",
    });
    if (res.success) {
      router.push("/hosting/configs");
    }
  };

  const goBack = () => {
    router.push("/hosting/upgrade-plan");
  };

  const listeningPaymentStatus = async (transaction: any) => {
    if (selectedMethod?.code === "PP") {
      setInterval(async () => {
        const verified = await verifyPayPalTransaction(transaction._id);
        if (verified.success) router.push("/hosting/configs");
      }, 1000);
    } else if (selectedMethod?.code == "NJ") {
      setInterval(async () => {
        const verified = await verifyPayPalTransaction(transaction._id);
        if (verified.success) router.push("/hosting/configs");
      }, 1000);
    }
  };

  return (
    <div className="card">
      <div className="grid grid-nogutter">
        <ul className="flex list-none flex-wrap p-0 mb-6">
          <li className="flex align-items-center text-primary mr-2">
            Hosting <i className="pi pi-chevron-right text-500 text-xs ml-2"></i>
          </li>
          <li className="flex align-items-center text-500 mr-2">
            Upgrade-plan
            <i className="pi pi-chevron-right text-500 text-xs ml-2"></i>
          </li>
          {/* <li className="flex align-items-center text-500 mr-2">
            Shipping
            <i className="pi pi-chevron-right text-500 text-xs ml-2"></i>
          </li> */}
          <li className="flex align-items-center text-500 mr-2">Payment</li>
        </ul>
        <div className="col-12 px-4 mt-4 md:mt-6 md:px-6">
          <span className="text-900 block font-bold text-xl">Checkout</span>
        </div>

        <div className="col-12 lg:col-12 px-4 py-4 md:px-6">
          <div className="pb-3 surface-border">
            <span className="text-900 font-medium text-xl">Your Cart</span>
          </div>
          <div className="flex flex-column lg:flex-row flex-wrap lg:align-items-center  py-2 mt-3 surface-border">
            {/* <img
              src="/demo/images/ecommerce/shop/shop-1.png"
              className="w-8rem h-8rem flex-shrink-0 mb-3"
              alt="product"
            /> */}
            <div className="flex-auto lg:ml-3">
              <div className="flex align-items-center justify-content-between mb-3">
                <span className="text-900 font-bold">Hosting {cart?.name}</span>
                <span className="text-900 font-bold">${cart.price}</span>
              </div>
              <div className="text-600 text-sm mb-3">
                Websites: {cart?.websites}
              </div>
              {/* <div className="flex flex-auto justify-content-between align-items-center">
                <InputNumber
                  showButtons
                  buttonLayout="horizontal"
                  min={0}
                  inputClassName="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                  value={quantities[0]}
                  className="border-1 surface-border border-round"
                  decrementButtonClassName="p-button-text text-600 hover:text-primary py-1 px-1"
                  incrementButtonClassName="p-button-text text-600 hover:text-primary py-1 px-1"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                ></InputNumber>
                <Button icon="pi pi-trash" text rounded></Button>
              </div> */}
            </div>
          </div>
          {/* <div className="py-2 mt-3 surface-border">
            <div className="p-inputgroup mb-3">
              <InputText
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Promo code"
                className="w-full"
              />
              <Button type="button" label="Apply" disabled={!value}></Button>
            </div>
          </div> */}
          <div className="py-2 mt-3">
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-900 font-medium">Subtotal</span>
              <span className="text-900">${cart?.price}</span>
            </div>
            {/* <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-900 font-medium">Shipping</span>
              <span className="text-primary font-bold">Free</span>
            </div> */}
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-900 font-bold">Total</span>
              <span className="text-900 font-medium text-xl">
                ${cart.price}
              </span>
            </div>
          </div>
          {/* <div className="py-2 mt-3 bg-yellow-100 flex align-items-center justify-content-center border-round">
            <img
              src="/demo/images/ecommerce/shop/flag.png"
              className="mr-2"
              alt="Country Flag"
            />
            <span className="text-black-alpha-90 font-medium">
              No additional duties or taxes.
            </span>
          </div> */}
          <div className="flex justify-content-between align-items-center mb-3">
            <span className="text-900 font-bold">Pay with</span>
            <Dropdown
              options={methods}
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.value)}
              placeholder="Choose payment method"
              optionLabel="name"
              showClear
              className="w-full"
            ></Dropdown>
          </div>
        </div>
        <div className="col-12 flex flex-column lg:flex-row justify-content-center align-items-center lg:justify-content-center my-6">
          <Button
            onClick={goBack}
            className="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4"
            severity="secondary"
            outlined
            label="Return"
            icon="pi pi-fw pi-arrow-left"
          ></Button>
          <Button
            onClick={onMakePayment}
            className="w-full lg:w-auto flex-order-1 lg:flex-order-2"
            label="Make payment"
            icon="pi pi-fw pi-check"
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
