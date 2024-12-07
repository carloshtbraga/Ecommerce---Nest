import { Html } from '@react-email/components';
import React from 'react';

export const recoverPasswordEmail = (token: string) => {
  return (
    <Html lang="en">
      <span>Você solicitou uma recuperação de senha!</span>
      <br />
      <br />
      <span>Utilize o código abaixo para recuperar sua senha:</span>
      <br />
      <br />
      <span>{token}</span>
      <br />
      <br />
      Não foi você? Por favor, desconsidere essa mensagem.
      <br />
    </Html>
  );
};

export default recoverPasswordEmail;
