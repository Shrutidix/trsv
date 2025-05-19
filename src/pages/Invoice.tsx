import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import html2canvas from 'html2canvas';

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
  paymentMethod: string;
  upiId: string;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
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
    invoiceNumber: `INV-${new Date().getTime()}`,
    paymentMethod: "",
    upiId: "",
    bankDetails: {
      accountName: "UTTARAKHAND TRIPS",
      accountNumber: "520101251541249",
      ifscCode: "UBIN0556459",
      bankName: "Union Bank"
    }
  });

  const [newCharge, setNewCharge] = useState<Charge>({
    description: "",
    amount: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

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

  const handlePaymentMethodChange = (value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      paymentMethod: value,
      isPaid: false
    }));
  };

  const handleUPIIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceData(prev => ({
      ...prev,
      upiId: e.target.value
    }));
  };

  const generateUPIQRCode = () => {
    const upiUrl = `upi://pay?pa=${invoiceData.upiId}&pn=UTTARAKHAND TRIPS&am=${calculateTotal()}&cu=INR`;
    setQrCodeUrl(upiUrl);
    setShowQRCode(true);
  };

  const generatePDF = async () => {
    try {
      setIsLoading(true);
      const doc = new jsPDF();
      let y = 20;

      // Company Header
      doc.setFontSize(22);
      doc.setTextColor(0, 100, 0);
      doc.setFont("helvetica", 'bold');
      doc.text("UTTARAKHAND TRIPS", 105, y, { align: "center" });
      
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
        "Mobile: +91 8077757674",
        "Email: info@uttarakhandtrips.com",
        "GSTIN: 05DHJPK8346A2ZF"
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

      // Payment Details Section
      y += 15;
      doc.setFontSize(12);
      doc.setFont("helvetica", 'bold');
      doc.text("PAYMENT DETAILS", 15, y);
      
      y += 7;
      doc.setFontSize(10);
      doc.setFont("helvetica", 'normal');
      
      if (invoiceData.isPaid) {
        // For paid invoices, just show the payment status
        doc.text(`Payment Status: Paid via ${invoiceData.paymentMethod || 'Cash'}`, 15, y);
        
        // Add a large "PAID" stamp
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.3 }));
        doc.setTextColor(0, 150, 0);
        doc.setFontSize(72);
        doc.text("PAID", 105, 140, {
          align: 'center',
          angle: 45
        });
        doc.restoreGraphicsState();
        doc.setTextColor(0, 0, 0);
        
        y += 10; // Add some spacing after payment status
      } else {
        // For unpaid invoices, show payment method and details
        doc.text(`Payment Method: ${invoiceData.paymentMethod || 'Not Selected'}`, 15, y);
        
        if (invoiceData.paymentMethod === "UPI" && invoiceData.upiId) {
          y += 7;
          doc.text(`UPI ID: ${invoiceData.upiId}`, 15, y);
          
          // Add QR Code to PDF only if UPI ID exists
          if (showQRCode && qrCodeUrl) {
            const qrDiv = document.createElement('div');
            const qrElement = document.querySelector('.qr-code-svg');
            
            if (qrElement) {
              qrDiv.innerHTML = `<svg>${qrElement.innerHTML}</svg>`;
              qrDiv.style.width = '1000px';
              qrDiv.style.height = '1000px';
              document.body.appendChild(qrDiv);
              
              try {
                const canvas = await html2canvas(qrDiv, {
                  scale: 4,
                  backgroundColor: '#ffffff',
                  width: 1000,
                  height: 1000
                });
                
                const imgData = canvas.toDataURL('image/png');
                const pageWidth = doc.internal.pageSize.getWidth();
                const qrCodeSize = 120;
                const xPos = (pageWidth - qrCodeSize) / 2;
                doc.addImage(imgData, 'PNG', xPos, y - 5, qrCodeSize, qrCodeSize);
                
                doc.setFontSize(11);
                const qrCenterX = xPos + (qrCodeSize / 2);
                doc.text("Scan to pay", qrCenterX, y + qrCodeSize + 5, { align: 'center' });
                doc.setFontSize(12);
                doc.text(`₹ ${calculateTotal()}/-`, xPos, y + qrCodeSize + 12, { align: 'left' });
                
                y += qrCodeSize + 20;
              } catch (error) {
                console.error('QR Code generation error:', error);
              } finally {
                document.body.removeChild(qrDiv);
              }
            }
          }
        } else if (invoiceData.paymentMethod === "Bank Transfer") {
          y += 7;
          doc.text("Bank Details:", 15, y);
          y += 5;
          doc.text(`Bank Name: ${invoiceData.bankDetails.bankName}`, 15, y);
          y += 5;
          doc.text(`Account Name: ${invoiceData.bankDetails.accountName}`, 15, y);
          y += 5;
          doc.text(`Account Number: ${invoiceData.bankDetails.accountNumber}`, 15, y);
          y += 5;
          doc.text(`IFSC Code: ${invoiceData.bankDetails.ifscCode}`, 15, y);
          y += 10;
        }
      }

      // Terms and Conditions
      y += 15;
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
      alert('Failed to generate PDF. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
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
      <input
        type="text"
        name="from"
        value={invoiceData.from}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        placeholder="Enter departure location"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        To <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="to"
        value={invoiceData.to}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        placeholder="Enter destination location"
      />
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

          {/* Payment Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPaid"
                  checked={invoiceData.isPaid}
                  onCheckedChange={(checked) => 
                    setInvoiceData(prev => ({ ...prev, isPaid: checked as boolean }))
                  }
                />
                <Label htmlFor="isPaid">Payment Received</Label>
              </div>

              {!invoiceData.isPaid && (
                <>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={invoiceData.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="UPI" id="upi" />
                        <Label htmlFor="upi">UPI</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Bank Transfer" id="bank" />
                        <Label htmlFor="bank">Bank Transfer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Cash" id="cash" />
                        <Label htmlFor="cash">Cash</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {invoiceData.paymentMethod === "UPI" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          value={invoiceData.upiId}
                          onChange={handleUPIIdChange}
                          placeholder="Enter UPI ID"
                          className="w-full"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={generateUPIQRCode}
                        className="w-full"
                        disabled={!invoiceData.upiId}
                      >
                        Generate QR Code
                      </Button>
                      {showQRCode && qrCodeUrl && (
                        <div className="flex flex-col items-center p-6 bg-white rounded-lg border">
                          <QRCodeSVG
                            value={qrCodeUrl}
                            size={300}
                            level="H"
                            includeMargin={true}
                            className="qr-code-svg"
                          />
                          <p className="mt-4 text-base text-gray-600">Scan to pay ₹{calculateTotal()}/-</p>
                        </div>
                      )}
                    </div>
                  )}

                  {invoiceData.paymentMethod === "Bank Transfer" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold">Bank Details</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Bank Name:</span> {invoiceData.bankDetails.bankName}</p>
                        <p><span className="font-medium">Account Name:</span> {invoiceData.bankDetails.accountName}</p>
                        <p><span className="font-medium">Account Number:</span> {invoiceData.bankDetails.accountNumber}</p>
                        <p><span className="font-medium">IFSC Code:</span> {invoiceData.bankDetails.ifscCode}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
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

      <Footer />
    </div>
  );
};

export default Invoice;