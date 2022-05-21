import React from 'react';
import loading from "./loading.gif";

const Spinner = () => {

  return (
    <div className='text-center my-5'>
      <img className='mt-5' src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;