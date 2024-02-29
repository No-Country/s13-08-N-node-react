import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className="bg-[#062d46] py-10">
      <div className="flex flex-col items-center gap-3 text-[#feffff]">
        <p className="text-sm">EcoVale &copy; {new Date().getFullYear()}. All rights reserved. </p>
        <div className="flex justify-center gap-5 text-2xl">
          <FaYoutube />
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
      </div>
    </div>
  );
};
