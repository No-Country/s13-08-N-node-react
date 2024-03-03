import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenuSharp } from 'react-icons/io5';
import { CardVoucher } from '../../components/Cards/CardVoucher';

export default function UserVoucher() {
  const [vouchers, setVouchers] = useState([]);
  const [voucherIds, setVoucherIds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://points-89az.onrender.com/vouchers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const ids = data.map((voucher) => voucher._id);
        setVoucherIds(ids);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = voucherIds.map(async (id) => {
          const response = await fetch(`https://points-89az.onrender.com/vouchers/${id}`);
          if (!response.ok) {
            throw new Error(`Error al obtener datos para el ID ${id}`);
          }
          return response.json();
        });

        const results = await Promise.all(promises);
        setVouchers(results);
      } catch (error) {
        console.error('Error al obtener datos de los vouchers:', error);
      }
    };

    fetchData();
  }, [voucherIds]);

  // console.log(vouchers);

  return (
    <div className="h-[100vh] pt-40 bg-bgGreen text-darkBlue">
      <div className="fixed top-0 w-full z-50 bg-darkBlue border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-7 pt-10 flex justify-between items-center text-white">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-5">
            <div className="relative bg-gray-100 w-[100px] h-[100px] rounded-full mx-auto">
              <img src="" alt="" className="" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Andreina Godoy</p>
              <Link to={'/user/configuration/edit'} className="text-sm underline">
                Editar perfil
              </Link>
            </div>
          </div>
          <span className="text-2xl">
            <IoMenuSharp />
          </span>
        </div>
      </div>

      <div className="px-5 mt-10">
        <p className="text-xl font-bold mb-4">Para canjear</p>
        <div className="flex flex-col gap-y-5">
          {vouchers.length > 0 && vouchers.map((voucher, index) => <CardVoucher voucher={voucher} key={index} />)}
        </div>
      </div>
    </div>
  );
}
