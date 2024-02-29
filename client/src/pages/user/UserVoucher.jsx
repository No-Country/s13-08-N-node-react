import React from 'react'
import { Link } from 'react-router-dom'
import { IoMenuSharp } from "react-icons/io5";
import CardVoucher from '../../components/Cards/CardVoucher';

export default function UserVoucher() {


    return (
        <div className='h-[100vh] pt-40'>




            <div className="fixed top-0 w-full z-50 bg-white border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-7 pt-10 flex justify-between items-center">
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-x-5'>
                        <div className='relative bg-gray-100 w-[100px] h-[100px] rounded-full mx-auto'>
                            <img src="" alt="" className=''/>
                        </div>
                        <div>
                            <p className='text-2xl font-semibold'>Andreina Godoy</p>
                            <Link to={'/company/profile/edit'} className='text-sm underline'>Editar perfil</Link>
                        </div>
                    </div>
                    <span className='text-2xl'><IoMenuSharp /></span>
                </div>
            </div>



            <div className='px-5 mt-10'>
                <p className='text-xl font-bold mb-4'>Para canjear</p>
                <div className='flex flex-col gap-y-5'>
                    <CardVoucher/>
                    <CardVoucher/>
                    <CardVoucher/>
                </div>
            </div>
        </div>
    )
}