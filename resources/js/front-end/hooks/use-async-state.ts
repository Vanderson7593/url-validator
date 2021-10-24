import React, { useState } from 'react';

const useAsyncState = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState<any>();
  const [status, setStatus] = useState<boolean>(false);

  return {
    errors,
    data,
    status,
    setData,
    setErrors,
    setStatus,
  };
}

export default useAsyncState;
