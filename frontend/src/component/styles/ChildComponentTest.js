import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

const ChildComponentTest = () => {
  const { myState } = useContext(MainContext);

  return (
    <div>
      {/* <p>{myState}</p> */}
    </div>
  );
};

export default ChildComponentTest;
