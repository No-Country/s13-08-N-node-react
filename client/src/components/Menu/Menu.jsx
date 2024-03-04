import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, NotificationIcon, ProfileIcon, RecycleIcon, ScanIcon, TicketIcon } from '../../assets';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'universal-cookie';

export const Menu = () => {
  const authContext = useContext(AuthContext);
  const { isCompany } = authContext;
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [emailUser, setEmailUser] = useState('');

  const handleLinkClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenInput = () => {
    setOpenInput(!openInput);
  };

  const handleEmailUser = (e) => {
    setEmailUser(e.target.value);
  };

  const handleSendCookies = () => {
    cookies.set('email', emailUser);
    setEmailUser('');
    setIsModalOpen(!isModalOpen);
    navigate('/company/scan-qr/form-ticket');
  };

  return (
    <>
      <div className="fixed bottom-0 w-full z-[1000] bg-white border-t border-gray-500 shadow-md rounded-t-[40px] py-3">
        <ul className="flex flex-row justify-around items-center p-2">
          <li>
            <Link
              to={isCompany ? '/company' : '/user'}
              className="text-gray-600 hover:text-gray-800 flex flex-col items-center"
            >
              <HomeIcon />
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to={isCompany ? '/#' : '/user/vales'}
              className="text-gray-600 hover:text-gray-800 flex flex-col items-center"
            >
              <TicketIcon />
              Vales
            </Link>
          </li>
          <li className="relative flex justify-center">
            {isCompany
              ? (
              <button
                onClick={handleLinkClick}
                className="w-[75px] h-[75px] bg-slate-800 rounded-full flex justify-center items-center absolute -top-20 -left-7 border-[5px] border- border-white"
              >
                <ScanIcon className="text-white" />
              </button>
                )
              : (
              <Link
                to="/user/map"
                className="w-[75px] h-[75px] bg-slate-800 rounded-full flex justify-center items-center absolute -top-20 -left-7 border-[5px] border- border-white"
              >
                <RecycleIcon className="text-white" />
              </Link>
                )}
            {isModalOpen && (
              <div className="absolute bottom-20 bg-white border rounded-xl p-5 flex flex-col w-[300px]">
                <h2 className="text-sm font-bold mb-2">Escaneo de QR para Canje de Puntos</h2>
                <p className="text-xs mb-2">
                  * Escanea el QR o ingresa el correo electrónico del usuario para canjear sus puntos acumulados y
                  otorgar las recompensas correspondientes.
                </p>
                <Link
                  to="/company/scan-qr"
                  onClick={handleLinkClick}
                  className="bg-darkBlue text-center font-semibold py-2 rounded-lg text-sm text-white"
                >
                  Escanea el código QR
                </Link>
                <div className="flex justify-between items-center text-black text-lg">
                  <hr className="w-[45%] border-black" />
                  <span>o</span>
                  <hr className="w-[45%] border-black" />
                </div>
                <div className={`text-center ${openInput ? '' : 'hidden'}`}>
                  <div className="flex justify-between">
                    <input
                      type="email"
                      placeholder="Ingresa el correo electrónico"
                      value={emailUser}
                      onChange={handleEmailUser}
                      className="border border-darkBlue py-1 px-2 rounded-lg w-2/3 text-sm font-semibold"
                    />
                    <button onClick={handleSendCookies} className="bg-darkBlue text-white px-3 rounded-lg">
                      Enviar
                    </button>
                  </div>
                  <button onClick={handleOpenInput} className="text-xl p-2">
                    x
                  </button>
                </div>
                <button
                  onClick={handleOpenInput}
                  className={`bg-darkBlue text-center font-semibold py-2 rounded-lg text-sm text-white ${openInput ? 'hidden' : ''}`}
                >
                  Ingresa manualmente el correo electrónico
                </button>
              </div>
            )}
          </li>
          <li>
            <Link to="/notification" className="text-gray-600 hover:text-gray-800 flex flex-col items-center">
              <NotificationIcon />
              Notificación
            </Link>
          </li>
          <li>
            <Link
              to={isCompany ? '/#' : '/user/perfil'}
              className="text-gray-600 hover:text-gray-800 flex flex-col items-center"
            >
              <ProfileIcon />
              Perfil
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
