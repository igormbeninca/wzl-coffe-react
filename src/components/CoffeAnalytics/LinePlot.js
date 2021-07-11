import * as React from "react";
import {
  Chart,
  Axis,
  BarSeries,
  Settings,
  formatDate,
  EuiLoadingSpinner,
  timeFormatter,
  CurveType,
  niceTimeFormatByDay,
} from "@elastic/charts";
import moment from 'moment';
import { connect } from "react-redux";
import { Actions as purchaseActions } from "../../redux/purchase";
import ProductDropDownMenu from "./ProductDropDownMenu"
import { htmlIdGenerator } from '@elastic/eui/lib/services';

import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiRange, EuiFormHelpText } from "@elastic/eui";

import "@elastic/charts/dist/theme_light.css";
const theme = {
  lineSeriesStyle: {
    line: {
      strokeWidth: 1.5,
    }
  }
}
// const ticks = [
//   { label: '', value: 0 },
//   { label: 'Day', value: 1440 },
//   { label: 'Week', value: 10080 },
//   {label: 'Month', value: 43200 },
  //{label:'3 Months', value: 129600},
  //{label:'6 Months', value:259200},
  //{label: 'Year', value: 525600}
//]
function reduceProductsQuantity(data) {
  const result = data.reduce((acc, d) => {
      const day = moment(d.time_stamp, "YYYY-MM-DD").unix()*1000;
      const found = acc.find(a => a.time === day && a.name === d.product.name);
      //const value = { name: d.name, val: d.value };
      const total =  parseFloat(d.quantity * d.product.price); // the element in data property
      if (!found) {
        //acc.push(...value);
        acc.push({time: day,  name:d.product.name, quantity: total}) // not found, so need to add data property
      }
      else {
        //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
        found.quantity += total; // if found, that means data property exists, so just push new element to found.data.
      }
      return acc;
    }, []);
    return result;
}
function LinePlot({ isLoading, data}) {
  // if (isLoading) return <EuiLoadingSpinner size="xl" />;

  // const [value, setValue] = React.useState('1440');
  // const onChange = (e) => {
  //   setValue(e.target.value);
  // };

  // var plot_data = new Array();
  // data.forEach((element, index) => {
  //   if (index != 0) {
  //     if (
  //       Date.parse(element.time_stamp) - plot_data[plot_data.length - 1][0] >
  //       value*60000
  //     ) {
  //       plot_data.push([Date.parse(element.time_stamp), element.quantity]);
  //     } else {
  //       plot_data[plot_data.length - 1][1] += element.quantity;
  //     }
  //   } else {
  //     plot_data.push([Date.parse(element.time_stamp), element.quantity]);
  //   }
  // });
  console.log(data)
  const resultProducts = reduceProductsQuantity(data);
  console.log(resultProducts)
  return (
    <EuiCard layout="horizontal" title="Product Progression">
      <EuiFlexGroup gutterSize="l" direction="column">
        <EuiFlexItem>
          {/* <EuiFormHelpText id="productProgression">
            Inporlation Interval in minutes
          </EuiFormHelpText>
          <EuiRange
          id={htmlIdGenerator()()}
          max = {43200}
          min = {0}
          value={value}
          onChange={onChange}
          showTicks
          ticks={ticks}
          showInput
          //fullWidth={true}
          tickInterval={1440}
          aria-describedby="productProgression"
          /> */}
          <ProductDropDownMenu/>
        </EuiFlexItem>
        <EuiFlexItem>
          <Chart size={{height: 500}}>
            <Settings
                //theme={theme}
                rotation={0}
                showLegend={true}
            />
            <BarSeries
                id="sales"
                name="Sales €"
                data={resultProducts}
                xAccessor="time"
                yAccessors={['quantity']}
                xScaleType="time"
                splitSeriesAccessors={['name']}
                //color={['#85a5c4']}
            />
            <Axis
                id="bottom-axis"
                position={"bottom"}
                tickFormat={timeFormatter("YYYY MM-DD")}
                showGridLines
                showOverlappingTicks={true}
                showOverlappingLabels={true}
                title="Time"
            />
            <Axis
                id="left-axis"
                position={"left"}
                title="Sales €"
            />
          </Chart>
      </EuiFlexItem>
      </EuiFlexGroup>
    </EuiCard>
  );
}
export default connect(
  (state) => ({
    isLoading: state.purchase.isLoading,
    data: state.purchase.data,
  }),
  {
    //fetchPurchases: purchaseActions.fetchPurchases
  }
)(LinePlot);



