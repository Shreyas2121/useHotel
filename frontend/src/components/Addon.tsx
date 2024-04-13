import { useState, useCallback, useMemo, ChangeEvent } from "react";

import { Button, Form } from "react-bootstrap";
import { Addon } from "../types/types";

interface SelectedAddons {
  _id: string;
  price: number;
}

// interface Props {
//   addOns: Record<string, number>;
//   selectedAddons: SelectedAddons;
//   setSelectedAddons: React.Dispatch<React.SetStateAction<SelectedAddons>>;
// }

interface Props {
  addOns: Addon[];
  selectedAddons: SelectedAddons[];
  setSelectedAddons: React.Dispatch<React.SetStateAction<SelectedAddons[]>>;
}

const AddonSelection = ({
  addOns,
  selectedAddons,
  setSelectedAddons,
}: Props) => {
  const handleAddon = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.target;

      if (checked) {
        setSelectedAddons((prev) => [
          ...prev,
          {
            _id: value,
            price: addOns.find((addon) => addon._id === value)?.price,
          },
        ]);
      } else {
        setSelectedAddons((prev) =>
          prev.filter((addon) => addon._id !== value)
        );
      }
    },
    [selectedAddons]
  );

  return (
    <div id="addon-list">
      {addOns.map((addon) => (
        <Form.Group key={addon._id} style={{ display: "flex" }}>
          <Form.Check
            className="checkbox-Form.Control"
            id={addon._id}
            name={addon.name}
            value={addon._id}
            type="checkbox"
            onChange={handleAddon}
          />
          <div>
            <Form.Label className="checkbox" id="check-box">
              {addon.name} <br />{" "}
            </Form.Label>
            <p className="addon-price">₹{String(addon.price)}</p>
          </div>
        </Form.Group>
      ))}
    </div>
  );
};

export default AddonSelection;
