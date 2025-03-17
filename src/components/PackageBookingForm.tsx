import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PackageBookingFormProps {}

const PackageBookingForm: React.FC<PackageBookingFormProps> = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log({ ...data, date });
    toast({
      title: "Package Search Submitted",
      description: "We will find the best vacation packages for you.",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Select defaultValue="shimla">
            <SelectTrigger id="destination">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shimla">Shimla</SelectItem>
              <SelectItem value="manali">Manali</SelectItem>
              <SelectItem value="dharamshala">Dharamshala</SelectItem>
              <SelectItem value="nainital">Nainital</SelectItem>
              <SelectItem value="rishikesh">Rishikesh</SelectItem>
              <SelectItem value="ladakh">Ladakh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Travel Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date: Date) => date < new Date()}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (Days)</Label>
          <Select defaultValue="3">
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Days</SelectItem>
              <SelectItem value="3">3 Days</SelectItem>
              <SelectItem value="5">5 Days</SelectItem>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="10">10 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="travelers">Number of Travelers</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="travelers"
              type="number" 
              min="1"
              className="pl-9" 
              placeholder="Number of travelers"
              {...register("travelers", { required: true })}
            />
          </div>
          {errors.travelers && <p className="text-red-500 text-xs">Required</p>}
        </div>
      </div>

      <Button type="submit" className="w-full mt-6 bg-primary-500 hover:bg-primary-600">
        Search Packages
      </Button>
    </form>
  );
};

export default PackageBookingForm;
