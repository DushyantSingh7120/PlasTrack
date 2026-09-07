import React from 'react';
import { AlertTriangle, RotateCcw, Home, Trash2, Bug } from 'lucide-react';

/**
 * Enterprise-grade ErrorBoundary for PlastiTrack.
 * Catches any uncaught runtime exceptions during rendering, lifecycle methods,
 * or constructor execution anywhere in the child component tree.
 * Prevents blank white screens and provides instant state recovery.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('PlastiTrack Telemetry Fault Caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  handleResetCorruptedStorage = () => {
    try {
      localStorage.removeItem('plastitrack_history');
      localStorage.removeItem('plastitrack_logs');
      localStorage.removeItem('plastitrack_tracker_counts');
      window.location.href = '/dashboard';
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || 'An unexpected rendering error occurred.';
      
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-stone-900/90 backdrop-blur-xl text-stone-100 font-body">
          <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-stone-950/80 border border-emerald-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] text-center space-y-6">
            
            {/* Warning Icon */}
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
              <AlertTriangle size={28} />
            </div>

            {/* Error Heading */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-black text-amber-400 tracking-widest uppercase">
                TELEMETRY RECOVERY INTERCEPTOR
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                Render Exception Prevented
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed pt-1">
                PlastiTrack captured a runtime error before it could break your session. Your data is protected.
              </p>
            </div>

            {/* Error Message Box */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-stone-800 text-left font-mono text-xs text-rose-400 overflow-x-auto custom-scrollbar flex items-start gap-2">
              <Bug size={15} className="shrink-0 mt-0.5 text-rose-500" />
              <span className="break-all font-semibold">{errorMsg}</span>
            </div>

            {/* Recovery Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
              <button
                onClick={this.handleReload}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition shadow-sm cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold transition border border-stone-700 cursor-pointer"
              >
                <Home size={14} />
                <span>Return to Dashboard</span>
              </button>

              <button
                onClick={this.handleResetCorruptedStorage}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 font-semibold transition border border-rose-800/60 cursor-pointer"
                title="Clears corrupted local cache if bad data caused the error"
              >
                <Trash2 size={14} />
                <span>Reset Corrupted Cache</span>
              </button>
            </div>

            {/* Collapsible Technical Diagnostics */}
            {this.state.errorInfo && (
              <details className="text-left font-mono text-[10px] text-stone-500 border-t border-stone-800/80 pt-4">
                <summary className="cursor-pointer hover:text-stone-400 transition select-none">
                  View Technical Stack Trace
                </summary>
                <pre className="mt-2 p-3 bg-black/60 rounded-xl overflow-x-auto text-stone-400 max-h-40 custom-scrollbar whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
