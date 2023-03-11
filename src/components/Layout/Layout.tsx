import React, { FC } from 'react';
import Header from '../Header';
import { ILayoutProps } from './Layout.types';

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
