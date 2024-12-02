import { TDashboardMetrics } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/api";

export const useGetDashboardMetrics = () => {
  const { getToken } = useAuth();

  return useQuery<TDashboardMetrics>({
    queryKey: ["metrics"],
    queryFn: async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${BASE_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.json();
      } catch (error) {
        throw error;
      }
    },
  });
};

//const useCreateTodo = () => {
//  const { getToken } = useAuth();
//
//  return useMutation({
//    mutationKey: ["newTodo"],
//    mutationFn: async (newTodo: string) => {
//      const url = `${BACKEND_URI}/api/v1/todo`;
//      const data = {
//        text: newTodo,
//      };
//
//      return axios.post(url, data, {
//        headers: {
//          "Content-Type": "application/json",
//          Authorization: `Bearer ${await getToken()}`,
//        },
//      });
//    },
//    onSuccess: () => {
//      queryClient.invalidateQueries();
//    },
//  });
//};
