import React, { useEffect, useState } from 'react';
import { CardVoucher } from '../../components/Cards/CardVoucher';
import { Navbar } from '../../components/Navbar/Navbar';
import Cookies from 'universal-cookie';

export default function UserVoucher() {
  const [vouchers, setVouchers] = useState([]);
  const [voucherIds, setVoucherIds] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const cookies = new Cookies();
  const usuarioNombre = cookies.get('name');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}/vouchers`);
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
          const response = await fetch(`${baseUrl}/vouchers/${id}`);
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
    <div className="h-[100vh] pt-40  bg-bgGreen text-darkBlue">
      <Navbar name={usuarioNombre} />
      <div className="px-5 pb-36">
        <p className="text-xl font-bold mb-4">Para canjear</p>
        <div className="flex flex-col gap-y-5 ">
          {vouchers.length > 0 && vouchers.map((voucher, index) => <CardVoucher voucher={voucher} key={index} />)}
        </div>
      </div>
    </div>
  );
}
