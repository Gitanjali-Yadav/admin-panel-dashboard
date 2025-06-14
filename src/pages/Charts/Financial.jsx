// Financial.jsx - Displays a financial (Hilo) chart for Apple Inc. using Syncfusion components

import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, HiloSeries, Tooltip, DateTime, Zoom, Logarithmic, Crosshair } from '@syncfusion/ej2-react-charts';

import { financialChartData, FinancialPrimaryXAxis, FinancialPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { ChartsHeader } from '../../components';

// Set the minimum date for filtering chart data
const date1 = new Date('2017, 1, 1');

// Filter function to include only data after date1
// eslint-disable-next-line consistent-return
function filterValue(value) {
  if (value.x >= date1) {
    // Return the value if it meets the date condition
    // eslint-disable-next-line no-sequences
    return value.x, value.high, value.low;
  }
}
// Filtered financial data for the chart
const returnValue = financialChartData.filter(filterValue);

// Financial chart page component
const Financial = () => {
  // Get current theme mode from context
  const { currentMode } = useStateContext();

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      {/* Header for the chart */}
      <ChartsHeader category="Financial" title="AAPLE Historical" />
      <div className="w-full">
        {/* Syncfusion ChartComponent for financial data */}
        <ChartComponent
          id="charts"
          primaryXAxis={FinancialPrimaryXAxis}
          primaryYAxis={FinancialPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: true }}
          crosshair={{ enable: true, lineType: 'Vertical', line: { width: 0 } }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
        >
          {/* Inject required chart services */}
          <Inject services={[HiloSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom]} />
          <SeriesCollectionDirective>
            {/* Hilo series for Apple Inc. */}
            <SeriesDirective
              dataSource={returnValue}
              xName="x"
              yName="low"
              name="Apple Inc"
              type="Hilo"
              low="low"
              high="high"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Financial;
