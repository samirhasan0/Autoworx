import { useInvoiceStore } from "@/stores/invoice";
import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function AdditionalInfo() {
  const { additional, setAdditional } = useInvoiceStore();
  const { props } = usePage();
  const { terms, notes, policy } = props as any;

  useEffect(() => {
    setAdditional({
      notes: notes,
      terms: terms,
      policy: policy,
    });
  }, [notes, terms, policy]);

  return (
    <>
      {/* Add Notes */}
      <textarea
        name="notes"
        id="notes"
        className="w-[25%] resize-none h-24 p-1 px-2 invoice-inner-shadow border-none text-black"
        placeholder="Add Notes"
        value={additional.notes}
        onChange={(e) =>
          setAdditional({ ...additional, notes: e.target.value })
        }
      ></textarea>

      {/* Terms & Conditions */}
      <textarea
        name="terms"
        id="terms"
        className="w-[25%] resize-none h-24 p-1 px-2 invoice-inner-shadow border-none text-black"
        placeholder="Terms & Conditions"
        value={additional.terms}
        onChange={(e) =>
          setAdditional({ ...additional, terms: e.target.value })
        }
      ></textarea>

      {/* Policy & Conditions*/}
      <textarea
        name="policy"
        id="policy"
        className="w-[25%] resize-none h-24 p-1 px-2 invoice-inner-shadow border-none text-black"
        placeholder="Policy & Conditions"
        value={additional.policy}
        onChange={(e) =>
          setAdditional({ ...additional, policy: e.target.value })
        }
      ></textarea>
    </>
  );
}
