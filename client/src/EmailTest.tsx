import React from "react";

const EmailTest: React.FC = () => {
  const handleSendEmail = async () => {
    try {
      const response = await fetch("/api/email/send-email", {
        method: "POST",
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      alert("Correo enviado correctamente");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Error al enviar el correo");
    }
  };

  return (
    <div>
      <h2>Prueba de envío de correo</h2>
      <button onClick={handleSendEmail}>Enviar Correo</button>
    </div>
  );    
};
    
export default EmailTest;
