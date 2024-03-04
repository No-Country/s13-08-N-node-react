import React from 'react';
import QrReader from '../../components/qrreader/QrReader';

export const ScanPage = () => {
  return (
    <div className="w-full h-screen">
      <QrReader />
    </div>
  );
};
