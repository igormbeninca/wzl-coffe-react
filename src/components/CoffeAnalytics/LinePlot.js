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
import { connect } from "react-redux";
import { Actions as purchaseActions } from "../../redux/purchase";
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
const ticks = [
  { label: '', value: 0 },
  { label: 'Day', value: 1440 },
  { label: 'Week', value: 10080 },
  {label: 'Month', value: 43200 },
  //{label:'3 Months', value: 129600},
  //{label:'6 Months', value:259200},
  //{label: 'Year', value: 525600}
]
function LinePlot({ isLoading, data}) {
  if (isLoading) return <EuiLoadingSpinner size="xl" />;

  const [value, setValue] = React.useState('1440');
  const onChange = (e) => {
    setValue(e.target.value);
  };

  var plot_data = new Array();
  data.forEach((element, index) => {
    if (index != 0) {
      if (
        Date.parse(element.time_stamp) - plot_data[plot_data.length - 1][0] >
        value*60000
      ) {
        plot_data.push([Date.parse(element.time_stamp), element.quantity]);
      } else {
        plot_data[plot_data.length - 1][1] += element.quantity;
      }
    } else {
      plot_data.push([Date.parse(element.time_stamp), element.quantity]);
    }
  });
  return (
    <EuiCard layout="horizontal" title="Product Progression">
      <EuiFlexGroup gutterSize="l" direction="column">
        <EuiFlexItem>
          <EuiFormHelpText id="productProgression">
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
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <div className="BarPlot">
            <Chart size={{ height: 400 }}>
              <Settings showLegend={false} theme = {theme}/>    
              <BarSeries
                id="product_Progression"
                name="Quantity"
                data={plot_data}
                xScaleType="time"
                xAccessor={0}
                yAccessors={[1]}
                //curve={CurveType.CURVE_BASIS}
              />

              <Axis
                title={"Time"}
                id="bottom-axis"
                position="bottom"
                tickFormat={timeFormatter("YYYY MM.DD HH:mm")}
                showGridLines
                //showOverlappingTicks={false}
                //showOverlappingLabels={false}
              />
              <Axis id="left-axis" position="left" title = "Quantity" showGridLines />
            </Chart>
          </div>
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



