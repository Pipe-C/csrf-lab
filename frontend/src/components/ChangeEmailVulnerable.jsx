import React, { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, Send, Mail, CheckCircle2, XCircle } from 'lucide-react';

export const ChangeEmailVulnerable = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/user', { credentials: 'include' });
      const data = await res.json();
      setCurrentEmail(data.email);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/change-email-vulnerable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: newEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage({ text: `Correo modificado a: ${data.email}`, isError: false });
        setCurrentEmail(data.email);
        setNewEmail('');
      } else {
        setStatusMessage({ text: data.error, isError: true });
      }
    } catch (err) {
      setStatusMessage({ text: 'Error de conexión con el servidor backend', isError: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Informativo */}
      <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-5">
        <div className="flex items-center gap-3 text-rose-400 mb-2">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Escenario Vulnerable a CSRF (Sin Verificación Anti-Forgery)</h2>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          Este endpoint procesa cambios de correo confiando únicamente en las cookies de sesión enviadas implícitamente por el navegador. Un atacante puede forzar peticiones no autorizadas desde un sitio malicioso externo.
        </p>
      </div>

      {/* Estado del Perfil */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Mail className="w-4 h-4 text-rose-400" />
            Correo Registrado en la Sesión
          </h3>
          <button
            onClick={fetchUserProfile}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 px-2.5 py-1 rounded-md transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Actualizar
          </button>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 font-mono text-sm text-rose-400">
          {currentEmail || 'Cargando perfil...'}
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleChangeEmail} className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nuevo Correo Electrónico
          </label>
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="nuevo_correo@dominio.com"
            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm text-gray-100 focus:outline-none focus:border-rose-600 font-mono"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            Actualizar Correo (Inseguro)
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