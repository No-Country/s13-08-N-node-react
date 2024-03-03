import React, { useEffect, useState } from 'react';
import { BsTicketPerforated } from 'react-icons/bs';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export const CardVoucher = () => {
  const [hidePoints, setHidePoints] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!hidePoints) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  }, [hidePoints]);

  return (
    <div className="bg-white p-3 rounded-xl flex gap-x-5 items-center">
      <img src="" alt="" className="min-w-[95px] h-[95px] bg-gray-200" />
      <div className="flex flex-col gap-y-1">
        <p className="text-xl font-medium">Voucher</p>
        <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sunt molestiae</p>
        {hidePoints
          ? (
          <div className="flex justify-between">
            <p className="text-base flex items-center gap-x-1"><span className="text-xl"><BsTicketPerforated /></span>200 Puntos</p>
            <button onClick={() => setHidePoints(!hidePoints)} className="bg-greenMain text-darkBlue px-4 rounded-lg">
              Canjear
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
              className="border border-darkBlue text-darkBlue px-4 rounded-lg"
            >
              Canjeado
            </button>
          </div>
            )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xl w-full mx-10 py-14 flex flex-col items-center gap-y-3">
            <p className="text-3xl">Canjeado</p>
            <IoMdCheckmarkCircleOutline className="text-8xl" />
          </div>
        </div>
      )}
    </div>
  );
};
