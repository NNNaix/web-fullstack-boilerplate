import React from 'react';
import ErrorDowngrade from './ErrorDowngrade';

interface ErrorBoundaryProps {
    message?: React.ReactNode;
    description?: React.ReactNode;
}

interface ErrorBoundaryState {
    error?: Error | null;
    info: {
        componentStack?: string;
    };
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {
        error: undefined,
        info: {
            componentStack: '',
        },
    };

    componentDidCatch(error: Error | null, info: object) {
        this.setState({ error, info });
    }

    render() {
        const { message, description, children } = this.props;
        const { error, info } = this.state;
        const componentStack = info && info.componentStack ? info.componentStack : null;
        const errorMessage = typeof message === 'undefined' ? (error || '').toString() : message;
        const errorDescription = typeof description === 'undefined' ? componentStack : description;
        if (error) {
            console.error('errorMessage:', errorMessage, '\n', errorDescription);
            return <ErrorDowngrade />;
        }
        return children;
    }
}

export default ErrorBoundary;
