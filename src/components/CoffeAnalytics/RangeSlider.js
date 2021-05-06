
import React, { useState, Fragment } from 'react';

import {
  EuiRange,
} from '@elastic/eui';

import { htmlIdGenerator } from '@elastic/eui/lib/services';

export const RangeSlider = () => {
  const [value, setValue] = useState('15');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
      <EuiRange
        id={htmlIdGenerator()()}
        max = {60}
        min = {15}
        value={value}
        onChange={onChange}
        showInput
        showRange
        showTicks
        tickInterval={15}
      />
  );
};