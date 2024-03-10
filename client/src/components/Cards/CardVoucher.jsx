import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BsTicketPerforated } from 'react-icons/bs';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export const CardVoucher = ({ voucher }) => {
  const [hidePoints, setHidePoints] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // const [recyclingCompanyInfo, setRecyclingCompanyInfo] = useState(null);
  const [nombreStore, setNombreStore] = useState(null);

  const fecha = new Date(voucher.duracion.fin);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  const fechaFormateada = `válido al ${dia}/${mes < 10 ? '0' : ''}${mes}/${anio}`;
  useEffect(() => {
    if (!hidePoints) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  }, [hidePoints]);

  // useEffect(() => {
  //   const fetchRecyclingCompanyInfo = async () => {
  //     try {
  //       const response = await fetch(
  //         `${baseUrl}/recyclingcompany/FindRecyclingCompany/${voucher.recyclingcompany}`
  //       );

  //       const data = await response.json();

  //       setRecyclingCompanyInfo(data);
  //     } catch (error) {
  //       console.error('Error al obtener la información de la empresa de reciclaje:', error);
  //     }
  //   };

  //   fetchRecyclingCompanyInfo();
  // }, [voucher.recyclingcompany]);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        const response = await fetch(`${baseUrl}/stores/${voucher.stores[0]}`);

        const data = await response.json();

        setNombreStore(data.nombrestore);
      } catch (error) {
        console.error('Error al obtener la información de la empresa de reciclaje:', error);
      }
    };

    fetchStoreInfo();
  }, []);

  return (
    <div className="bg-white p-3 rounded-xl flex gap-x-5 items-center">
      <img src="" alt="" className="min-w-[95px] h-[95px] bg-gray-200" />
      <div className="flex flex-col w-full gap-y-1">
        <p className="text-xl font-bold">{voucher.titulo}</p>
        <p>
          <strong>{nombreStore}</strong> - {fechaFormateada}
        </p>

        {hidePoints
          ? (
          <div className="flex flex-row justify-between ">
            <p className="text-base flex items-center gap-x-1">
              <span className="text-xl">
                <BsTicketPerforated />
              </span>
              {voucher.ptoscanjevoucher ? voucher.ptoscanjevoucher : '200'} Puntos
            </p>
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
              #{voucher.codigo}
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

CardVoucher.propTypes = {
  voucher: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    codigo: PropTypes.string,
    ptoscanjevoucher: PropTypes.string,
    stores: PropTypes.any,
    duracion: PropTypes.any,
    recyclingcompany: PropTypes.string.isRequired,
  }).isRequired,
};
