import { useQuery } from 'react-query';
import { ScanResult, Platform } from './types';

export function useScan(platform: Platform, queryText: string) {
  const endpointMap: Record<Platform, string> = {
    Tiki: 'scan-tiki',
    Fahasa: 'scan-fahasa',
  };
  const endpoint = endpointMap[platform];

  const query = useQuery<ScanResult>({
    queryKey: [endpoint, queryText],
    queryFn: () =>
      fetch(`/api/${endpoint}/${queryText}`).then((res) => res.json()),
    retry: false,
    staleTime: 3600000,
  });
  return query;
}
