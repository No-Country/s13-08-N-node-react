import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

import { RiAppleFill } from 'react-icons/ri';
import { useAuthStore } from '../../stores/auth.store';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../../api/auth';

export default function Register() {

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   try{
  //     const response = fetch('http://localhost:3000/authUser', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         nombre: e.target[0].value,
  //         email: e.target[1].value,
  //         password: e.target[2].value,
  //         confirmPassword: e.target[3].value
  //       })
  //     })
  //     if(response.status === 201){
  //       console.log('Usuario registrado')
  //     }else{
  //       console.log('Error al registrar usuario')
  //     }
  //   }catch(error){
  //     console.error(error)
  //   }
  // }

  const { register, handleSubmit } = useForm()

  const isAuth = useAuthStore(state => state.isAuth)
  if (isAuth) {
    return <Navigate to="/user" />
  }

  return (
    <div className="flex flex-col gap-y-10 px-5 pb-14">
      <p className="flex flex-col">
        <span className="text-3xl font-bold text-center">Hola!</span>
        <span className="text-xl font-bold text-center">Registrese para empezar</span>
      </p>

      <form className="flex flex-col gap-y-10" onSubmit={handleSubmit(async values => {
        console.log(values)
        const res = await registerRequest(values)
        console.log(res)
      })}>
        <div className="flex flex-col gap-y-4">
          <input type="text" placeholder="Nombre" className="border border-gray-400 p-2 rounded-lg" 
            {...register('nombre', { required: true })}
            />
          <input type="text" placeholder="Email" className="border border-gray-400 p-2 rounded-lg" 
            {...register('email', { required: true })}
            />
          <input type="password" placeholder="Contraseña" className="border border-gray-400 p-2 rounded-lg" 
            {...register('password', { required: true })}
            />
          <input type="password" placeholder="Confirmar contraseña" className="border border-gray-400 p-2 rounded-lg" 
            {...register('confirmPassword', { required: true })}
          />
        </div>

        <div className="flex flex-col gap-y-3">
          <input type="submit" value="Registrarse" className="bg-greenMain text-white rounded-lg py-2 text-center text-base block"/>
          {/* <Link to="/#" className="bg-greenMain text-white rounded-lg py-2 text-center text-base block">Registrarse</Link> */}
          <span className="my-3">
            <hr />{' '}
            <span className="flex justify-center relative">
              <span className="absolute -top-3 bg-white px-5 text-gray-500 text-base">o registre con</span>
            </span>
          </span>
          <div className="flex justify-between gap-x-5">
            <Link to={'/#'} className="border border-black w-full py-2 rounded-xl flex justify-center text-xl">
              <FaGoogle />
            </Link>
            <Link to={'/#'} className="border border-black w-full py-2 rounded-xl flex justify-center text-xl">
              <FaFacebookF />
            </Link>
            <Link to={'/#'} className="border border-black w-full py-2 rounded-xl flex justify-center text-xl">
              <RiAppleFill />
            </Link>
          </div>

          <p className="text-xs text-center">
            Al continuar, usted acepta las Condiciones del servicio y la Política de privacidad de Nombre de la App
          </p>
        </div>
      </form>

      <p className="text-center font-light">
        Ya tienes cuenta?{' '}
        <Link to="/auth/login" className="text-sm text-darkMain font-bold">
          Inicie sesión ahora
        </Link>{' '}
      </p>
    </div>
  );
}
