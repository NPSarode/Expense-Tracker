import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { categories } from '../utils/constants';

export const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const getCategoryLabel = (value) => {
    return categories.find(cat => cat.value === value)?.label || value;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense, index: number) => (
            <tr 
              key={expense.id}
              className="transform transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: 'fadeIn 0.5s ease-out forwards'
              }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(expense.created_on), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getCategoryLabel(expense.category_desc)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${Number(expense.amount).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-red-600 hover:text-red-900 transition-colors duration-200 transform hover:scale-110"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};