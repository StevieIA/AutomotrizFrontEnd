import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import './Chat.css';
import { Paper, TextField, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Chat() {
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const chatRef = useRef(null);
  const [escribiendo, setEscribiendo] = useState(false);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const response = await axios.get(`${backendURL}/mensajes`);
        console.log('Mensajes recibidos del backend:', response.data);
  
        if (Array.isArray(response.data)) {
          setMensajes(response.data);
        } else {
          console.error('La respuesta no es un arreglo:', response.data);
          setMensajes([]);
        }
      } catch (error) {
        console.error('Error al cargar el historial:', error);
        setMensajes([]);
      }
    };
    cargarHistorial();
  }, []);
  
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = async () => {
    if (mensaje.trim() === '') return;

    const nuevoMensajeUsuario = {
      de: 'usuario',
      texto: mensaje,
      hora: new Date(),
    };

    setMensajes((prevMensajes) => [...prevMensajes, nuevoMensajeUsuario]);
    setMensaje('');
    setEscribiendo(true);

    try {
      const response = await axios.post('https://automotriz-production.up.railway.app/enviar-mensaje', { mensaje });
      const nuevoMensajeBot = {
        de: 'bot',
        texto: response.data.respuesta,
        hora: new Date(),
      };
      setMensajes((prevMensajes) => [...prevMensajes, nuevoMensajeBot]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      const mensajeError = {
        de: 'bot',
        texto: 'Error al obtener respuesta del servidor.',
        hora: new Date(),
      };
      setMensajes((prevMensajes) => [...prevMensajes, mensajeError]);
    } finally {
      setEscribiendo(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enviarMensaje();
    }
  };

  return (
    <Paper elevation={3} className="chat-container">
      <div className="chat" ref={chatRef}>
        {mensajes.map((msg, index) => (
          <Message key={index} de={msg.de} texto={msg.texto} hora={msg.hora} />
        ))}
      </div>

      {escribiendo && (
        <Typography variant="caption" color="textSecondary" style={{ marginLeft: 10 }}>
          El bot está escribiendo...
        </Typography>
      )}

      <div className="entrada">
        <TextField
          variant="outlined"
          placeholder="Escribe un mensaje..."
          fullWidth
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton color="primary" onClick={enviarMensaje}>
          <SendIcon />
        </IconButton>
      </div>
    </Paper>
  );
}

export default Chat;