import React from 'react';

type TitleSubtitleProps = {
  title?: string;
  subtitle?: string;
  hasHr?: boolean;
};

export const HeaderWithSubtitle: React.FC<
  TitleSubtitleProps & { textAlignCenter?: boolean }
> = ({ title, subtitle, hasHr, textAlignCenter = false }) => {
  return (
    <div className={`hr ${textAlignCenter ? 'text-center' : ''}`}>
      <h1 className='header__title'>{title}</h1>
      <p className='header__subtitle'>{subtitle}</p>
      {hasHr && <hr />}
    </div>
  );
};
