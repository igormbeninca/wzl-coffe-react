import React, { useState } from 'react';

import { connect } from "react-redux";
import { Actions as purchaseActions } from "../../redux/purchase";
import moment from 'moment';

import { EuiDatePicker, EuiDatePickerRange } from '@elastic/eui';

function DatePicker({fetchPurchases}) {

  const [startDate, setStartDate] = useState(moment("2021-01-01T00:00"));
  const [endDate, setEndDate] = useState(moment());
  React.useEffect(() => {
    fetchPurchases(startDate.format("YYYY-MM-DDT00:00:00.000000"),endDate.format("YYYY-MM-DDT23:59:00.000000") );
  }, [fetchPurchases,startDate, endDate]);
  return (
    <EuiDatePickerRange
      startDateControl={
        <EuiDatePicker
          selected={startDate}
          onChange={setStartDate}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="Start date"
          //showTimeSelect
        />
      }
      endDateControl={
        <EuiDatePicker
          selected={endDate}
          onChange={setEndDate}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="End date"
          //showTimeSelect
        />
      }
    />
  );
};

export default connect(
  (state) => ({

  }),
  {
    fetchPurchases: purchaseActions.fetchPurchases,
  }
)(DatePicker);