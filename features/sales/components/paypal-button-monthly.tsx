'use client'

import React, { useEffect } from "react";

declare global {
  interface Window {
    paypal: any; // Define el tipo de `paypal`, puede ser refinado si tienes las definiciones de tipo del SDK
  }
}

const PayPalMonthlyButton: React.FC = () => {
  useEffect(() => {
    // Crear el script de PayPal y agregarlo al documento
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AbM2JXDWHBnlhR-Reqn7GCPgnW_Jpu5ojcNbWN47jaROu7SEW8m49qmJ-wBrmMxdMQdLqOgRV3Z7JawV&vault=true&intent=subscription";
    script.setAttribute("data-sdk-integration-source", "button-factory");
    script.onload = () => {
      // Inicializar PayPal Buttons después de que se cargue el script
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            shape: "rect",
            color: "black",
            layout: "vertical",
            label: "subscribe",
          },
          createSubscription: (data: any, actions: any) => {
            return actions.subscription.create({
              plan_id: "P-9V268973YV1531606M44U37I",
            });
          },
          onApprove: (data: { subscriptionID: string }, actions: any) => {
            alert(`Subscription ID: ${data.subscriptionID}`);
          },
        }).render("#paypal-button-container");
      }
    };

    // Agregar el script al DOM
    document.body.appendChild(script);

    // Limpiar el script cuando el componente se desmonta
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PayPalMonthlyButton;
