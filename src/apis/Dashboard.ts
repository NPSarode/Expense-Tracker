import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { get, del } from "../helpers/apiHelper"
import toast from "react-hot-toast"


export const useGetSummaryById = () => {
    return useQuery({
        queryKey: ['summary'],
        queryFn: () => get(`/summary/1`)
    })
}


export const useGetCategoryWiseExpense = () => {
    return useQuery({
        queryKey: ['category-wise-expense'],
        queryFn: () => get(`/category_wise_expense/1`)
    })
}

export const useGetExpensesByMonth = () => {
    return useQuery({
        queryKey: ['expenses-by-month'],
        queryFn: () => get(`/expenses_by_month/1`)
    })
}

