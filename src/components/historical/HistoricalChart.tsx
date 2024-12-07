import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { HistoricalDataPoint, PollutantChartConfigs } from '../../lib/types/airQualityHistory';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';

interface HistoricalChartProps {
  data: HistoricalDataPoint[];
  chartConfigs: PollutantChartConfigs;
  onConfigChange: (configs: PollutantChartConfigs) => void;
}

export function HistoricalChart({ data, chartConfigs, onConfigChange }: HistoricalChartProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatValue = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              type="number"
              domain={['dataMin', 'dataMax']}
            />
            <YAxis tickFormatter={formatValue} />
            <Tooltip
              labelFormatter={formatDate}
              formatter={(value: number) => [formatValue(value), '']}
            />
            <Legend />
            {Object.entries(chartConfigs).map(([key, config]) => {
              if (!config.visible) return null;
              const pollutant = POLLUTANT_LIMITS[key];
              if (!pollutant) return null;

              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={`components.${key}`}
                  name={pollutant.label}
                  stroke={config.color}
                  strokeWidth={config.strokeWidth}
                  dot={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}