import useSWR from "swr";

export const useCurrentUser = () => useSWR<User.Instance>(['/v1/user/info'])