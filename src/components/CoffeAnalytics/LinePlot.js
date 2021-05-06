import * as React from "react";
import {
  Chart,
  Axis,
  LineSeries,
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
function LinePlot({ isLoading, data}) {
  if (isLoading) return <EuiLoadingSpinner size="xl" />;

  const [value, setValue] = React.useState('15');
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
        plot_data.push([Date.parse(element.time_stamp), 1]);
      } else {
        plot_data[plot_data.length - 1][1] += 1;
      }
    } else {
      plot_data.push([Date.parse(element.time_stamp), 1]);
    }
  });
  return (
    <EuiCard layout="horizontal" title="Coffe Progression">
      <EuiFlexGroup gutterSize="l" direction="column">
        <EuiFlexItem>
          <EuiFormHelpText id="coffeProgression">
            Inporlation Interval in minutes
          </EuiFormHelpText>
          <EuiRange
          id={htmlIdGenerator()()}
          max = {60}
          min = {0}
          value={value}
          onChange={onChange}
          showInput
          showRange
          showTicks
          tickInterval={15}
          aria-describedby="coffeProgression"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <div className="LinePlot">
            <Chart size={{ height: 400 }}>
              <Settings showLegend={false} theme = {theme}/>    
              <LineSeries
                id="coffe_progression"
                name="Coffe Progression"
                data={plot_data}
                xScaleType="time"
                xAccessor={0}
                yAccessors={[1]}
                curve={CurveType.CURVE_BASIS}
              />

              <Axis
                title={"Time Stamp"}
                id="bottom-axis"
                position="bottom"
                tickFormat={timeFormatter("YYYY MM.DD HH:mm")}
                showGridLines
                //showOverlappingTicks={false}
                //showOverlappingLabels={false}
              />
              <Axis id="left-axis" position="left" showGridLines />
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
