import React, { useState } from 'react';
import moment from 'moment';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiFlexGrid,
    EuiCard,
    EuiToolTip,
    EuiIcon,
    EuiStat,
    EuiPanel,
    euiPaletteColorBlind,
  } from '@elastic/eui';
import {
    Chart,
    Axis,
    BarSeries,
    LineSeries,
    CurveType,
    AreaSeries,
    Heatmap,
    Settings,
    timeFormatter,
    Partition,
    PartitionLayout,
    ScaleType
  } from "@elastic/charts";

const timeFormat = "DD-MM-YYYY"
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
function reduceProductsHeatMap(data) {
    const result = data.reduce((acc, d) => {
        const day = moment(moment(d.time_stamp).format("1993-11-12 HH")).unix()*1000;
        //const day_2 = moment(moment(d.time_stamp).format("1993-11-12 HH:mm")).unix()*1000;
        //console.log(day_2)
        const found = acc.find(a => a.time === day && a.name === d.name);
        //const value = { name: d.name, val: d.value };
        const total =  Number(d.quantity); // the element in data property
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
function reduceProductsQuantityAbsolute(data) {
    const result = data.reduce((acc, d) => {
        const found = acc.find(a => a.name === d.name);
        //const value = { name: d.name, val: d.value };
        const total =  Number(d.total); // the element in data property
        const quantity = d.quantity;
        if (!found) {
            //acc.push(...value);
            acc.push({name: d.name, total: total, quantity:quantity}) // not found, so need to add data property
          }
          else {
            //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
            found.total += total; // if found, that means data property exists, so just push new element to found.data.
            found.quantity += quantity;
          }
        return acc;
      }, []);
      return result.map(purchase => {purchase.total = Number(purchase.total.toFixed(2)); return purchase});
}
function reduceProductsQuantity(data, reduceTimeFormat) {
    const result = data.reduce((acc, d) => {
        const day = moment(d.time_stamp, reduceTimeFormat).unix()*1000;
        const found = acc.find(a => a.time === day && a.name === d.name);
        //const value = { name: d.name, val: d.value };
        const total =  Number(d.total); // the element in data property
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
      return result.map(purchase => {purchase.quantity = Number(purchase.quantity.toFixed(2)); return purchase});
}
function reducePurchasesValues(data, reduceTimeFormat) {
    const result = data.reduce((acc, d) => {
        const day = moment(d.time_stamp, reduceTimeFormat).unix()*1000;
        const found = acc.find(a => a.time === day);
        //const value = { name: d.name, val: d.value };
        const total =  Number(d.total); // the element in data property
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
      return result.map(purchase => {purchase.total = Number(purchase.total.toFixed(2)); return purchase});
}
const reducer_euros = (accumulator, currentValue) => accumulator + currentValue.total;
const reducer_quantity = (accumulator, currentValue) => accumulator + currentValue.quantity;

export default function PurchaseStatistics({data, isLoading, reduceTimeFormat}){
    console.log(reduceTimeFormat);
    // Total Products
    const resultHeatMap = reduceProductsHeatMap(data);
    const resultProducts = reduceProductsQuantity(data, reduceTimeFormat);
    const resultPurchases = reducePurchasesValues(data, reduceTimeFormat);
    const resultProductAbsolute = reduceProductsQuantityAbsolute(data);
    const total_euros = (resultPurchases.reduce(reducer_euros,0)).toFixed(2);
    const total_quantity = (resultPurchases.reduce(reducer_quantity,0)).toFixed(0); 
    const avg_euros = ((total_euros / resultPurchases.length) || 0).toFixed(2);
    const best_day = Math.max.apply(Math, resultPurchases.map(function(purchase) { return purchase.total; }) || 0).toFixed(2);
    return(
        <EuiFlexGroup gutterSize="s" direction="column">
            <EuiFlexItem>
                <EuiFlexGrid columns={3}>
                    <EuiFlexItem>
                        <EuiToolTip
                            position="bottom"
                            content={
                            <p>
                            Brasilien 7 x 1 Deutschland
                            </p>
                            }>
                            <EuiPanel>
                                <EuiFlexGroup gutterSize="none" direction="row">
                                    <EuiFlexItem>
                                        <EuiIcon size="xxl" type="globe" color="primary" />
                                    </EuiFlexItem>
                                    <EuiFlexItem>
                                        <EuiStat
                                            title={total_euros + " €"}
                                            description="Total"
                                            //titleColor="subdued"
                                            textAlign="left"
                                            titleSize="m"
                                            isLoading={isLoading}/>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiPanel>
                            </EuiToolTip>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiPanel>
                                <EuiFlexGroup gutterSize="none" direction="row">
                                    <EuiFlexItem>
                                        <EuiIcon size="xxl" type="stats" color="primary" />
                                    </EuiFlexItem>
                                    <EuiFlexItem>
                                        <EuiStat
                                            title={avg_euros + " €"}
                                            description="Average"
                                            titleColor="primary"
                                            textAlign="left"
                                            titleSize="m"
                                            isLoading={isLoading}/>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiPanel>
                        </EuiFlexItem>
                        <EuiFlexItem>
                        <EuiPanel>
                            <EuiFlexGroup gutterSize="none" direction="row">
                                <EuiFlexItem>
                                    <EuiIcon size="xxl" type="currency" color="primary" />
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiStat
                                        title={best_day + " €"}
                                        description="Best"
                                        titleColor="secondary"
                                        textAlign="left"
                                        titleSize="m"
                                        isLoading={isLoading}/>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiPanel>
                    </EuiFlexItem>
                </EuiFlexGrid>
            </EuiFlexItem>
            <EuiFlexItem>
                <Chart size={{height: 500}}>
                    <Settings
                        //theme={theme}
                        rotation={0}
                        showLegend={true}
                        legendPosition={"top"}
                    />
                    <BarSeries
                        id="sales"
                        name="Sales €"
                        data={resultProducts}
                        xAccessor="time"
                        yAccessors={['quantity']}
                        xScaleType="time"
                        splitSeriesAccessors={['name']}
                        stackAccessors={['name']}
                        color={euiPaletteColorBlind({ rotations: 1, order: 'group' }).slice(0, 20)}
                    />
                    <Axis
                        id="bottom-axis"
                        position={"bottom"}
                        tickFormat={timeFormatter(timeFormat)}
                        showGridLines
                        showOverlappingTicks={true}
                        showOverlappingLabels={false}
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
                        legendPosition={"top"}
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
                        tickFormat={timeFormatter(timeFormat)}
                        showGridLines
                        showOverlappingTicks={false}
                        showOverlappingLabels={false}
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
            <EuiFlexItem>
                <EuiFlexGroup>
                    <EuiFlexItem grow={6}>
                        <Chart size={{height: 500}}>
                            <Settings
                                rotation={90}
                                //showLegend={true}
                                //legendPosition="right"
                            />
                            <BarSeries
                                id="product"
                                name="Sales €"
                                //data={resultProductAbsolute}
                                data={resultProductAbsolute.sort((a, b) => b.total - a.total)}
                                xAccessor="name"
                                yAccessors={['total']}
                                splitSeriesAccessors={['name']}

                                stackAccessors={['name']}
                                color={euiPaletteColorBlind({ rotations: 1, order: 'group' }).slice(0, 20)}
                            />
                            <Axis
                                id="bottom-axis"
                                showGridLines
                                position={'left'}
                            />
                            <Axis
                                id="left-axis"
                                showGridLines
                                position={'bottom'}
                                title="Sales €"
                            />
                        </Chart>
                    </EuiFlexItem>
                    <EuiFlexItem grow={3}>
                        <Chart size={{ height: 500 }}>
                            {/* <Settings showLegend /> */}
                            <Partition
                                id="pieByPR"
                                data={resultProductAbsolute}
                                valueAccessor={(d) => d.total}
                                valueFormatter={() => ''}
                                valueGetter="percent"
                                layers={[
                                    {
                                        groupByRollup: (d) => d.name,
                                        fillLabel: {
                                            //valueFormatter: () => '',
                                            textColor: 'rgba(240,240,240, 0.9)',
                                          },
                                        shape: {
                                            fillColor: (d) => euiPaletteColorBlind({ rotations: 1, order: 'group' })[d.sortIndex]
                                            },  
                                    },
                                ]}
                                config={{
                                    partitionLayout: PartitionLayout.treemap,
                                    emptySizeRatio: 0.2,
                                    clockwiseSectors: false,
                                }}
                            />
                        </Chart>                
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
                <h1>Product Consuption</h1>
            </EuiFlexItem>
            <EuiFlexItem>
                <Chart size={{height: 300}} className="story-chart">
                <Settings
                showLegend
                legendPosition="top"
                brushAxis="both"
                //xDomain={{ min: 1572825600000, max: 1572912000000, minInterval: 1800000 }}
                //debugState={true}
                />
                <Heatmap
                id="Product Consuption"
                colorScale={ScaleType.Threshold}
                ranges={[1, 5, 10, 15, 20]}
                colors={['#ffffff', '#d2e9f7', '#8bc8fb', '#fdec25', '#fba740', '#fe5050']}
                data={resultHeatMap}
                xAccessor={(d) => d.time}
                yAccessor={(d) => d.name}
                valueAccessor={(d) => d.quantity}
                valueFormatter={(d) => d.toFixed(0.2)}
                ySortPredicate="numAsc"
                xScaleType={ScaleType.Time}
                config={{
                    xAxisLabel: {
                        formatter: timeFormatter("HH:mm")
                        },
                    grid: {
                        cellHeight: {
                            min: 20,
                        },
                        stroke: {
                            width: 1,
                            color: '#D3DAE6',
                        },
                        },
                        cell: {
                            maxWidth: 'fill',
                            maxHeight: 3,
                            label: {
                                visible: false,
                            },
                            border: {
                                stroke: '#D3DAE6',
                                strokeWidth: 0,
                            },
                        },
                        yAxisLabel: {
                        visible: true,
                        width: 'auto',
                        padding: { left: 10, right: 10 },
                        },
                    }
                }
                />
                </Chart>
            </EuiFlexItem>
        </EuiFlexGroup>
    );
}
