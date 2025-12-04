import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiClient } from "../Api";


const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const api = useApiClient();

  return useMutation({
    mutationFn: async (user) => {
      const controller = new AbortController()
      const signal = controller.signal;
      const response = await api.patch("users",user,api.headers.applicationJson,signal);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"])
    },
    onError: (error) => {
      console.error(error.message);
    }
  })
}

export default useUpdateUser;