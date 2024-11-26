import React from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import './Message.css';
import { Avatar, Typography } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

function Message({ de, texto, hora }) {
  const htmlSinSanear = marked.parse(texto);

  // Configurar DOMPurify si es necesario
  const htmlSeguro = DOMPurify.sanitize(htmlSinSanear, {
    // Puedes agregar configuraciones adicionales aquí
  });

  const isUser = de === 'usuario';

  return (
    <div className={`mensaje ${de}`}>
      {!isUser && (
        <Avatar sx={{ bgcolor: deepPurple[500] }}>B</Avatar>
      )}
      <div className="contenido">
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: htmlSeguro }}
        ></Typography>
        <Typography variant="caption" color="textSecondary">
          {hora.toLocaleTimeString()}
        </Typography>
      </div>
      {isUser && (
        <Avatar sx={{ bgcolor: deepOrange[500] }}>U</Avatar>
      )}
    </div>
  );
}

export default Message;