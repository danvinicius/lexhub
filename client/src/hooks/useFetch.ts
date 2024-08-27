import { useState, useCallback } from "react";

export interface FetchResponse {
  data: any;
  error: any;
  loading: boolean;
  request: (url: string, options: RequestInit) => void
  setData: any
  setError: any
}

function useFetch<T>(): FetchResponse {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(async (url: string, options: RequestInit) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.error) {
        setError(json.error);
      } else {
        setData(json);
        setError(null);
      }
    } catch (error) {
      setError('Erro ao fazer requisição');
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, data, setData, error, loading, setError };
}

export default useFetch;
