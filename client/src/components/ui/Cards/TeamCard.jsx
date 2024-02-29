/* eslint-disable react/prop-types */
import React from 'react';
import { ProfileIcon } from '../../../assets';
import {
  FaFacebookF,
  FaTwitter,
  FaDribbble,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
  FaYoutube,
} from 'react-icons/fa';

export const TeamCard = ({ name, rol, image, socialLinks = [] }) => {
  const iconsMap = {
    facebook: FaFacebookF,
    twitter: FaTwitter,
    dribbble: FaDribbble,
    github: FaGithub,
    youtube: FaYoutube,
    linkedin: FaLinkedinIn,
    instagram: FaInstagram,
    behance: FaBehance,
  };

  const renderSocialIcons = () => {
    return socialLinks.map((socialLink) => {
      const { name: iconName, link } = socialLink;
      const IconComponent = iconsMap[iconName];

      if (IconComponent && link) {
        return (
          <a key={iconName} to={link} target="_blank" rel="noopener noreferrer">
            <IconComponent />
          </a>
        );
      } else {
        console.warn(`Invalid social icon name or missing link: ${iconName}`);
        return null;
      }
    });
  };

  return (
    <div>
      <div className="bg-white w-[111px] h-[156px] flex flex-col items-center justify-between p-2 rounded-[10px]">
        <div className="w-12 h-12 flex justify-center items-center bg-slate-200 rounded-full">
          {image ? <img src={image} alt="Profile" /> : <ProfileIcon />}
        </div>
        <p className="text-sm font-bold">{name}</p>
        <div className="flex items-center gap-x-3">
          <p className="text-sm font-bold line-clamp-2">{rol}</p>
          <hr className="border border-slate-500 h-full" />
          <div className="flex justify-center gap-2">{renderSocialIcons()}</div>
        </div>
      </div>
    </div>
  );
};
