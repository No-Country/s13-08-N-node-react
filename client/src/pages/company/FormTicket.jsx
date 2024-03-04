import React from 'react';
import Cookies from 'universal-cookie';

export const FormTicket = () => {
  const cookies = new Cookies();
  const email = cookies.get('email');

  return (
    <div className="w-full h-full grid place-items-center">
      <p>Email del usuario: {email}</p>
    </div>
  );
};
