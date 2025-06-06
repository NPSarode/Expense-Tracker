import { useState, useEffect } from 'react';
import { collection, query, orderBy, deleteDoc, doc, updateDoc, onSnapshot, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../components/AuthProvider';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ExpenseList } from '../components/ExpenseList';
import { TimeRangeSelector } from '../components/TimeRangeSelector';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { useDeleteTransaction, useGetTransaction } from '../apis/Transaction';

type TimeRange = 'week' | 'month' | 'year';

export default function Transactions() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedRange, setSelectedRange] = useState<TimeRange>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user } = useAuth();
  
  const { data: transactions } = useGetTransaction()
  const { mutate: onDelete,  } = useDeleteTransaction()

  console.log({transactions})

  useEffect(() => {
    if (!user) return;

    let startDate, endDate;
    switch (selectedRange) {
      case 'week':
        startDate = startOfWeek(currentDate);
        endDate = endOfWeek(currentDate);
        break;
      case 'month':
        startDate = startOfMonth(currentDate);
        endDate = endOfMonth(currentDate);
        break;
      case 'year':
        startDate = startOfYear(currentDate);
        endDate = endOfYear(currentDate);
        break;
    }
  })


  const handleDelete = async (id: number) => {
      onDelete(id);
  };


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <TimeRangeSelector
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-base font-semibold leading-6 text-gray-900 mb-4">
              {selectedRange.charAt(0).toUpperCase() + selectedRange.slice(1)}ly Transactions
            </h2>
            <ExpenseList
              expenses={transactions || []}
              onEdit={setEditingExpense}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}