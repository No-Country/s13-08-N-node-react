import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className='bg-gray-200 h-[100vh]'>


            <div className="bg-white w-full fixed bottom-0 rounded-t-3xl">
                <div className="border-2 border-gray-200 w-36 mx-auto rounded-3xl mt-5 mb-10"></div>
                <Outlet/>
            </div>
        </div>
    )
}