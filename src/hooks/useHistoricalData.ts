import useSWR from 'swr';
import { getHistoricalData } from '../lib/api/airQuality';

export function useHistoricalData(startDate: Date, endDate: Date) {
  const { data, error, isLoading, mutate } = useSWR(
    ['historicalData', startDate.toISOString(), endDate.toISOString()],
    () => getHistoricalData(startDate, endDate),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    data,
    error,
    isLoading,
    refetch: mutate
  };
}