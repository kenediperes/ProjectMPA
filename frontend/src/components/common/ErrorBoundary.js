import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({ errorInfo });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/dashboard';
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="400px"
                    p={3}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            maxWidth: 500,
                            textAlign: 'center',
                            borderRadius: 3,
                        }}
                    >
                        <ErrorOutline sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Oops! Something went wrong
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            {this.state.error?.message || 'An unexpected error occurred.'}
                        </Typography>
                        {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                            <Box
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    bgcolor: '#f5f5f5',
                                    borderRadius: 1,
                                    textAlign: 'left',
                                    overflow: 'auto',
                                    maxHeight: 200,
                                }}
                            >
                                <Typography variant="caption" component="pre">
                                    {this.state.errorInfo.componentStack}
                                </Typography>
                            </Box>
                        )}
                        <Box mt={3} display="flex" gap={2} justifyContent="center">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleReload}
                            >
                                Reload Page
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={this.handleGoHome}
                            >
                                Go to Dashboard
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;