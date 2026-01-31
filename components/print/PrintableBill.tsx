
import React from 'react';
import { Order } from '../../types';

interface PrintableBillProps {
  order: Order;
}

const PrintableBill: React.FC<PrintableBillProps> = ({ order }) => {
  // Simple barcode generation using divs - for a real app, a library would be better.
  const generateBarcode = (text: string) => {
    const binary = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
    return (
      <div className="flex h-12">
        {binary.split('').map((bit, index) => (
          <div key={index} className={`w-0.5 ${bit === '1' ? 'bg-black' : 'bg-white'}`}></div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="print-container hidden print:block font-mono text-xs text-black bg-white p-2">
      <div className="text-center mb-2">
        <h1 className="font-bold text-base">One City Grocery</h1>
        <p>Your Trusted Local Store</p>
        <p>---------------------------------</p>
      </div>
      <div className="mb-2">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Address:</strong> {order.customerAddress}</p>
      </div>
      <table className="w-full mb-2">
        <thead>
          <tr className="border-b border-black border-dashed">
            <th className="text-left">Item</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Rate</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td className="text-right">{item.quantity}</td>
              <td className="text-right">{item.priceAtConfirmation.toFixed(2)}</td>
              <td className="text-right">{(item.quantity * item.priceAtConfirmation).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-black border-dashed pt-2">
        <div className="flex justify-between">
          <span>Total Amount:</span>
          <span>{order.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Wallet Used:</span>
          <span>- {order.walletAmountUsed.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-sm mt-1">
          <span>CASH TO PAY:</span>
          <span>{order.cashToPay.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        {generateBarcode(order.id)}
        <p className="tracking-widest">{order.id}</p>
      </div>
      <p className="text-center mt-2">Thank you for shopping with us!</p>
      
      {/* FIX: Replaced non-standard <style jsx> with a standard <style> tag to resolve the compile error.
          Also fixed the print logic by applying the 'print-container' class to this component's root div,
          ensuring the entire bill is visible for printing, and removed a redundant empty div. */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintableBill;
