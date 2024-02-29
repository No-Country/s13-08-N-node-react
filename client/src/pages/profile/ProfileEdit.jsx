import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { IoMenuSharp } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
export default function ProfileEdit() {
    return (
        <div className='h-[100vh] pt-40'>

            <div className="fixed top-0 w-full z-50 bg-white border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-7 pt-10 flex justify-between items-center">

                <div className='w-full'>
                    <span className='text-2xl flex justify-end'><IoMenuSharp /></span>
                    <div className='relative bg-gray-100 w-[100px] h-[100px] rounded-full mx-auto'>
                        <img src="" alt="" className=''/>
                        <span className='absolute bottom-1 right-1 text-xl text-[#757171]'><FaCamera /></span>
                    </div>
                </div>

            </div>

            <form className='mt-20 px-7 flex flex-col gap-y-4'>
                <div className='flex flex-col'>
                    <label className='text-sm mb-2'>Nombre</label>
                    <input type="text" placeholder='' className='p-2 rounded-[10px]'/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm mb-2'>Correo</label>
                    <input type="text" placeholder='' className='p-2 rounded-[10px]'/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm mb-2'>Dirección</label>
                    <input type="text" placeholder='' className='p-2 rounded-[10px]'/>
                </div>
            </form>
        </div>
    )
}