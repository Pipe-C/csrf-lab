import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChangeEmailVulnerable } from './components/ChangeEmailVulnerable';
import { ChangeEmailSecure } from './components/ChangeEmailSecure';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('vulnerable');

  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 flex flex-col justify-between">
      <div>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-5xl mx-auto px-4 py-8">
          {activeTab === 'vulnerable' && <ChangeEmailVulnerable />}
          {activeTab === 'secure' && <ChangeEmailSecure />}
        </main>
      </div>

      <Footer />
    </div>
  );
}