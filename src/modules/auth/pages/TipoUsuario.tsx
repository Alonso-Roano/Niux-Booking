import { Link, useNavigate } from 'react-router-dom';
import Logoniux10 from '@shared/svgs/Logoniux10';

export default function TipoUsuario() {
  const navigate = useNavigate();

  const handleUserTypeSelection = (tipoUsuario: 'cliente' | 'socio') => {
    navigate(`/registro/${tipoUsuario}`);
  };
  return (
    <div className="flex min-h-screen items-center justify-center" style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 44%, rgba(178,169,242,1) 65%, rgba(123,111,204,1) 100%)',
      }}>
      <div className="flex w-full max-w-7xl justify-center rounded-lg overflow-hidden gap-x-20">
        
        {/* Contenedor del formulario de selección de usuario */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col items-center">
  
  <div className="w-full max-w-sm flex flex-col items-center">
    
    {/* Logo y título */}
    <Link
              to="/"
           
            >
          <div className="flex gap-2 justify-center items-center">
            <Logoniux10 />
            <span className="font-medium text-2xl text-[#484748]">
              NIUXBOOKING
            </span>
          </div>
          </Link>
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold text-[#7B6FCC] mt-4">Registro</h2>
    </div>

    {/* Instrucción */}
    <div className="text-left w-full mb-6">
      <p className="text-md font-bold text-[#707070] mt-4">Selecciona el tipo de usuario:</p>
    </div>

    {/* Opciones de usuario */}
    <div className="space-y-6 w-full">
      <div onClick={() => handleUserTypeSelection('cliente')} className="flex items-center border border-gray-300 rounded-lg p-4 hover:bg-gray-50 hover:cursor-pointer">
        <div>
          <p className="text-[#7B6FCC] text-md font-bold">Para Todos</p>
          <p className="text-[#707070] text-sm">Encuentra y reserva en centros de belleza y spas cerca de ti.</p>
        </div>
        <img
          src="/images/icons/ArrowRight.svg"
          alt="Flecha hacia la derecha"
          className="w-5 h-5 ml-auto"
        />
      </div>
      <div onClick={() => handleUserTypeSelection('socio')} className="flex items-center border border-gray-300 rounded-lg p-4 hover:bg-gray-50 hover:cursor-pointer">
        <div>
          <p className="text-[#7B6FCC] text-md font-bold">Para Negocios</p>
          <p className="text-[#707070] text-sm">Administra tu negocio y aumenta tu visibilidad en línea.</p>
        </div>
        <img
          src="/images/icons/ArrowRight.svg"
          alt="Flecha hacia la derecha"
          className="w-5 h-5 ml-auto"
        />
      </div>
    </div>

    {/* Enlace para iniciar sesión */}
    <div className="text-center mt-6 text-gray-700">
      ¿Ya tienes cuenta?{' '}
      <Link to="/login" className="text-[#7B6FCC] font-semibold hover:underline">
        Iniciar Sesión
      </Link>
    </div>
  </div>
</div>

       {/* Imagen lateral */}
       <div
          className="hidden lg:flex items-center justify-center shadow-lg bg-gray-50/10 backdrop-blur-md"
          style={{ width: '580px', height: '535px', borderRadius: '8px' }}
        >
          <img
            src="/images/login-niux.svg"
            alt="Imagen de registro"
            style={{ width: '500px', height: '500px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}
