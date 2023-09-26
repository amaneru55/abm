import useSWRInfinite from "swr/infinite";

type Response<T> = {
  items: T[],
  total: number
}

const useScrollList = <T> (getKey: (index: number) => [string] | null) => {
  const {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading,
  } = useSWRInfinite<Response<T>>(
    getKey,
    {
      keepPreviousData: true,
    }
  )

  const dataList = data ? ([] as Response<T>[]).concat(...data) : [];
  const items = dataList.map(item => item.items).flat();

  const isLoadingMore = isLoading || (size > 0 && data !== undefined && typeof data[size - 1] === "undefined");
  const isEmpty = !data?.[0]?.items || data?.[0]?.items?.length === 0;
  const isReachingEnd = isEmpty || ((data !== undefined) && data[data.length - 1]?.items?.length < 20);
  const isRefreshing = isValidating && (data !== undefined) && data.length === size;

  const handleLoadMore = async () => {
    if (isReachingEnd) return

    await setSize(s => s + 1)
  }

  const refresh = async () => {
    await mutate()
  }

  return {
    dataList,
    items,
    isEmpty,
    isLoading,
    mutate,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    handleLoadMore,
    refresh,
  }
}

export default useScrollList
