import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFetch<T>(url: string | null) {
  const { data, error, isLoading } = useSWR<T>(url, fetcher);
  return { data, error, isLoading };
}
