
import { Link } from 'react-router-dom';
import Logoniux10 from '../svgs/Logoniux10';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center "  style={{
        background: 'linear-gradient(90deg, rgba(123,111,204,1) 0%, rgba(178,169,242,1) 16%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 100%)',
      }}>
      <div className="flex w-full max-w-6xl justify-center rounded-lg overflow-hidden space-x-10">
        
        {/* Imagen lateral */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center shadow-lg p-10 bg-gray-50/10 backdrop-blur-md">
          <img
            src="../../public/Images/login-niux.svg"
            alt="Imagen de inicio de sesión"
            className="w-full h-full object-cover"
          />
        </div>
        
      
      </div>
    </div>
  );
}
