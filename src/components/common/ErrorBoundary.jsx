import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CRITICAL RUNTIME ERROR CAUGHT BY ERROR BOUNDARY:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#030712', minHeight: '100vh', color: '#f8fafc', padding: '4rem 2rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: '800px', width: '100%', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid #ef4444', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#ef4444' }}>
              <AlertOctagon size={28} />
              <h2 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 'bold' }}>Application Runtime Error</h2>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              A client-side error occurred during rendering:
            </p>
            <div style={{ background: '#050811', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem', overflowX: 'auto', marginBottom: '1.5rem' }}>
              {this.state.error?.toString()}
            </div>
            {this.state.errorInfo?.componentStack && (
              <details style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '0.75rem' }}>
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem', color: '#00f0ff' }}>Component Stack Trace</summary>
                <pre style={{ background: '#050811', padding: '1rem', borderRadius: '6px', overflowX: 'auto' }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
              style={{ background: '#00f0ff', color: '#030712', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <RefreshCw size={16} /> Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
