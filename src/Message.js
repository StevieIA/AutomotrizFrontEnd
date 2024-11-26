import React from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import './Message.css';
import { Avatar, Typography } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

function Message({ de, texto, hora }) {
  const htmlSinSanear = marked.parse(texto);
  const htmlSeguro = DOMPurify.sanitize(htmlSinSanear);

  const isUser = de === 'usuario';

  // Verificar si 'hora' está definida
  const horaFormateada = hora ? new Date(hora).toLocaleTimeString() : '';

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
        {/* Mostrar la hora si está disponible */}
        {horaFormateada && (
          <Typography variant="caption" color="textSecondary">
            {horaFormateada}
          </Typography>
        )}
      </div>
      {isUser && (
        <Avatar sx={{ bgcolor: deepOrange[500] }}>U</Avatar>
      )}
    </div>
  );
}

export default Message;
