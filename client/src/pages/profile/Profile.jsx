import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar';

import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { MdOutlineSecurity } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";




export default function CompanyProfile() {
    return (
        <div className='h-[100vh] pt-40'>

            <div className="fixed top-0 w-full z-50 bg-white border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-7 pt-10 flex justify-between items-center">
                <div className='flex justify-between items-center w-full'>
                    <p className='text-2xl font-medium'>Configuración</p>
                    <span className='text-xl'><IoChevronBack /></span>
                </div>
            </div>

            <div className='flex flex-col px-5 gap-y-3'>
                <Link to={'edit'} className='bg-white p-4 rounded-xl flex items-center gap-x-2'><span><CgProfile /></span>Editar perfil</Link>
                <Link className='bg-white p-4 rounded-xl flex items-center gap-x-2'><span><MdOutlineSecurity /></span>Seguridad</Link>
                <Link className='bg-white p-4 rounded-xl flex items-center gap-x-2'><span><MdOutlinePolicy /></span>Términos y Políticas</Link>
                <Link className='bg-white p-4 rounded-xl flex items-center gap-x-2'><span><RiCustomerService2Fill /></span>FAQ y soporte</Link>
                <Link className='bg-white p-4 rounded-xl flex items-center gap-x-2'><span><BiLogOutCircle /></span>Cerrar sesión</Link>
            </div>
        </div>
    )
}