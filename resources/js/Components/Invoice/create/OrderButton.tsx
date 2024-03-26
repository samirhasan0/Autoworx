import { useInvoiceStore } from "@/stores/invoice";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function OrderButton() {
  const lastPath = window.location.pathname.split("/").pop();
  const { props } = usePage();
  const { auth } = props as any;
  const {
    invoiceId,
    customer,
    vehicle,
    services,
    pricing,
    additional,
    status,
    sendMail,
    issueDate,
    payments,
    photo,
  } = useInvoiceStore();
  const { data, setData, post, put } = useForm({
    invoiceId,
    customer_name: customer.name,
    customer_email: customer.email,
    customer_mobile: customer.mobile,
    customer_address: customer.address,
    customer_city: customer.city,
    customer_state: customer.state,
    customer_zip: customer.zip,

    vehicle_make: vehicle.make,
    vehicle_model: vehicle.model,
    vehicle_year: vehicle.year,
    vehicle_vin: vehicle.vin,
    vehicle_license: vehicle.license,

    pricing_subtotal: pricing.subtotal,
    pricing_discount: pricing.discount,
    pricing_tax: pricing.tax,
    pricing_grand_total: pricing.grand_total,
    pricing_deposit: pricing.deposit,
    pricing_due: pricing.due,

    additional_notes: additional.notes,
    additional_terms: additional.terms,
    additional_policy: additional.policy,

    services,
    status,
    sendMail,
    payments,

    issue_date: issueDate,
    salesperson: auth.user.name,

    photo,
  });

  useEffect(() => {
    setData({
      invoiceId,

      customer_name: customer.name,
      customer_email: customer.email,
      customer_mobile: customer.mobile,
      customer_address: customer.address,
      customer_city: customer.city,
      customer_state: customer.state,
      customer_zip: customer.zip,

      vehicle_make: vehicle.make,
      vehicle_model: vehicle.model,
      vehicle_year: vehicle.year,
      vehicle_vin: vehicle.vin,
      vehicle_license: vehicle.license,

      pricing_subtotal: pricing.subtotal,
      pricing_discount: pricing.discount,
      pricing_tax: pricing.tax,
      pricing_grand_total: pricing.grand_total,
      pricing_deposit: pricing.deposit, // TODO: Fix spelling `deposit` -> `deposit`
      pricing_due: pricing.due,

      additional_notes: additional.notes,
      additional_terms: additional.terms,
      additional_policy: additional.policy,

      services,
      status,
      sendMail,
      payments,

      issue_date: issueDate,
      salesperson: auth.user.name,

      photo,
    });
  }, [
    invoiceId,
    customer,
    vehicle,
    services,
    pricing,
    additional,
    status,
    sendMail,
    payments,
    photo,
  ]);

  const handleSubmit = async () => {
    if (lastPath === "create") {
      post(route("invoice.store"));
    } else if (lastPath === "edit") {
      put(route("invoice.update", invoiceId));
    } else if (lastPath === "estimate") {
      post(route("estimate"), {
        onSuccess: () => {
          window.location.href = `/invoice/download/${data.invoiceId}`;
        },
      });
    } else {
      console.error("Invalid route");
    }
  };

  return (
    <button
      className="bg-[#03A7A2] text-white w-full h-9 rounded-md mt-2 app-shadow"
      onClick={handleSubmit}
    >
      {lastPath === "edit" ? "Update" : "Create"} Invoice
    </button>
  );
}
