import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../components/AuthProvider';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ExpenseForm } from '../components/ExpenseForm';
import toast from 'react-hot-toast';
import { useAddExpense } from '../apis/ExpenseForm';

export default function AddExpense() {
  const { user } = useAuth();

  const { mutate: onAddExpense } = useAddExpense()

  const handleSubmit = async (formData) => {
    try {
      console.log({formData})
      onAddExpense(formData)
      toast.success('Expense added successfully');
    } catch (error) {
      console.log({error})
      toast.error('Error saving expense');
    }
  };

  return (
    <DashboardLayout>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-base font-semibold leading-6 text-gray-900 mb-4">Add New Expense</h2>
          <ExpenseForm onSubmit={handleSubmit} />
        </div>
      </div>
    </DashboardLayout>
  );
}