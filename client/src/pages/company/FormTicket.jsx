import React, { useState } from 'react';

import ticketHeader from '../../assets/ticket-header.png';
import { TicketVerify } from '../../components/TicketVerify/TicketVerify';
import { TicketsScan } from '../../components/TicketsScan/TicketsScan';

export const FormTicket = () => {
  const [verify, setVerify] = useState(true);
  const [materialsVerified, setMaterialsVerified] = useState([]);
  const [submited, setSubmited] = useState(false);

  return (
    <div className="h-[100vh] bg-white">
      <div className="bg-white w-full grid place-items-center">
        <img src={ticketHeader} alt="Tickets Header" />

        {verify ? (
          <TicketVerify
            setVerify={setVerify}
            setMaterialsVerified={setMaterialsVerified}
            materialsVerified={materialsVerified}
          />
        ) : null}

        {!verify && !submited && (
          <TicketsScan setSubmited={setSubmited} materials={materialsVerified} setVerify={setVerify} />
        )}

        {submited && (
          <div className="flex justify-center items-center ">
            <div className="text-center text-6xl font-bold text-darkBlue">ticket enviado</div>
          </div>
        )}
      </div>
    </div>
  );
};
