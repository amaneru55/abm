import apiFetcher from "@utils/apiFetcher.ts";

const userAPI = {
  login: async (data: User.Login.Form) =>
   apiFetcher<User.Instance>('/v1/user/login', {
     method: 'POST',
      body: JSON.stringify(data)
   }),
}

export default userAPI
