import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { z } from 'zod';
import { useGetCategories } from '../apis/ExpenseForm';

const expenseSchema = z.object({
  amount: z.number().positive(),
  category_id: z.string(),
  description: z.string().min(1),
  user_id: z.number()
  // date: z.string().refine((date) => !isNaN(Date.parse(date)), {
  //   message: "Invalid date format",
  // }),
});

export const ExpenseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category_id: '',
    description: '',
    user_id: 1,
    // date: new Date().toISOString().split('T')[0],
  });

  const { data: categories } = useGetCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedData = expenseSchema.safeParse({
      ...formData,
      amount: parseFloat(formData.amount),
    });
    if (!parsedData.success) {
      console.error(parsedData.error.errors);
      return;
    }
    onSubmit(parsedData.data);
      setFormData({
        amount: '',
        category_id: '',
        description: '',
        user_id: 1,
        // date: new Date().toISOString().split('T')[0],
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm group-focus-within:text-blue-600 transition-colors duration-200">$</span>
          </div>
          <input
            type="number"
            required
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="0.00"
            className="pl-7 block w-full rounded-md px-3 border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 transition-all duration-200 hover:ring-gray-400"
          />
          <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900 group-focus-within:text-blue-600 transition-colors duration-200">
            Amount
          </label>
        </div>

        <div className="relative group">
          <select
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-300 transition-all duration-200 hover:ring-gray-400"
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.description}
              </option>
            ))}
          </select>
          <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900 group-focus-within:text-blue-600 transition-colors duration-200">
            Category
          </label>
        </div>

        <div className="relative group md:col-span-2">
          <input
            type="text"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 transition-all duration-200 hover:ring-gray-400"
          />
          <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900 group-focus-within:text-blue-600 transition-colors duration-200">
            Description
          </label>
        </div>

        <div className="relative group md:col-span-2">
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-300 transition-all duration-200 hover:ring-gray-400"
          />
          <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900 group-focus-within:text-blue-600 transition-colors duration-200">
            Date
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Expense
      </button>
    </form>
  );
};