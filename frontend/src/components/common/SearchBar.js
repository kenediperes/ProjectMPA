import React, { useState, useEffect } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    Paper,
    Box,
    useTheme,
    debounce,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const SearchBar = ({
    value = '',
    onChange,
    placeholder = 'Search...',
    debounceDelay = 500,
    fullWidth = true,
    size = 'medium',
    variant = 'outlined',
    ...props
}) => {
    const [searchValue, setSearchValue] = useState(value);
    const theme = useTheme();

    useEffect(() => {
        setSearchValue(value);
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        if (onChange) {
            onChange (onChange) {
            onChange('');
        }
    };

   ('');
        }
    };

    return return (
        <Paper (
        <Paper
            elevation={0
            elevation={0}
            sx}
            sx={{
                display: 'flex',
                alignItems: '={{
                display: 'flexcenter',
                border: `',
                alignItems: 'center',
                border: `1px solid ${1px solid ${theme.paltheme.palette.divette.divider}`,
               ider}`,
                borderRadius: 2 borderRadius: 2,
                px,
                px: 1: 1,
                ...(full,
                ...(fullWidth && { width: '100%Width && { width: '100%' }),
                ...props' }),
                ...props.sx,
            }}
       .sx,
            }}
        >
            <Search color >
            <Search color="action" sx="action" sx={{ ml: 1={{ ml: 1 }} }} />
            <TextField />
            <TextField
                placeholder
                placeholder={placeholder={placeholder}
                value={}
                value={searchValue}
               searchValue}
                onChange={handleChange}
                variant="standard"
                size onChange={handleChange}
                variant="={size}
                fullWidth={standard"
                size={size}
                fullWidth={fullWidth}
               fullWidth}
                InputProps InputProps={{
                    disableUnder={{
                    disableUnderline: trueline: true,
                    endAd,
                    endAdornment: searchValue && (
                        <InputAdornornment: searchValue && (
                       ment position="end">
                            <Icon <InputAdornment position="end">
                            <IconButton sizeButton size="small" onClick="small" onClick={handleClear={handleClear}>
                                <Clear fontSize}>
                                <Clear fontSize="small"="small" />
                            </IconButton />
                            </IconButton>
                        </Input>
                        </InputAdornmentAdornment>
                    ),
>
                    ),
                }}
                {...                }}
                {...propsprops}
                sx={{
                    '& .}
                sx={{
                   MuiInputBase-root '& .MuiInputBase-root':': {
                        py: size {
                        py: size === 'small' === 'small' ? 0. ? 0.5 : 5 : 1,
                   1,
                    },
                    ... },
                    ...props.sprops.sx,
               x,
                }}
            />
        </ }}
            />
        </Paper>
   Paper>
    );
};

export default Search );
};

export default SearchBar;