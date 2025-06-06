import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, subMonths, addMonths, subWeeks, addWeeks, subYears, addYears, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

type TimeRange = 'week' | 'month' | 'year';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const TimeRangeSelector = ({
  selectedRange,
  onRangeChange,
  currentDate,
  onDateChange,
}: TimeRangeSelectorProps) => {
  const ranges: TimeRange[] = ['week', 'month', 'year'];

  const handlePrevious = () => {
    switch (selectedRange) {
      case 'week':
        onDateChange(subWeeks(currentDate, 1));
        break;
      case 'month':
        onDateChange(subMonths(currentDate, 1));
        break;
      case 'year':
        onDateChange(subYears(currentDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (selectedRange) {
      case 'week':
        onDateChange(addWeeks(currentDate, 1));
        break;
      case 'month':
        onDateChange(addMonths(currentDate, 1));
        break;
      case 'year':
        onDateChange(addYears(currentDate, 1));
        break;
    }
  };

  const getDateRangeText = () => {
    switch (selectedRange) {
      case 'week':
        return `${format(startOfWeek(currentDate), 'MMM d')} - ${format(endOfWeek(currentDate), 'MMM d, yyyy')}`;
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'year':
        return format(currentDate, 'yyyy');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-2">
        {ranges.map((range) => (
          <button
            key={range}
            onClick={() => onRangeChange(range)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
              selectedRange === range
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2 transition-all duration-300 transform">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium">{getDateRangeText()}</span>
        </div>
        <button
          onClick={handleNext}
          className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};