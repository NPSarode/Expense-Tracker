import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { get, del } from "../helpers/apiHelper"
import toast from "react-hot-toast"


export const useGetTransaction = () => {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: () => get(`/expenses`)
    })
}

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => del(`/expense/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries('expenses')
            toast.success('Expense deleted successfully');
        },
        onError: (error) => {
            console.log(error)
            toast.error('Error deleting expense');
        }
    })
}
