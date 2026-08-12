import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
    const content = (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
        >
            <CircularProgress size={48} thickness={4} />
            <Typography variant="body2" color="textSecondary">
                {message}
            </Typography>
        </Box>
    );

    if (fullScreen) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                bgcolor="background.default"
            >
                {content}
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
            width="100%"
        >
            {content}
        </Box>
    );
};

export default LoadingSpinner;