import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'primary' | 'dark' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  showSubline?: boolean;
  className?: string;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'primary',
  size = 'md',
  showSubline = true,
  className = '',
  linkToHome = true,
}) => {
  const isDark = variant === 'dark';
  const isIcon = variant === 'icon';

  const textColor = isDark ? '#FFFFFF' : '#000000';
  const sublineColor = isDark ? '#DEC5C2' : '#555555';
  const sparkleColor = isDark ? '#C8A5A1' : '#7A4E5A';

  const iconScale = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-sm tracking-widest' : size === 'lg' ? 'text-2xl tracking-[0.25em]' : 'text-lg tracking-[0.22em]';
  const sublineSize = size === 'sm' ? 'text-[7px]' : size === 'lg' ? 'text-[9px]' : 'text-[8px]';

  // Vector Monogram CO with Sparkle
  const Monogram = (
    <svg
      viewBox="0 0 100 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconScale} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
    >
      {/* Intertwined 'C' */}
      <path
        d="M44 14C34 18 22 30 22 47C22 64 34 76 48 76C59 76 66 69 68 64C68.8 62.5 66.5 61.5 65 62.8C59.5 67 53.5 70.5 46 70.5C36 70.5 30 61 30 47C30 33 37 20 46 20C51.5 20 57 23 60 27.5C61.2 28.8 62.8 27.6 62 26.2C58 19 51 14 44 14Z"
        fill={textColor}
      />
      {/* Intertwined 'O' */}
      <path
        d="M62 18C48 18 38 31 38 47C38 63 48 76 62 76C76 76 86 63 86 47C86 31 76 18 62 18ZM62 69.5C52.5 69.5 45.5 59.5 45.5 47C45.5 34.5 52.5 24.5 62 24.5C71.5 24.5 78.5 34.5 78.5 47C78.5 59.5 71.5 69.5 62 69.5Z"
        fill={textColor}
      />
      {/* Sparkle 4-point Diamond Star */}
      <path
        d="M87 11L88.8 18.5L96 20.5L88.8 22.5L87 30L85.2 22.5L78 20.5L85.2 18.5L87 11Z"
        fill={sparkleColor}
      />
    </svg>
  );

  if (isIcon) {
    if (linkToHome) {
      return (
        <Link to="/" className={`inline-flex items-center group ${className}`} aria-label="CosmeticsOnline.pk Home">
          {Monogram}
        </Link>
      );
    }
    return <div className={`inline-flex items-center ${className}`}>{Monogram}</div>;
  }

  const content = (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {Monogram}
      <div className="flex flex-col justify-center">
        <span
          className={`font-semibold font-sans uppercase leading-none text-left ${titleSize}`}
          style={{ color: textColor }}
        >
          COSMETICSONLINE.PK
        </span>
        {showSubline && (
          <div
            className={`flex items-center justify-between gap-1 mt-1 font-medium tracking-[0.22em] uppercase ${sublineSize}`}
            style={{ color: sublineColor }}
          >
            <span className="h-[0.5px] w-3 bg-current opacity-40"></span>
            <span>SKINCARE • MAKEUP • HAIRCARE • FRAGRANCE</span>
            <span className="h-[0.5px] w-3 bg-current opacity-40"></span>
          </div>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-block transition-opacity hover:opacity-95" aria-label="CosmeticsOnline.pk Home">
        {content}
      </Link>
    );
  }

  return content;
};
