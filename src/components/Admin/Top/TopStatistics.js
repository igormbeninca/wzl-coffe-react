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
    Settings,
    timeFormatter,
    Partition,
    PartitionLayout 
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
function reduceUsersPurchases(purchases,users) {
    const result = purchases.reduce((acc, d) => {
        const found = acc.find(a => a.name === d.id_user);
        const total =  Number(d.total); // the element in data property
        if (!found) {
            acc.push({name: d.id_user, total: total}) // not found, so need to add data property
          }
          else {
            found.total += total; // if found, that means data property exists, so just push new element to found.data.
          }
        return acc;
      }, []);
      return result.map(purchase => {
          purchase.total = Number(purchase.total.toFixed(2));
          purchase.name = users.find(user => user.id === purchase.name).full_name
          return purchase});
}

export default function TopStatistics({user_data, purchase_data, isLoading}){
    // Total Products
    const usersPurchases = reduceUsersPurchases(purchase_data, user_data).sort((a, b) => b.total - a.total);
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
                                        <EuiIcon size="xxl" type="starFilled" color="secondary" />
                                    </EuiFlexItem>
                                    <EuiFlexItem>
                                        <EuiStat
                                            title={(usersPurchases[0] === undefined) ? "0.00 €" :  usersPurchases[0].total + " €"}
                                            description={(usersPurchases[0] === undefined) ? "--" :  usersPurchases[0].name}
                                            //titleColor="subdued"
                                            textAlign="left"
                                            titleColor="secondary"
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
                                        <EuiIcon size="l" type="starFilled" color="primary" />
                                        <EuiIcon size="l" type="starFilled" color="primary" />
                                    </EuiFlexItem>
                                    <EuiFlexItem>
                                        <EuiStat
                                            title={(usersPurchases[1]=== undefined) ? "0.00 €" :  usersPurchases[1].total + " €"}
                                            description={(usersPurchases[1] === undefined) ? "--" :  usersPurchases[1].name}
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
                                    <EuiIcon size="m" type="starFilled" color="danger" />
                                    <EuiIcon size="m" type="starFilled" color="danger" />
                                    <EuiIcon size="m" type="starFilled" color="danger" />
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiStat
                                        title={(usersPurchases[2] === undefined) ? "0.00 €" :  usersPurchases[2].total + " €"}
                                        description={(usersPurchases[2] === undefined) ? "--" :  usersPurchases[2].name}
                                        titleColor="danger"
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
                                data={usersPurchases.slice(0,5)}
                                xAccessor="name"
                                yAccessors={['total']}
                                splitSeriesAccessors={['name']}
                                stackAccessors={['name']}
                                color={euiPaletteColorBlind({ rotations: 3, order: 'group' }).slice(0, 20)}
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
                                data={usersPurchases}
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
                                            fillColor: (d) => euiPaletteColorBlind({ rotations: 3, order: 'group' })[d.sortIndex]
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
        </EuiFlexGroup>
    );
}
