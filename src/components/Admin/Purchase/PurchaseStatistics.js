import React, { useState } from 'react';
import moment from 'moment';
import {
    EuiFlexGroup,
    EuiFlexItem,
  } from '@elastic/eui';
import {
    Chart,
    Axis,
    BarSeries,
    LineSeries,
    CurveType,
    AreaSeries,
    Settings,
    timeFormatter,
  } from "@elastic/charts";

const theme = {
    barSeriesStyle: {
        bar: {
        strokeWidth: 1.5,
        }
    },
    lineSeriesStyle: {
        line: {
          strokeWidth: 3.5,
        },
        point: {
            radius: 3.5,
          },
      },
    areaSeriesStyle: {
    line: {
        strokeWidth: 3.5,
    },
    point: {
        radius: 3.5,
        },
    },
}
// function reduceProductsQuantity(data) {
//     const result = data.reduce((acc, d) => {
//         const found = acc.find(a => a.name === d.name);
//         //const value = { name: d.name, val: d.value };
//         const total =  parseFloat(d.total); // the element in data property
//         if (!found) {
//           //acc.push(...value);
//           acc.push({name:d.name, quantity: total}) // not found, so need to add data property
//         }
//         else {
//           //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
//           found.quantity += total; // if found, that means data property exists, so just push new element to found.data.
//         }
//         return acc;
//       }, []);
//       return result;
// }
function reduceProductsQuantity(data) {
    const result = data.reduce((acc, d) => {
        const day = moment(d.time_stamp, "YYYY-MM-DD").unix()*1000;
        const found = acc.find(a => a.time === day && a.name === d.name);
        //const value = { name: d.name, val: d.value };
        const total =  parseFloat(d.total); // the element in data property
        if (!found) {
          //acc.push(...value);
          acc.push({time: day,  name:d.name, quantity: total}) // not found, so need to add data property
        }
        else {
          //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
          found.quantity += total; // if found, that means data property exists, so just push new element to found.data.
        }
        return acc;
      }, []);
      return result;
}
function reducePurchasesValues(data) {
    const result = data.reduce((acc, d) => {
        const day = moment(d.time_stamp, "YYYY-MM-DD").unix()*1000;
        const found = acc.find(a => a.time === day);
        //const value = { name: d.name, val: d.value };
        const total =  parseFloat(d.total); // the element in data property
        const quantity = d.quantity;
        if (!found) {
          //acc.push(...value);
          acc.push({time:day, total: total, quantity:quantity}) // not found, so need to add data property
        }
        else {
          //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
          found.total += total; // if found, that means data property exists, so just push new element to found.data.
          found.quantity += quantity;
        }
        return acc;
      }, []);
      return result;
}

export default function PurchaseStatistics({data}){
    // Total Products
    const resultProducts = reduceProductsQuantity(data);
    const resultPurchases = reducePurchasesValues(data);
    //console.log(resultPurchases);  
    return(
        <EuiFlexGroup gutterSize="s" direction="column">
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
            <EuiFlexItem>
                {/* <div className="LinePlot"> */}
                <Chart size={{height: 500}}>
                    <Settings
                        theme={theme}
                        rotation={0}
                        showLegend={true}
                    />
                    <LineSeries
                        id="sales"
                        name="Sales €"
                        data={resultPurchases}
                        xScaleType="time"
                        xAccessor={"time"}
                        yAccessors={['total']}
                        //curve={CurveType.CURVE_BASIS}
                        //color={['#85a5c4']}
                    />
                    <BarSeries
                        id="quantity"
                        name="Quantity"
                        data={resultPurchases}
                        xScaleType="time"
                        xAccessor={"time"}
                        yAccessors={['quantity']}
                        //curve={CurveType.CURVE_BASIS}
                        color={['#85a5c4']}
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
                        showGridLines
                        id="left-axis"
                        position={"left"}
                        //title="Sales €"
                    />
                </Chart>
            </EuiFlexItem>
        </EuiFlexGroup>
    );
}
