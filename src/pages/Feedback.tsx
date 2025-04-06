import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Logo from "../components/Logo";

const Feedback = () => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const destinations = [
    "All India",
    "We'll decide later",
    "Dehradun",
    "Mussoorie",
    "Haridwar",
    "Rishikesh",
    "Kana Tal",
    "Dhanaulti",
    "Saharanpur",
    "Delhi (NCR)",
    "Agra (Taj Mahal)",
    "Jaipur (Pink City)",
    "Udaipur (City of Lakes)",
    "Varanasi (Spiritual Capital)",
    "Amritsar (Golden Temple)",
    "Mumbai (Financial Capital)",
    "Goa (Beach Paradise)",
    "Kerala (God's Own Country)",
    "Manali (Himalayan Paradise)",
    "Shimla (Queen of Hills)",
    "Darjeeling (Tea Paradise)"
  ];

  const backgroundImages = [
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop", // Uttarakhand mountains
    "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=2069&auto=format&fit=crop", // Rishikesh
    "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=2070&auto=format&fit=crop", // Auli
    "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?q=80&w=2070&auto=format&fit=crop", // Valley of Flowers
    "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?q=80&w=2070&auto=format&fit=crop", // Nainital
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://trsvbackend.vercel.app/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          rating,
          message: experience
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit feedback. Please try again later.');
      }

      setShowThankYou(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setStep(1);
        setDestination('');
        setName('');
        setExperience('');
        setRating(0);
        setShowThankYou(false);
        setEmail('');
        setPhone('');
        setError(null);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Where are you going?</h2>
            <p className="text-gray-600 mb-6 text-center">Select your destination to continue</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (destination) setStep(2);
            }}>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                required
              >
                <option value="">Select destination</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue
              </button>
            </form>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Welcome!</h2>
            <p className="text-gray-600 mb-6 text-center">Please enter your details to continue</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (name.trim() && email.trim() && phone.trim()) setStep(3);
            }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                required
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue
              </button>
            </form>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Share Your Experience</h2>
            <p className="text-gray-600 mb-6 text-center">Tell us about your experience with our service</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (experience.trim()) setStep(4);
            }}>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Your experience..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 h-32"
                required
              />
              <button
                type="submit"
                className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue
              </button>
            </form>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Rate Us</h2>
            <p className="text-gray-600 mb-6 text-center">How would you rate our service?</p>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={rating === 0 || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-blue-900/30 to-green-900/40"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(30, 64, 175, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(34, 197, 94, 0.4) 100%)",
              "linear-gradient(45deg, rgba(34, 197, 94, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(30, 64, 175, 0.4) 100%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Animated Background Images */}
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.7,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 1, 0],
              opacity: [0.7, 0.8, 0.7],
            }}
            transition={{
              duration: 15 + index * 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 1.5,
            }}
          />
        ))}

        {/* Animated Overlay Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full backdrop-blur-sm"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Animated Light Rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{
              transform: `rotate(${i * 45}deg)`,
              transformOrigin: "center",
            }}
            animate={{
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Logo className="text-white" />
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-primary-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            Question {step} of {totalSteps}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showThankYou ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {renderStep()}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
              <p className="text-xl text-gray-600">
                Your feedback is valuable to us.
                <br />
                Redirecting to Google...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feedback; 