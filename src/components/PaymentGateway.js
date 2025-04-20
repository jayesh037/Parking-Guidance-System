import React, { useState } from 'react';
import { CreditCard, QrCode } from 'lucide-react';

const PaymentGateway = ({
  amount,
  onPaymentComplete,
  onPaymentCancel,
  merchantName = "Merchant",
  upiId = "jayeshsinghal037@oksbi",
  transactionNote = "Payment"
}) => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const getUPIQRCode = (amount) => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      merchantName
    )}&am=${amount}&tn=${encodeURIComponent(transactionNote)}`;

    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      upiUrl
    )}`;
  };

  return (
    <div>
      <div className="payment-header">
        <h2 className="text-2xl font-bold text-gray-900">Payment Required</h2>
      </div>

      <div className="payment-content">
        <div className="amount-display">
          <p>Total Amount</p>
          <p>₹{amount}</p>
        </div>

        {!paymentMethod ? (
          <div className="payment-methods">
            <button
              onClick={() => setPaymentMethod("upi")}
              className="payment-method-btn upi"
            >
              <QrCode className="w-5 h-5" />
              Pay with UPI
            </button>
            <button
              onClick={() => setPaymentMethod("card")}
              className="payment-method-btn card"
            >
              <CreditCard className="w-5 h-5" />
              Pay with Card
            </button>
          </div>
        ) : paymentMethod === "upi" ? (
          <div className="qr-section">
            <img
              src={getUPIQRCode(amount)}
              alt="UPI QR Code"
            />
            <p>Scan this QR code with any UPI app to pay</p>
          </div>
        ) : (
          <div className="card-section">
            <CreditCard className="w-16 h-16 text-blue-600" />
            <p>Process card payment at the terminal</p>
          </div>
        )}
      </div>

      <div className="payment-footer">
        <div className="action-buttons">
          <button
            onClick={() => setPaymentMethod(null)}
            className="back-btn"
          >
            Back
          </button>
          <button
            onClick={onPaymentComplete}
            className="confirm-btn"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway; 