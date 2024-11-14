import { useParams, Link } from 'react-router-dom';
import Logoniux10 from '../svgs/Logoniux10';

type RegistroParams = {
  tipoUsuario: 'cliente' | 'socio';
};

export default function Registro() {
  const { tipoUsuario } = useParams<RegistroParams>();
  const isSocio = tipoUsuario === 'socio';
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        background:
          'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 44%, rgba(178,169,242,1) 65%, rgba(123,111,204,1) 100%)',
      }}
    >
      <div className="flex w-full max-w-7xl justify-center rounded-lg overflow-hidden gap-x-20">
        
        {/* Formulario de inicio de sesión */}
        <div className="w-full lg:w-1/2 p-8 lg:pt-5 flex flex-col justify-center">
          
          {/* Logo y título */}
          <div className="flex gap-2 justify-center items-center">
            <Logoniux10 />
            <span className="font-medium text-xl text-[#484748]">NIUXBOOKING</span>
          </div>
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-[#7B6FCC] mt-4">Registro</h2>
          </div>

          {/* Campos de correo y contraseña */}
          <div className="space-y-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre(s) <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                placeholder="Nombre(s)"
                required 
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="apellido1" className="block text-sm font-medium text-gray-700">
                  Apellido Paterno <span className="text-red-500">*</span>
                </label>
                <input
                  id="apellido1"
                  type="text"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                  placeholder="Apellido Paterno"
                  required 
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="apellido2" className="block text-sm font-medium text-gray-700">
                  Apellido Materno <span className="text-red-500">*</span>
                </label>
                <input
                  id="apellido2"
                  type="text"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                  placeholder="Apellido Materno"
                  required 
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                placeholder="Correo electrónico"
                required 
              />
            </div>
            <div className="flex gap-4">
            <div className='w-1/2'>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                placeholder="Contraseña"
                required 
              />
            </div>
            <div className='w-1/2'>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Contraseña (Confirmación) <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                placeholder="Contraseña (Confirmación)"
                required 
              />
            </div>
            </div>
            {isSocio && (
            <div>
              <label htmlFor="nombreEmpresa" className="block text-sm font-medium text-gray-700">
              Nombre de tu Negocio <span className="text-red-500">*</span>
              </label>
              <input
                id="nombreEmpresa"
                type="String"
                className="w-full mt-1 px-4 py-2 border mb-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                placeholder="Nombre de tu Negocio"
                required
              />
            </div>
             )}
            <button
              type="button"
              className="w-full py-2 bg-[#7B6FCC] text-white font-semibold rounded-lg hover:bg-[#5448A1] transition-colors"
            >
              Registrarse
            </button>
              {/* Enlace para iniciar sesión */}
    
          </div>
          <div className="text-center mt-5 text-gray-700">
      ¿Ya tienes cuenta?{' '}
      <Link to="/login" className="text-[#7B6FCC] font-semibold hover:underline">
        Iniciar Sesión
      </Link>
    </div>
        </div>

        {/* Imagen lateral */}
        <div
          className="hidden lg:flex items-center mt-10 justify-center shadow-lg bg-gray-50/10 backdrop-blur-md"
          style={{ width: '580px', height: '535px', borderRadius: '8px' }}
        >
          <img
            src="../../public/Images/login-niux.svg"
            alt="Imagen de registro"
            style={{ width: '500px', height: '500px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}
