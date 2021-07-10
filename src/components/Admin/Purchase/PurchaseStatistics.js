import React, { useState } from 'react';
import {
    Chart,
    Axis,
    BarSeries,
    Settings,
  } from "@elastic/charts";

const theme = {
    barSeriesStyle: {
        bar: {
        strokeWidth: 1.5,
        }
    }
}

export default function PurchaseStatistics({data}){
    const result = data.reduce((acc, d) => {
        const found = acc.find(a => a.name === d.name);
        //const value = { name: d.name, val: d.value };
        const total =  parseFloat(d.total); // the element in data property
        if (!found) {
          //acc.push(...value);
          acc.push({name:d.name, quantity: total}) // not found, so need to add data property
        }
        else {
          //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
          found.quantity += total; // if found, that means data property exists, so just push new element to found.data.
        }
        return acc;
      }, []);
      
    return(
        <Chart size={{height: 500}}>
        <Settings
            //theme={theme}
            rotation={0}
            showLegend={true}
            
        />
        <BarSeries
            id="sales"
            name="Sales €"
            data={result}
            xAccessor="name"
            yAccessors={['quantity']}
            // color={['#85a5c4']}
            
            
        />
        <Axis
            id="bottom-axis"
            position={"bottom"}
            showGridLines={true}
            title="Product"
        />
        <Axis
            id="left-axis"
            position={"left"}
            title="Sales €"
            
        />
        </Chart>
    );
}