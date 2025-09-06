import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export function useFetch<T>(url: string | null) {
  const { data, error, isLoading } = useSWR<T>(url, fetcher);
  return { data, error, isLoading };
}
