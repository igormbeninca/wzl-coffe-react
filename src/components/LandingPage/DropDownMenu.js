import React, { useState } from "react";

import { EuiComboBox } from "@elastic/eui";

export const DropDownMenu = () => {
  const options = [
    {
      label: "X"
    },
    {
      label: "Y"
    },
    {
      label: "Z"
    }
  ];
  const [selectedOptions, setSelected] = useState([options[2]]);

  const onChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelected(selectedOptions);
  };

  return (
    <EuiComboBox
      placeholder="Select a signal"
      singleSelection={{ asPlainText: true }}
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};
