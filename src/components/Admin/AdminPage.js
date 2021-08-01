import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { Actions as usersActions } from "../../redux/users";
import { Actions as purchaseActions } from "../../redux/purchase";
import {formatTimeReduce} from "../../utils/timeFormating"
//import { fake } from 'faker';
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
  EuiComboBox,
} from '@elastic/eui';

import {AdminTable , NotFoundPage, PurchaseTable} from "../../components"
import PurchaseStatistics from './Purchase/PurchaseStatistics';
import TopStatistics from './Top/TopStatistics';

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
    id: 'users',
    name: (
      <span>
        <EuiIcon type="user" />
        &nbsp;Users
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
    id: 'top',
    name: (
      <span>
        <EuiIcon type="starEmptySpace" />
        &nbsp;Top
      </span>
    ),
    disabled: false,
  }
];

function AdminPage({fetchUsers, fetchPurchases, data, purchaseData, isLoading, isLoadingPurchases, error, errorPurchase}){

    const [startDate, setStartDate] = useState(moment().subtract(7,'d'));
    const [endDate, setEndDate] = useState(moment());
    const [selectedTabId, setSelectedTabId] = useState('users');

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

    const renderSelectedTable = (selectedTabId) => {
      switch (selectedTabId){
        case 'users':
          if (isLoading) return <EuiLoadingSpinner size="xl" />
          return <AdminTable raw_data = {raw_data}/>
        case 'purchases':
          if (isLoadingPurchases) return <EuiLoadingSpinner size="xl" />
          return <PurchaseTable raw_data = {purchase_data}/>
        case 'products':
          console.log(selectedOptions);
          return <PurchaseStatistics 
            data = {purchase_data}
            isLoading = {isLoadingPurchases}
            reduceTimeFormat={formatTimeReduce(selectedOptions)}/>
        case 'top':
          return <TopStatistics user_data = {raw_data} purchase_data = {purchase_data} isLoading = {isLoadingPurchases}/>
      }
    }
    React.useEffect(() => {
        fetchUsers();
        if (startDate <= endDate)
          fetchPurchases(startDate.format("YYYY-MM-DDT00:00:00.000000"),endDate.format("YYYY-MM-DDT23:59:00.000000"));
      }, [fetchUsers, fetchPurchases, startDate, endDate]);

    //if (isLoading || isLoadingPurchases) return <EuiLoadingSpinner size="xl" />
    if (error || errorPurchase) return <NotFoundPage/>

    const raw_data = [];
    data.forEach(element => {
    raw_data.push({
        id: element.id,
        full_name: element.full_name,
        email: element.email,
        saldo: element.saldo.toFixed(2),
        rfid : element.rfid,
        is_active: String(element.is_active),
        is_superuser:String(element.is_superuser)
    })
    });
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
    return(
      <EuiPanel paddingSize="s" hasShadow={false} hasBorder={false}>
        <EuiCard layout="horizontal" title="Admin Panel">
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
            <EuiFlexItem>
              {renderSelectedTable(selectedTabId)}
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiCard> 
      </EuiPanel>
      // <EuiPageTemplate 
      //   restrictWidth={false}
      //   // tabs = {<EuiTabs size="s">{renderTabs()}</EuiTabs>} //<EuiTabs size="s">{renderTabs()}</EuiTabs>
      //   >
      //   <EuiTabs size="s">{renderTabs()}</EuiTabs>
      //   <AdminTable raw_data = {raw_data}/>
      // </EuiPageTemplate>
    )
}
export default connect(
    (state) => ({
        data : state.users.data,
        purchaseData : state.purchase.data,
        isLoading : state.users.isLoading,
        isLoadingPurchases : state.purchase.isLoading,
        errorPurchase : state.purchase.error,
        error : state.users.error
    }),
    {
      fetchUsers: usersActions.fetchUsers,
      fetchPurchases : purchaseActions.fetchAllPurchases,
    }
  )(AdminPage);