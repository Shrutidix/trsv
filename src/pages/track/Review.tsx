import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Star, RefreshCw, CheckCircle, XCircle, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Review {
  _id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  message: string;
  status: 'approved' | 'not_approved';
  createdAt: string;
}

type FilterStatus = 'all' | 'approved' | 'not_approved';

const Review = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      console.log('Fetching reviews...');
      const response = await axios.get('https://trsvbackend.vercel.app/api/feedback', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Response:', response.data);
      
      if (response.data.success) {
        setReviews(response.data.data);
        setFilteredReviews(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch reviews');
      }
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to fetch reviews. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(reviews.filter(review => review.status === filter));
    }
  }, [filter, reviews]);

  const updateReviewStatus = async (reviewId: string, newStatus: 'approved' | 'not_approved') => {
    try {
      setUpdating(reviewId);
      console.log(`Updating review ${reviewId} status to ${newStatus}`);

      const response = await axios({
        method: 'patch',
        url: `https://trsvbackend.vercel.app/api/feedback/${reviewId}/status`,
        data: {
          status: newStatus
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Update response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update status');
      }

      // Update local state after successful API call
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review._id === reviewId 
            ? { ...review, status: newStatus }
            : review
        )
      );

      toast({
        title: "Success",
        description: `Feedback ${newStatus === 'approved' ? 'approved' : 'not approved'}`,
      });
    } catch (error: any) {
      console.error('Error updating feedback status:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || 'Failed to update feedback status',
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    return status === 'approved' ? (
      <Badge className="bg-green-500 hover:bg-green-600">
        <CheckCircle className="h-4 w-4 mr-1" />
        Approved
      </Badge>
    ) : (
      <Badge variant="destructive">
        <XCircle className="h-4 w-4 mr-1" />
        Not Approved
      </Badge>
    );
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-10 w-[180px]" />
            </div>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} className="h-5 w-5 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const getFilterLabel = (status: FilterStatus) => {
    switch (status) {
      case 'all':
        return 'All Reviews';
      case 'approved':
        return 'Approved Reviews';
      case 'not_approved':
        return 'Not Approved Reviews';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-8 text-white text-center">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Feedback Review</h1>
          <p className="text-base max-w-2xl mx-auto">
            Manage and moderate customer feedback (Max 3 approved)
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{getFilterLabel(filter)}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Total reviews: {filteredReviews.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilter('all')}>
                    All Reviews
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('approved')}>
                    Approved Reviews
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('not_approved')}>
                    Not Approved Reviews
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={fetchReviews}
                variant="outline"
                className="flex items-center gap-2"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No feedback available</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredReviews.map((review) => (
                <Card key={review._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{review.name}</h3>
                          {getStatusBadge(review.status)}
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {review.email} • {review.phone}
                        </p>
                      </div>
                      <Select
                        value={review.status}
                        onValueChange={(value: 'approved' | 'not_approved') => 
                          updateReviewStatus(review._id, value)
                        }
                        disabled={updating === review._id}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue>
                            {review.status ? (review.status === 'approved' ? 'Approved' : 'Not Approved') : 'Select Status'}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approve</SelectItem>
                          <SelectItem value="not_approved">Not Approve</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{review.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Review;
