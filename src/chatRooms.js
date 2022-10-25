import React from "react";
import {
    BsExclamationSquareFill,
    BsCommand,
    BsFillFileBarGraphFill,
    BsFillChatSquareTextFill,
    BsFillAlarmFill,
    BsMailbox,
    BsFillTelephoneInboundFill,
  } from "react-icons/bs";
  
  const chatRooms = [
    { id: "Tickets", title: "Tickets", icon: <BsExclamationSquareFill /> },
    { id: "Demandes", title: "Demandes", icon: <BsFillChatSquareTextFill /> },
    { id: "Alertes", title: "Alertes", icon: <BsFillAlarmFill /> },
    { id: "Mails", title: "Mails", icon: <BsMailbox /> },
    { id: "Appels", title: "Appels", icon: <BsFillTelephoneInboundFill /> },
    { id: "Analyses", title: "Analyses", icon: <BsFillFileBarGraphFill /> },
    { id: "Commandes", title: "Commandes", icon: <BsCommand /> },
  ];
  
  export { chatRooms };