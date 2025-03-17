import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

// Sample occasions data
const occasions = {
  '2024-03-17': 'Holi Festival',
  '2024-03-25': 'Ram Navami',
  '2024-04-11': 'Eid al-Fitr',
  '2024-04-17': 'Baisakhi',
  '2024-04-21': 'Mahavir Jayanti',
  '2024-05-23': 'Buddha Purnima',
  '2024-06-17': 'Eid al-Adha',
  '2024-08-15': 'Independence Day',
  '2024-08-26': 'Raksha Bandhan',
  '2024-09-07': 'Ganesh Chaturthi',
  '2024-10-02': 'Gandhi Jayanti',
  '2024-10-12': 'Dussehra',
  '2024-11-01': 'Diwali',
  '2024-12-25': 'Christmas',
};

interface DatePickerWithOccasionsProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatePickerWithOccasions({ date, setDate }: DatePickerWithOccasionsProps) {
  const formattedDate = date ? format(date, 'PPP') : 'Pick a date';
  const occasion = date ? occasions[format(date, 'yyyy-MM-dd')] : undefined;

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-16 bg-gray-50 border-2 border-gray-300 rounded-2xl py-3 px-4 shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            modifiers={{
              hasOccasion: (date) => occasions[format(date, 'yyyy-MM-dd')] !== undefined,
            }}
            modifiersStyles={{
              hasOccasion: {
                fontWeight: 'bold',
                color: '#2563eb',
                textDecoration: 'underline',
              },
            }}
          />
        </PopoverContent>
      </Popover>
      {occasion && (
        <div className="text-sm text-primary font-medium mt-1">
          🎉 {occasion}
        </div>
      )}
    </div>
  );
} 