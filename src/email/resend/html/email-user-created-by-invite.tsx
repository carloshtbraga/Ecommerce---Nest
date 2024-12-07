import { Html } from '@react-email/components';
import React from 'react';

export const userInvitedEmail = (
  tempPassword: string,
  eventTypeName: string,
) => {
  return (
    <Html lang="en">
      <span>Olá! </span>
      <br />
      <br />
      <span>Você foi está cadastrado na organização: {eventTypeName}</span>
      <br />
      <br />
      <span>Use a senha temporária abaixo para acessar o sistema:</span>
      <br />
      <span>{tempPassword}</span>
      <br />
      <br />
      <span>Por favor, altere sua senha após o primeiro login.</span>
      <br />
      <br />
      <br />
    </Html>
  );
};

export default userInvitedEmail;
