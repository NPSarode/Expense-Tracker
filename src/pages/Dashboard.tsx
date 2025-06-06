import { useState, useEffect, useMemo } from 'react';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../components/AuthProvider';
import { ExpenseStats } from '../components/ExpenseStats';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { TimeRangeSelector } from '../components/TimeRangeSelector';
import { CreditCard, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { useGetSummaryById } from '../apis/Dashboard';

type TimeRange = 'week' | 'month' | 'year';

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  // const { user } = useAuth();
  const { data: summary } = useGetSummaryById();


  const stats = useMemo(() => [
    { name: `Total ${selectedRange}ly Expenses`, value: parseInt(summary?.total_amt), icon: DollarSign, color: 'bg-blue-500' },
    { name: 'Average Expense', value: parseInt(summary?.avg_amt && summary?.avg_amt).toFixed(2), icon: TrendingUp, color: 'bg-green-500' },
    { name: 'Highest Expense', value: parseInt(summary?.max_amt), icon: CreditCard, color: 'bg-purple-500' },
    { name: 'Number of Transactions', value: parseInt(summary?.total_transactions), icon: Calendar, color: 'bg-yellow-500' },
  ], [summary, selectedRange]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <TimeRangeSelector
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white shadow transition-all duration-200 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md ${item.color} p-3`}>
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">{item.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-base font-semibold leading-6 text-gray-900 mb-4">Expense Analysis</h2>
            <ExpenseStats />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}