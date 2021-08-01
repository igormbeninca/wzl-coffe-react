import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { Actions as purchaseActions } from "../../redux/purchase";
import moment from 'moment';
import PurchaseCharts from "./PurchaseCharts";
import {formatTimeReduce} from "../../utils/timeFormating"
import {NotFoundPage, PurchaseTable} from "../../components"
import PurchaseStatistics from '../Admin/Purchase/PurchaseStatistics';
// https://stackoverflow.com/questions/58670980/react-context-typeerror-cannot-read-property-areresultsvisible-of-undefined
import {
  EuiLoadingSpinner,
  EuiPanel,
  EuiCard,
  EuiIcon,
  EuiTabs,
  EuiTab,
  EuiPageTemplate,
  EuiFlexGroup,
  EuiDatePicker, 
  EuiDatePickerRange,
  EuiFlexItem,
  EuiComboBox,} from "@elastic/eui";

const timeOptions = [
  {
    label: 'Day',
  },
  {
    label: 'Month',
  },
  {
    label: 'Year'
  }
];
const tabs = [
  {
    id: 'products',
    name: (
      <span>
        <EuiIcon type="beaker" />
        &nbsp;Products
      </span>
    ),
    disabled: false,
  },
  {
    id: 'purchases',
    name: (
      <span>
        <EuiIcon type="visGoal" />
        &nbsp;Purchases
      </span>
    ),
    disabled: false,
  },
];
function PurchaseAnalytics ({fetchPurchases, purchaseData, isLoadingPurchases, errorPurchase}){

  const [startDate, setStartDate] = useState(moment().subtract(365,'d'));
  const [endDate, setEndDate] = useState(moment());
  const [selectedTabId, setSelectedTabId] = useState('products');

  const onSelectedTabChanged = (id) => {
    setSelectedTabId(id);
  };

  const [selectedOptions, setSelected] = useState([timeOptions[0]]);

  const onChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelected(selectedOptions);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}>
        {tab.name}
      </EuiTab>
    ));
  };

  React.useEffect(() => {
    if (startDate <= endDate)
      fetchPurchases(startDate.format("YYYY-MM-DDT00:00:00.000000"),endDate.format("YYYY-MM-DDT23:59:00.000000"));
  }, [fetchPurchases, startDate, endDate]);

  if (errorPurchase) return <NotFoundPage/>

  const renderSelectedTable = (selectedTabId) => {
    switch (selectedTabId){
      case 'purchases':
        if (isLoadingPurchases) return <EuiLoadingSpinner size="xl" />
        return <PurchaseTable raw_data = {purchase_data}/>
      case 'products':
        console.log(selectedOptions);
        return <PurchaseStatistics 
          data = {purchase_data}
          isLoading = {isLoadingPurchases}
          reduceTimeFormat={formatTimeReduce(selectedOptions)}/>
    }
  }
  const purchase_data = [];
  purchaseData.forEach(element => {
    purchase_data.push({
      id: element.id,
      id_user : element.id_user,
      name: element.product.name,
      time_stamp: element.time_stamp,
      quantity: element.quantity,
      total: (element.quantity * element.product.price).toFixed(2),
  })
  });
  return (
    <EuiPanel paddingSize="s" hasShadow={false} hasBorder={false}>
      <EuiCard layout="horizontal" title="Analytics">
        <EuiFlexGroup gutterSize="m" direction="column">
          <EuiFlexItem>
            <EuiTabs size="s">{renderTabs()}</EuiTabs>
          </EuiFlexItem>
          <EuiFlexItem>
              <EuiFlexGroup gutterSize="m" direction="row">
                <EuiFlexItem grow={false}>
                <EuiDatePickerRange
                startDateControl={
                <EuiDatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  startDate={startDate}
                  endDate={endDate}
                  isInvalid={startDate > endDate}
                  aria-label="Start date"
                  dateFormat="DD-MM-YYYY"
                  isLoading={isLoadingPurchases}
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
                  dateFormat="DD-MM-YYYY"
                  isLoading={isLoadingPurchases}
                  //showTimeSelect
                />
              }
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiComboBox
                placeholder="Select a single option"
                singleSelection={{ asPlainText: true }}
                options={timeOptions}
                selectedOptions={selectedOptions}
                onChange={onChange}
                isClearable={false}
              />
            </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          {/* <EuiFlexItem> 
            <EuiSpacer size="s" />
            <PurchaseCharts />
          </EuiFlexItem> */}
          <EuiFlexItem>
            {renderSelectedTable(selectedTabId)}
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiCard>
    </EuiPanel>
  );
}
export default connect(
  (state) => ({
    purchaseData : state.purchase.data,
    isLoadingPurchases : state.purchase.isLoading,
    errorPurchase : state.purchase.error,
}),
{
  fetchPurchases : purchaseActions.fetchPurchases,
}
)(PurchaseAnalytics);