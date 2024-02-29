import React, { useState } from 'react';
import { BsTicketPerforated } from 'react-icons/bs';

export default function CardVoucher() {
  const [hidePoints, setHidePoints] = useState(true);

  return (
    <div className="bg-white p-3 rounded-xl flex gap-x-5 items-center">
      <img src="" alt="" className="min-w-[95px] h-[95px] bg-gray-200" />
      <div className="flex flex-col gap-y-1">
        <p className="text-xl font-medium">Voucher</p>
        <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sunt molestiae</p>
        {hidePoints
          ? (
          <div className="flex justify-between">
            <p className="text-base flex items-center gap-x-1">
              <span className="text-xl">
                <BsTicketPerforated />
              </span>
              200 Puntos
            </p>
            <button onClick={() => setHidePoints(!hidePoints)} className="bg-black text-white px-4 rounded-lg">
              Canje
            </button>
          </div>
            )
          : (
          <div className="flex justify-between">
            <p className="text-base flex items-center gap-x-1">
              <span className="text-xl">
                <BsTicketPerforated />
              </span>
              #12514
            </p>
            <button
              onClick={() => setHidePoints(!hidePoints)}
              className="border border-black text-black px-4 rounded-lg"
            >
              Canjeado
            </button>
          </div>
            )}
      </div>
    </div>
  );
}
