import React from 'react';
import { ChangeEmailVulnerable } from './components/ChangeEmailVulnerable';
import { ChangeEmailSecure } from './components/ChangeEmailSecure';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Laboratorio Práctico de Mitigación CSRF</h1>
        <p className="app-subtitle">Demostración de vulnerabilidad y protección mediante Tokens Anti-CSRF</p>
      </header>

      <div className="modules-grid">
        <ChangeEmailVulnerable />
        <ChangeEmailSecure />
      </div>
    </div>
  );
}

export default App;