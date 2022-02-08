import React from 'react';

import { useEffect } from 'react'

const useDebug = (val: any) => {

  useEffect(() => {
    console.log(val)
  }, [val])

  return {}
};

export default useDebug;
