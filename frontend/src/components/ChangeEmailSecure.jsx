import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, Send, Mail, Key, CheckCircle2, XCircle } from 'lucide-react';

export const ChangeEmailSecure = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });

  const fetchUserProfileAndToken = async () => {
    setLoading(true);
    try {
      const resUser = await fetch('http://localhost:4000/api/user', { credentials: 'include' });
      const dataUser = await resUser.json();
      setCurrentEmail(dataUser.email);

      const resToken = await fetch('http://localhost:4000/api/csrf-token', { credentials: 'include' });
      const dataToken = await resToken.json();
      setCsrfToken(dataToken.csrfToken);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfileAndToken();
  }, []);

  const handleChangeEmailSecure = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/change-email-secure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({ email: newEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage({ text: `Éxito: ${data.message}`, isError: false });
        setCurrentEmail(data.email);
        setNewEmail('');
      } else {
        setStatusMessage({ text: `Bloqueado: ${data.error}`, isError: true });
      }
    } catch (err) {
      setStatusMessage({ text: 'Error de conexión con el servidor backend', isError: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Informativo */}
      <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-5">
        <div className="flex items-center gap-3 text-emerald-400 mb-2">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Escenario Protegido (Verificación mediante Anti-CSRF Token)</h2>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          Cada petición de modificación requiere obligatoriamente el encabezado HTTP personalizado <code className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono text-xs">X-CSRF-Token</code>. Las páginas de origen cruzado (sitios atacantes) no pueden leer ni adjuntar este token debido a las políticas de Same-Origin Policy (SOP).
        </p>
      </div>

      {/* Grid de Estado y Token */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" /> Correo Registrado
            </h3>
            <button
              onClick={fetchUserProfileAndToken}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 px-2 py-1 rounded-md transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Actualizar
            </button>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 font-mono text-sm text-emerald-400 truncate">
            {currentEmail || 'Cargando...'}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-400" /> Token Anti-CSRF Activo
          </h3>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 font-mono text-xs text-blue-300 truncate">
            {csrfToken || 'Obteniendo token de sesión...'}
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleChangeEmailSecure} className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nuevo Correo Electrónico
          </label>
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="usuario.protegido@dominio.com"
            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm text-gray-100 focus:outline-none focus:border-emerald-600 font-mono"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            Actualizar Correo (Verificación Segura)
          </button>
        </div>
      </form>

      {/* Mensaje de Estado */}
      {statusMessage.text && (
        <div className={`border rounded-xl p-4 flex items-center gap-3 text-sm ${
          statusMessage.isError
            ? 'bg-rose-950/40 border-rose-800/60 text-rose-300'
            : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
        }`}>
          {statusMessage.isError ? <XCircle className="w-5 h-5 flex-shrink-0" /> : <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
          <span>{statusMessage.text}</span>
        </div>
      )}
    </div>
  );
};