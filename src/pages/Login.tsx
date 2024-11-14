
import { Link } from 'react-router-dom';
import Logoniux10 from '../svgs/Logoniux10';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center "  style={{
        background: 'linear-gradient(90deg, rgba(123,111,204,1) 0%, rgba(178,169,242,1) 16%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 100%)',
      }}>
      <div className="flex w-full max-w-7xl justify-center rounded-lg overflow-hidden gap-x-20">
        
        {/* Imagen lateral */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center shadow-lg p-10 bg-gray-50/10 backdrop-blur-md">
          <img
            src="../../public/Images/login-niux.svg"
            alt="Imagen de inicio de sesión"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Formulario de inicio de sesión */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          
          {/* Logo y título */}
          <div className="flex gap-2 justify-center items-center">
            <Logoniux10 />
            <span className="  font-medium text-2xl  text-[#484748]">NIUXBOOKING</span>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#7B6FCC] mt-4">Iniciar Sesión</h2>
          </div>

          {/* Campos de correo y contraseña */}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo <span className='text-red-500'>*</span>
              </label>
              <input
                id="email"
                type="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña <span className='text-red-500'>*</span>
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                placeholder="Contraseña"
              />
            </div>
            <button
              type="button"
              className="w-full py-2 bg-[#7B6FCC] text-white font-semibold rounded-lg hover:bg-[#5448A1] transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Recuperar contraseña */}
          {/* <div className="text-center mt-4">
            <Link to="#" className="text-md text-[#7B6FCC] hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div> */}

          {/* Registro */}
          <div className="text-center mt-6 text-gray-700">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/registro" className="text-[#7B6FCC] font-semibold hover:underline">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
