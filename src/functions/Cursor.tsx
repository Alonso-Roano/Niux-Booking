import React, { useEffect, useState } from 'react';

const CursorShadow: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    // Escuchar el movimiento del mouse
    window.addEventListener('mousemove', handleMouseMove);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        width: '20px', // Tamaño del cursor
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color de la sombra
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)', // Sombra difusa
        pointerEvents: 'none', // Para que no interfiera con otros elementos
        transform: 'translate(-50%, -50%)', // Alineación del cursor
        transition: 'all 0.1s ease', // Suaviza el movimiento
      }}
    />
  );
};

export default CursorShadow;
