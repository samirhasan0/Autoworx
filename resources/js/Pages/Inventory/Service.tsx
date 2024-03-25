import Header from "@/Components/Service/Header";
import ServiceList from "@/Components/Service/ServiceList";
import { usePopupStore } from "@/stores/popup";
import { ServiceType } from "@/types/invoice";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function Service() {
  return (
    <div>
      <Header />

      <ServiceList />
    </div>
  );
}
