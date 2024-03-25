import Navbar from "@/Components/Invoice/Navbar";
import Create from "@/Components/Invoice/create/Create";
import Title from "@/Components/Title";
import { useInvoiceStore } from "@/stores/invoice";
import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Edit() {
  const { props } = usePage();
  const { invoice, customer, vehicle, current_services, current_payments } =
    props as any;
  const {
    setInvoiceId,
    setAdditional,
    setPayments,
    setSendMail,
    setCustomer,
    setIssueDate,
    setPricing,
    setServices,
    setStatus,
    setVehicle,
  } = useInvoiceStore();

  useEffect(() => {
    setInvoiceId(invoice.invoice_id);
    setCustomer(customer);
    setVehicle(vehicle);
    setServices(current_services);
    setPayments(current_payments);
    setIssueDate(invoice.issue_date);
    setPricing({
      deposit: invoice.deposit,
      discount: invoice.discount,
      due: invoice.due,
      grand_total: invoice.grand_total,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
    });
    setStatus(invoice.status);
    setSendMail(invoice.send_mail);
    setAdditional({
      notes: invoice.notes,
      terms: invoice.terms,
      policy: invoice.policy,
    });
  }, []);

  return (
    <div>
      <Title>Edit Invoice</Title>

      <Navbar />
      <Create />
    </div>
  );
}
