'use client'

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    paypal: any; // Define el tipo de `paypal` si tienes un paquete de tipos, de lo contrario usa `any`
  }
}

const PayPalButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
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
            shape: "pill",
            color: "black",
            layout: "vertical",
            label: "subscribe",
          },
          createSubscription: (data: any, actions: any) => {
            return actions.subscription.create({
              plan_id: "P-0GE566183R282010RM44WDSY",
            });
          },
          onApprove: (data: { subscriptionID: string }, actions: any) => {
            alert(`Subscription ID: ${data.subscriptionID}`);
          },
        }).render("#paypal-button-container-P-0GE566183R282010RM44WDSY");
      }
    };

    // Agregar el script al DOM
    document.body.appendChild(script);

    setIsLoading(false);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {isLoading && <p>Cargando...</p>}
      {!isLoading && (
        <div id="paypal-button-container-P-0GE566183R282010RM44WDSY"></div>
      )}
    </div>
  );
};

export default PayPalButton;
