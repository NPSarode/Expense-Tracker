import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { get, post } from "../helpers/apiHelper"


export const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => get(`/categories`)
    })
}

export const useAddExpense = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => post(`/expense`, data),
        onSuccess: () => {
            queryClient.invalidateQueries('expenses')
            console.log('Expense added successfully')
        },
        onError: (error) => {
            console.log('Error saving expense', error)
        }
    })
}