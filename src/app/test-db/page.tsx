'use client';

import { useState } from 'react';
import { testDbConnection } from '@/app/actions/dbActions';

export default function TestDbPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setStatus('Connecting...');
    try {
      const result = await testDbConnection();
      setStatus(result.success ? `Success: ${result.message}` : `Error: ${result.message}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setStatus(`Unexpected error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>MongoDB Atlas Connection Test</h1>
      <button
        onClick={handleTest}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Testing...' : 'Run Test Connection'}
      </button>
      {status && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
          {status}
        </div>
      )}
    </div>
  );
}
