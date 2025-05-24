import React from 'react'
import ErrorPageImage from '../../public/images/Notfound.svg';

const NotFound = () => {
  return (
      <div className="h-screen flex items-center justify-center">
          <img className="object-cover h-[80%]" src={ErrorPageImage} alt="" />
      </div>
  );
}

export default NotFound