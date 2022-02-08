import Head from "next/head";
import React from "react";
import Header from "./Header";

import {Sidebar} from './sidebar/'

import Footer from './Footer'

const Layout: React.FC<{title: string, sidebar?: boolean }> = ({ children, title, sidebar = true }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Head >
        <>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </>
      </Head>


      <div className="flex relative max-w-[100vw] flex-col">

      <Header />

        <div className='flex w-full h-[94.4vh]'>

        { sidebar && <Sidebar />}

          {children}  

        </div>

      </div>
   
      <Footer/>
    </div>
  );
};

export default Layout;
