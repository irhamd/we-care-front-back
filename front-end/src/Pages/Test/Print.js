import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import DetailPasienDaftar from '../Pasien/DetailPasienDaftar';
import PasienDaftar from '../Transaksi/PasienDaftar/PasienDaftar';
import Test from '../Test/Test';


 export const Print = () => {
  const printReff = useRef();

  return (
      <div>
          <ReactToPrint
              trigger={() => <button>Print this out!</button>}
              content={() => printReff.current}
          />
          <div ref={printReff}>My cool content here!
              <Test />
          </div>

      </div>
  );
};