
import React from 'react';

interface DateTimePickerProps {
  value: Date;
  mode?: 'date' | 'time' | 'datetime';
  display?: string;
  onChange: (event: any, selectedDate?: Date) => void;
  style?: any;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function DateTimePicker({
  value,
  mode = 'date',
  onChange,
  style,
  minimumDate,
  maximumDate,
}: DateTimePickerProps) {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(value);

    if (mode === 'date') {
      const [year, month, day] = event.target.value.split('-').map(Number);
      selectedDate.setFullYear(year, month - 1, day);
    } else if (mode === 'time') {
      const [hours, minutes] = event.target.value.split(':').map(Number);
      selectedDate.setHours(hours, minutes);
    }

    onChange(event, selectedDate);
  };

  return (
    <input
      type={mode === 'time' ? 'time' : 'date'}
      value={mode === 'time' ? value.toTimeString().slice(0, 5) : formatDate(value)}
      onChange={handleChange}
      min={minimumDate ? formatDate(minimumDate) : undefined}
      max={maximumDate ? formatDate(maximumDate) : undefined}
      style={{
        padding: 12,
        borderRadius: 8,
        border: '1px solid #5A215E',
        backgroundColor: '#fff',
        color: '#5A215E',
        fontSize: 15,
        ...style,
      }}
    />
  );
}
