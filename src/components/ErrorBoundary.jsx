import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Ini adalah lifecycle method yang dipanggil ketika ada error di dalam tree komponen
  static getDerivedStateFromError(error) {
    // Update state untuk menampilkan fallback UI
    return { hasError: true };
  }

  // Menangkap error dan memberikan info tambahan
  componentDidCatch(error, errorInfo) {
    // Log error ke layanan pelaporan error atau console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    // Jika ada error, tampilkan fallback UI
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops! Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Jika tidak ada error, render children seperti biasa
    return this.props.children;
  }
}

export default ErrorBoundary;
