import React from 'react'
import { Link } from 'react-router-dom';
import { IoBusinessOutline } from 'react-icons/io5';
import { LuUser2 } from 'react-icons/lu';

export default function Auth() {
    return (
        <div className='flex flex-col gap-y-7'>
            <div className="flex flex-col gap-y-4 px-5">
                <Link to="/auth/login" className="bg-greenMain text-white rounded-lg py-2 text-center text-base">
                    Inicio de sesión
                </Link>
                <Link to="/auth/register" className="bg-white text-greenMain rounded-lg py-2 text-center text-base border border-greenMain">
                    Registro
                </Link>
            </div>

            <button className="text-sm underline text-darkMain">Continuar como invitado</button>

            <div className="flex justify-between">
                <a href="#" className="bg-green-100 w-full text-darkMain text-xs py-2 rounded-xl flex flex-col items-center">
                    <span className="text-base"><LuUser2 /></span>Usuario
                </a>
                <a href="#" className=" w-full text-darkMain text-xs py-2 rounded-xl flex flex-col items-center">
                    <span className="text-base"><IoBusinessOutline /></span>Empresa
                </a>
            </div>
    </div>
    )
}