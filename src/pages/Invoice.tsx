import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import jsPDF from "jspdf";

interface Charge {
  description: string;
  amount: string;
}

interface InvoiceData {
  customerName: string;
  phone: string;
  email: string;
  from: string;
  to: string;
  travelDate: string;
  returnDate: string;
  vehicleType: string;
  driverCharge: string;
  charges: Charge[];
  isPaid: boolean;
  invoiceNumber: string;
}

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    customerName: "",
    phone: "",
    email: "",
    from: "",
    to: "",
    travelDate: "",
    returnDate: "",
    vehicleType: "",
    driverCharge: "",
    charges: [],
    isPaid: false,
    invoiceNumber: `INV-${new Date().getTime()}`
  });

  const [newCharge, setNewCharge] = useState<Charge>({
    description: "",
    amount: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    const driverCharge = Number(invoiceData.driverCharge || 0);
    const additionalCharges = invoiceData.charges.reduce((sum, charge) => 
      sum + Number(charge.amount || 0), 0);
    return driverCharge + additionalCharges;
  };

  const formatCurrency = (amount: string | number): string => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `₹ ${numAmount}/-`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCharge = () => {
    if (newCharge.description && newCharge.amount) {
      setInvoiceData(prev => ({
        ...prev,
        charges: [...prev.charges, {
          description: newCharge.description,
          amount: newCharge.amount
        }]
      }));
      setNewCharge({
        description: "",
        amount: ""
      });
    } else {
      alert("Please enter both description and amount");
    }
  };

  const destinations = [
    "Dehradun", "Mussoorie", "Haridwar", "Rishikesh", "Dhanaulti",
    "Delhi (NCR)", "Agra", "Jaipur", "Manali", "Shimla"
  ];

  const vehicleTypes = [
    "Sedan", "SUV", "Luxury Sedan", "Luxury SUV",
    "Tempo Traveller", "Mini Bus", "Bus"
  ];

  const paymentMethods = [
    "Cash", "UPI", "Bank Transfer", "Credit Card", "Debit Card"
  ];

  const generatePDF = async () => {
    try {
      setIsLoading(true);
      const doc = new jsPDF();
      let y = 20;

      // Company Header
      doc.setFontSize(22);
      doc.setTextColor(0, 100, 0);
      doc.setFont("helvetica", 'bold');
      doc.text("UTTARAKHAND ROAD TRIPS", 105, y, { align: "center" });
      
      // Tagline
      doc.setFontSize(10);
      doc.setTextColor(70, 70, 70);
      doc.text("Your Ultimate Adventure Partner in Uttarakhand", 105, y + 8, { align: "center" });

      // Add separator line
      y += 15;
      doc.setDrawColor(0, 100, 0);
      doc.setLineWidth(0.5);
      doc.line(15, y, 195, y);

      // Company Details - Left Side
      y += 15;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", 'bold');
      doc.text("Address:", 15, y);
      doc.setFont("helvetica", 'normal');
      doc.text([
        "Village Kot, Post Office Budhna",
        "Pauri Garhwal, Uttarakhand",
        "Pin Code: 246165"
      ], 15, y + 5);

      // Contact Details - Right Side
      doc.setFont("helvetica", 'bold');
      doc.text("Contact Details:", 120, y);
      doc.setFont("helvetica", 'normal');
      doc.text([
        "Mobile: +91 7017691890",
        "Email: info@uttarakhandroadtrips.com",
        "GSTIN: 05BQWPK2436R1ZL"
      ], 120, y + 5);

      // Invoice Details
      y += 25;
      doc.setFontSize(11);
      doc.setFont("helvetica", 'bold');
      doc.text(`Invoice No: ${invoiceData.invoiceNumber}`, 15, y);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, y);

      // Customer Details
      y += 15;
      doc.setFontSize(12);
      doc.setFont("helvetica", 'bold');
      doc.text("CUSTOMER DETAILS", 15, y);
      
      y += 7;
      doc.setFontSize(10);
      doc.setFont("helvetica", 'normal');
      doc.text([
        `Name: ${invoiceData.customerName}`,
        `Phone: ${invoiceData.phone}`,
        `Email: ${invoiceData.email || 'N/A'}`
      ], 15, y);

      // Trip Details
      y += 25;
      doc.setFontSize(12);
      doc.setFont("helvetica", 'bold');
      doc.text("TRIP DETAILS", 15, y);
      
      y += 7;
      doc.setFontSize(10);
      doc.setFont("helvetica", 'normal');
      doc.text(`From: ${invoiceData.from}`, 15, y);
      doc.text(`To: ${invoiceData.to}`, 105, y);
      
      y += 7;
      doc.text(`Travel Date: ${invoiceData.travelDate}`, 15, y);
      doc.text(`Return Date: ${invoiceData.returnDate}`, 105, y);
      
      y += 7;
      doc.text(`Vehicle Type: ${invoiceData.vehicleType}`, 15, y);

      // Charges Section
      y += 15;
      doc.setFontSize(14);
      doc.setFont("helvetica", 'bold');
      doc.text("CHARGES", 15, y);
      
      y += 10;
      doc.setFontSize(11);
      doc.setFont("helvetica", 'normal');

      // Driver Charge
      doc.text("Driver Charge:", 15, y);
      doc.text(`₹ ${invoiceData.driverCharge}/-`, 170, y, { align: 'right' });

      // Additional Charges
      let total = Number(invoiceData.driverCharge || 0);
      if (invoiceData.charges && invoiceData.charges.length > 0) {
        invoiceData.charges.forEach((charge) => {
          y += 8;
          doc.text(`${charge.description}:`, 15, y);
          doc.text(`₹ ${charge.amount}/-`, 170, y, { align: 'right' });
          total += Number(charge.amount);
        });
      }

      // Total
      y += 10;
      doc.line(15, y, 195, y);
      y += 8;
      doc.setFont("helvetica", 'bold');
      doc.text("Total Amount:", 15, y);
      doc.text(`₹ ${total}/-`, 170, y, { align: 'right' });

      // Paid Stamp if applicable
      if (invoiceData.isPaid) {
        doc.saveGraphicsState();
        doc.setGState({ opacity: 0.3 });
        doc.setTextColor(0, 150, 0);
        doc.setFontSize(40);
        doc.text("PAID", 105, 140, {
          align: 'center',
          angle: 45
        });
        doc.restoreGraphicsState();
        doc.setTextColor(0, 0, 0);
      }

      // Terms and Conditions
      y += 20;
      doc.setFontSize(11);
      doc.setFont("helvetica", 'bold');
      doc.text("Terms & Conditions:", 15, y);
      
      y += 7;
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.text([
        "1. Payment is non-refundable",
        "2. Driver allowance and toll taxes are extra",
        "3. Fuel charges are included in the total amount"
      ], 15, y);

      // Signature section
      y = doc.internal.pageSize.height - 35;
      doc.line(20, y, 80, y);
      doc.line(140, y, 190, y);
      y += 5;
      doc.setFontSize(10);
      doc.text("Customer Signature", 30, y);
      doc.text("Owner", 155, y);
      
      y += 5;
      doc.setFontSize(8);
      doc.text("Shubham Panwar & Sachin Choudhary", 165, y, { align: 'center' });

      // Save the PDF
      const fileName = `${invoiceData.customerName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${invoiceData.invoiceNumber}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Generate Invoice</h2>
        
        {/* Customer Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <Input
                required
                name="customerName"
                value={invoiceData.customerName}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <Input
                required
                name="phone"
                value={invoiceData.phone}
                onChange={handleInputChange}
                placeholder="Contact Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                type="email"
                name="email"
                value={invoiceData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
              />
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Trip Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From <span className="text-red-500">*</span>
              </label>
              <select
                name="from"
                value={invoiceData.from}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Location</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To <span className="text-red-500">*</span>
              </label>
              <select
                name="to"
                value={invoiceData.to}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Location</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                name="travelDate"
                value={invoiceData.travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Return Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                name="returnDate"
                value={invoiceData.returnDate}
                min={invoiceData.travelDate || new Date().toISOString().split('T')[0]}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type <span className="text-red-500">*</span>
              </label>
              <select
                name="vehicleType"
                value={invoiceData.vehicleType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Vehicle</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Charges Section */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Charges</h3>
          
          {/* Driver Charge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">₹</span>
              <Input
                name="driverCharge"
                placeholder="Driver Charge Amount"
                type="number"
                value={invoiceData.driverCharge}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Additional Charges */}
          <div className="space-y-4">
            <h4 className="font-medium">Additional Charges</h4>
            
            {/* Display existing charges */}
            {invoiceData.charges.map((charge, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{charge.description}:</span>
                <span className="font-mono">₹ {charge.amount}/-</span>
              </div>
            ))}

            {/* Add new charge form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <Input
                placeholder="Charge Description"
                value={newCharge.description}
                onChange={(e) => setNewCharge(prev => ({ 
                  ...prev, 
                  description: e.target.value 
                }))}
              />
              <div className="flex items-center gap-2">
                <span className="text-lg">₹</span>
                <Input
                  placeholder="Amount"
                  type="number"
                  value={newCharge.amount}
                  onChange={(e) => setNewCharge(prev => ({ 
                    ...prev, 
                    amount: e.target.value 
                  }))}
                />
              </div>
              <Button 
                onClick={handleAddCharge}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Add Charge
              </Button>
            </div>
          </div>

          {/* Total Display */}
          <div className="mt-4 text-right font-bold">
            <span className="font-mono">
              Total: ₹ {calculateTotal()}/-
            </span>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mb-8">
          <div className="flex items-center">
            <Checkbox
              checked={invoiceData.isPaid}
              onCheckedChange={(checked) => setInvoiceData({ ...invoiceData, isPaid: checked as boolean })}
              id="paid"
            />
            <label htmlFor="paid" className="ml-2 text-sm font-medium text-gray-700">
              Mark as Paid
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generatePDF}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!invoiceData.customerName || !invoiceData.from || !invoiceData.to || !invoiceData.travelDate || isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Invoice'}
        </Button>
      </div>
    </div>
  );
};

export default Invoice;