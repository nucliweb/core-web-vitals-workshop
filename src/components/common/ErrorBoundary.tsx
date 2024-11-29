import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  autoReset?: boolean;
  resetTimeout?: number;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  errorType?: 'warning' | 'error' | 'info';
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId?: NodeJS.Timeout;

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Llamar al callback de error si existe
    this.props.onError?.(error, errorInfo);
    
    // Configurar auto-reset si está habilitado
    if (this.props.autoReset) {
      this.resetTimeoutId = setTimeout(() => {
        this.handleReset();
      }, this.props.resetTimeout || 5000);
    }

    // Log del error (aquí podrías integrar con servicios como Sentry)
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  public componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private getErrorStyle = () => {
    const baseStyle = {
      padding: '20px',
      margin: '10px',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '10px'
    };

    switch (this.props.errorType) {
      case 'warning':
        return {
          ...baseStyle,
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeeba',
          color: '#856404'
        };
      case 'info':
        return {
          ...baseStyle,
          backgroundColor: '#d1ecf1',
          border: '1px solid #bee5eb',
          color: '#0c5460'
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          color: '#721c24'
        };
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={this.getErrorStyle()}>
            <h3 style={{ margin: 0 }}>Something went wrong</h3>
            <p style={{ margin: 0 }}>{this.state.error?.message}</p>
            <button
              onClick={this.handleReset}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid currentColor',
                borderRadius: '4px',
                cursor: 'pointer',
                alignSelf: 'flex-start'
              }}
            >
              Try again
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details style={{ fontSize: '0.9em', marginTop: '10px' }}>
                <summary>Error Details</summary>
                <pre style={{ 
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.8em',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  padding: '10px',
                  borderRadius: '4px'
                }}>
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}
