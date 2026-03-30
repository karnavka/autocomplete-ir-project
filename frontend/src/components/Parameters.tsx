import React, { useState } from "react";
import "./Parameters.css";

type ParametersProps = {
  SetParameters: (query: string) => void;
  closePopUp:() => void;
  param: string;
};

export const Parameters = ({ SetParameters, closePopUp, param }: ParametersProps) => {


  return (
    <div className="param-pop-up">
        <button  id="close" onClick={closePopUp}>
        x
         </button>
      <button   className={param === "zone" ? "choose-param active" : "choose-param"} onClick={() => SetParameters("zone")}>
        Зональне ранжування
      </button>
      <button   className={param === "wildcard" ? "choose-param active" : "choose-param"} onClick={() => SetParameters("wildcard")}>
        Пошук з джокером
      </button>
      <button   className={param === "pos" ? "choose-param active" : "choose-param"} onClick={() => SetParameters("pos")}>
        Фразовий пошук
      </button>
    </div>
  );
};
