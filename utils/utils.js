import useSWR from "swr";

function isEvenOrOdd(number) {
  if (number + (1 % 2) === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

export default function useCustomSWR(url, fetcher, config = {}) {
  return useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
    ...config,
  });
}
