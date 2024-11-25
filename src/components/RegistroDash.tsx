import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/auth/authStore';
import openEye from "../../public/images/icons/open-eye.svg";
import closedEye from "../../public/images/icons/closed-eye.svg";
import Utils from '../functions/Utils';
import { niuxApi } from '../api/niuxApi';

export default function RegistroDash({tipoUsuario, setClose}:any) {
  const isSocio = tipoUsuario === 'socio';

  const registerClient = useAuthStore((state) => state.registerClient);

  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Visibilidad de contraseña
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Visibilidad de confirmar contraseña
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    special: false,
    number: false,
    match: false
  });

  useEffect(()=>{setEmail(''), setPassword('')},[])

  // Manejo de errores
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string, confirmPassword: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /\d/.test(password),
      match: password !== '' && confirmPassword !== '' && password === confirmPassword, // Verifica si las contraseñas coinciden
    });
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!email) {
      setError('El campo email es obligatorio');
      return;
    }
    if (isSocio && !nombreEmpresa) {
      setError('El campo Nombre de tu Negocio es obligatorio');
      return;
    }

    try {
      if (isSocio) {
        const { data } = await niuxApi.post('/Auth/registrarSocio', {
          email,
          nombres,
          apellido1,
          apellido2,
          password,
          confirmPassword,
          nombreEmpresa
        });
        console.log(data)
        Utils.showToast({title:data.message, icon:"success"})
      } else {
        // Llama al método de registro para clientes
        await registerClient(email, nombres, apellido1, apellido2, password, confirmPassword);
      }

      setClose(false)
      
    } catch (err: any) {
      // Manejo del error específico del backend
      if (err?.response?.status === 400 && err?.response?.data?.errors?.Email) {
        const emailErrors = err.response.data.errors.Email;
        if (emailErrors.includes('The Email field is required.')) {
          setError('El campo email es obligatorio');
        } else if (emailErrors.includes('The Email field is not a valid e-mail address.')) {
          setError('El email ingresado no es válido');
        }
      } else if (err?.response?.data?.message === 'Ha ocurrido un error') {
        setError('La contraseña no cumple con los requisitos');
      } else {
        setError(err instanceof Error ? err.message : 'Hubo un error en el registro');
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
    >
      <div className="flex w-full max-w-7xl p-1 justify-center rounded-lg overflow-hidden gap-x-20">

        {/* Formulario de registro */}
        <div className="w-full lg:w-1/2  flex flex-col justify-center">

         
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-[#7B6FCC] mt-4">
              Registro {isSocio ? 'socio' : 'cliente'}
            </h2>
          </div>

          {/* Mostrar error */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Campos del formulario */}
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
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                required
              />
            </div>
            <div className=" gap-4">
              <div className="w-100 mb-1">
                <label htmlFor="apellido1" className="block text-sm font-medium text-gray-700">
                  Apellido Paterno <span className="text-gray-400">(Opcional)</span>
                </label>
                <input
                  id="apellido1"
                  type="text"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                  placeholder="Apellido Paterno"
                  value={apellido1}
                  onChange={(e) => setApellido1(e.target.value)}
                  required
                />
              </div>
              <div className="w-100">
                <label htmlFor="apellido2" className="block text-sm font-medium text-gray-700">
                  Apellido Materno <span className="text-gray-400">(Opcional)</span>
                </label>
                <input
                  id="apellido2"
                  type="text"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                  placeholder="Apellido Materno"
                  value={apellido2}
                  onChange={(e) => setApellido2(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
            <div className="gap-4">
              <div className="w-100 relative mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value, confirmPassword);
                  }}
                  required
                />
                <img
                  src={passwordVisible ? openEye : closedEye}
                  alt={passwordVisible ? 'Mostrar contraseña' : 'Ocultar contraseña'}
                  className="absolute right-4 top-9 cursor-pointer w-5 h-5"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              </div>
              <div className="w-100 relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validatePassword(password, e.target.value);
                  }}
                  required
                />
                <img
                  src={confirmPasswordVisible ? openEye : closedEye}
                  alt={confirmPasswordVisible ? 'Mostrar contraseña' : 'Ocultar contraseña'}
                  className="absolute right-4 top-9 cursor-pointer w-5 h-5"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                />
              </div>
            </div>
            <div className="text-sm mt-2 grid grid-cols-2 gap-2">
              <p className={`flex items-center gap-2 ${passwordCriteria.length ? 'text-green-500' : 'text-red-500'}`}>
                {passwordCriteria.length ? '✔' : '✘'} Mínimo 8 caracteres
              </p>
              <p className={`flex items-center gap-2 ${passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'}`}>
                {passwordCriteria.uppercase ? '✔' : '✘'} Al menos una letra mayúscula
              </p>
              <p className={`flex items-center gap-2 ${passwordCriteria.special ? 'text-green-500' : 'text-red-500'}`}>
                {passwordCriteria.special ? '✔' : '✘'} Al menos un carácter especial (&%$#!@)
              </p>
              <p className={`flex items-center gap-2 ${passwordCriteria.number ? 'text-green-500' : 'text-red-500'}`}>
                {passwordCriteria.number ? '✔' : '✘'} Al menos un número
              </p>
              <p className={`flex items-center gap-2 ${passwordCriteria.match ? 'text-green-500' : 'text-red-500'}`}>
              {passwordCriteria.match ? '✔' : '✘'} Las contraseñas coinciden
            </p>
            </div>
          
            </div>
            {isSocio && (
              <div>
                <label htmlFor="nombreEmpresa" className="block text-sm font-medium text-gray-700">
                  Nombre del negocio <span className="text-red-500">*</span>
                </label>
                <input
                  id="nombreEmpresa"
                  type="text"
                  className="w-full mt-1 px-4 py-2 border mb-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                  placeholder="Nombre de tu Negocio"
                  value={nombreEmpresa}
                  onChange={(e) => setNombreEmpresa(e.target.value)}
                  required
                />
              </div>
            )}
            <button
              type="button"
              onClick={handleRegister}
              className="w-full py-2 bg-[#7B6FCC] text-white font-semibold rounded-lg hover:bg-[#5448A1] transition-colors"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
