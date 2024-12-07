import { Html } from '@react-email/components';
import React from 'react';

export const emailVerification = (token: string) => {
  return (
    <Html lang="en">
      <body>
        <div>
          <h1>Confirme seu email</h1>
          <p>Olá,</p>
          <p>Obrigado por se cadastrar na plataforma.</p>
          <p>
            <a
              href={`http://localhost:3001/confirm-your-identity?token=${token}`}
            >
              Verificar E-mail
            </a>
          </p>
          <p>Não foi você? Por favor, desconsidere esta mensagem.</p>
          <p>
            Obrigado,
            <br />
          </p>
        </div>
      </body>
    </Html>
  );
};

export default emailVerification;
