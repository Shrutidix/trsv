import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  pickupLocation: z.string().min(1, 'Pickup location is required'),
  dropoffLocation: z.string().min(1, 'Dropoff location is required'),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  pickupTime: z.string().min(1, 'Pickup time is required'),
  passengers: z.number().min(1, 'At least 1 passenger is required').max(4, 'Maximum 4 passengers'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('https://trsvbackend.vercel.app/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      toast.success('Booking submitted successfully!');
      reset();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" {...register('phone')} />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickupLocation">Pickup Location</Label>
        <Input id="pickupLocation" {...register('pickupLocation')} />
        {errors.pickupLocation && <p className="text-red-500 text-sm">{errors.pickupLocation.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dropoffLocation">Dropoff Location</Label>
        <Input id="dropoffLocation" {...register('dropoffLocation')} />
        {errors.dropoffLocation && <p className="text-red-500 text-sm">{errors.dropoffLocation.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickupDate">Pickup Date</Label>
        <Input id="pickupDate" type="date" {...register('pickupDate')} />
        {errors.pickupDate && <p className="text-red-500 text-sm">{errors.pickupDate.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickupTime">Pickup Time</Label>
        <Input id="pickupTime" type="time" {...register('pickupTime')} />
        {errors.pickupTime && <p className="text-red-500 text-sm">{errors.pickupTime.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="passengers">Number of Passengers</Label>
        <Input 
          id="passengers" 
          type="number" 
          min="1" 
          max="4" 
          {...register('passengers', { valueAsNumber: true })} 
        />
        {errors.passengers && <p className="text-red-500 text-sm">{errors.passengers.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Book Now'}
      </Button>
    </form>
  );
};

export default BookingForm; 