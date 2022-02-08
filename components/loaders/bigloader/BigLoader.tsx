import React from 'react';
import classes from './bigLoader.module.css'

const BigLoader = () => {
  return (
    <div className='bg-white p-3 rounded-full shadow-xl flex items-center justify-center cursor-not-allowed'>
      <div className={classes["lds-ring"]}><div></div><div></div><div></div><div></div></div>
    </div>
  )
};

export default BigLoader;
