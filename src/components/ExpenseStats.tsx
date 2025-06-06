import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { categories } from '../utils/constants';
import { useGetCategoryWiseExpense, useGetExpensesByMonth } from '../apis/Dashboard';

export const ExpenseStats = () => {

  const { data: category_wise_expense } = useGetCategoryWiseExpense()
  const { data: monthly_expenses } = useGetExpensesByMonth()

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Expenses</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly_expenses || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expense" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Expenses by Category</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={category_wise_expense || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="description" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expense_count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};