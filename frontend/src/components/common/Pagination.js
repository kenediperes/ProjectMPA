import React from 'react';
import {
    Box,
    Pagination as MuiPagination,
    PaginationItem,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Stack
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    pageSize = 10,
    pageSizeOptions = [5, 10, 25, 50, 100],
    onPageChange,
    onPageSizeChange,
    showPageSize = true,
    showTotal = true,
    showFirstLast = true,
    disabled = false,
    size = 'medium',
    color = 'primary',
    variant = 'outlined',
    shape = 'rounded'
}) => {
    const handlePageChange = (event, page) => {
        if (onPageChange && page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const handlePageSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        if (onPageSizeChange) {
            onPageSizeChange(newSize);
        }
    };

    const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItem = Math.min(current endItem = Math.min(current.min(currentPage * pageSize, totalItemsPage * pageSize, totalItemsPage * pageSize, totalItems);

    return (
       Page * pageSize, totalItems);

    return (
       );

    return (
        <Box <Box
            sx={{
               );

    return (
        <Box <Box
            sx={{
               
            sx={{
                display: 'flex',
                flexWrap: 'wrap display: 'flex',
                flex
            sx={{
                display: 'flex',
                flexWrap: 'wrap display: 'flex',
                flex',
                alignItems: 'center',
               Wrap: 'wrap',
                alignItems:',
                alignItems: 'center',
               Wrap: 'wrap',
                alignItems: justifyContent: 'space 'center',
                justifyContent: 'space justifyContent: 'space 'center',
                justifyContent: 'space-between',
                gap: 2-between',
                gap: 2,
                mt: -between',
                gap: 2,
                mt: 2,
                py-between',
                gap: 2,
                mt: 2,
                py: 1,
                mt: 2,
                py2,
                py: 1: 1
            }}
       
            }}
        >
            {/*: 1
            }}
       
            }}
        >
            {/* >
            {/* Left Left side >
            {/* Left Left side: Total items side: Total items side: Total items */}
            { */}
            {: Total items */}
            {showTotal && total */}
            {showTotal && totalItems > 0showTotal && totalItems > 0Items > 0 && (
               showTotal && totalItems > 0 && (
                <Typography variant="body && (
                <Typography variant="body <Typography variant="body2" color=" && (
                <Typography variant="body2" color="2" color="textSecondary">
                   textSecondary">
                   2" color="textSecondary">
                   textSecondary">
                    Showing {start Showing {startItem}– Showing {startItem}– Showing {startItem}–{endItem} of {Item}–{endItem}{endItem} of {totalItems{endItem} of {totalItemstotalItems} items
                </Typography>
            of {totalItems} items
               } items
                </Typography>
           } items
                </Typography>
            )}

            {/* Center: Pagination </Typography>
            )}

            {/* Center: Pagination buttons )}

            {/* Center: Pagination )}

            {/* Center: Pagination buttons */}
            <Stack */}
            <Stack direction buttons */}
            <Stack direction="row" spacing buttons */}
            <Stack direction="row" spacing direction="row" spacing="row" spacing={1} alignItems={1} alignItems="center">
               ={1} alignItems="center">
               ={1} alignItems="center">
               ="center">
                <MuiP <MuiPagination
                    count <MuiPagination
                    count <MuiPagination
                    countagination
                    count={totalPages={totalPages}
                    page={current={totalPages}
                    page={current={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    page={currentPage}
                    onChangePage}
                    onChange={handlePageChangePage}
                    onChange={handlePageChange={handlePageChange}
                    color}
                    color={color}
                   }
                    color={color}
                   }
                    color={color}
                    size={size}
                    shape={color}
                    size={size}
                    shape={shape}
                    variant size={size}
                    shape={shape}
                    variant={variant}
                    size={size}
                    shape={shape}
                    variant={variant}
                   ={shape}
                    variant={variant={variant}
                    disabled={disabled || disabled={disabled || disabled={disabled ||}
                    disabled={disabled || totalPages <= 1}
                    totalPages <= 1}
                    showFirstButton={ totalPages <= 1}
                    showFirstButton={ totalPages <= 1}
                    showFirstButton={ showFirstButton={showFirstLastshowFirstLastshowFirstLast}
                    showLastshowFirstLast}
                    showLastButton={showFirst}
                    showLastButton={showFirstButton={showFirstLast}
                    render}
                    showLastButton={showFirstLast}
                    renderItem={(item) => (
                       Last}
                    renderItem={(itemLast}
                    renderItem={(itemItem={(item) => (
                        <PaginationItem
                            {... <PaginationItem
                            {...) => (
                        <PaginationItem
                            {...item}
                            components) => (
                        <PaginationItem
                            {...item}
                            componentsitem}
                            componentsitem}
                            components={{
                                previous: Chev={{
                                previous={{
                                previous={{
                                previous: ChevronLeft,
                                next:: ChevronLeft: ChevronLeftronLeft,
                                next: ChevronRight
                            }}
                       ,
                                next: ChevronRight
                            }}
                        />
                    )}
               ,
                                next: ChevronRight
                            }}
                        />
                    )}
                ChevronRight
                            }}
                        />
                    )}
                />
            </Stack />
            </Stack />
            </Stack>

            {/* Right />
                    )}
                />
            </Stack>

            {/* Right side: Page size>

            {/* Right>

            {/* Right side: Page size side: Page size selector */}
            { selector */}
            {showPageSize && side: Page size selector */}
            { selector */}
            {showPageSize && (
                <Box display="flexshowPageSize && (
                <Box (
                <Box display="flexshowPageSize && (
                <Box display="flex" alignItems="center" alignItems="center" gap={1 display="flex" alignItems="center" gap={1" alignItems="center" gap={1}>
                    <Typography variant="body" gap={1}>
                    <Typography}>
                    <Typography variant="body}>
                    <Typography variant="body2" color=" variant="body2" color="textSecondary">
                        Show2" color="textSecondary">
                        Show
                    </Typography2" color="textSecondarytextSecondary">
                        Show
                    </Typography>
                    <FormControl>
                    <FormControl">
                        Show
                    </Typography>
                    <FormControl size="small"
                    </Typography>
                    <FormControl size="small" sx size="small" sx sx={{ minWidth size="small" sx={{ minWidth: 80={{ minWidth: 80: 80 }}>
                        <Select={{ minWidth: 80 }}>
                        <Select
                            value={ }}>
                        <Select
                            value={ }}>
                        <Select
                            value={
                            value={pageSize}
                           pageSize}
                            onChange={handlePagepageSize}
                            onChange={handlePagepageSize}
                            onChange={handlePageSizeChange}
                            disabled={disabled onChange={handlePageSizeChange}
                            disabled={disabled}
                            sxSizeChange}
                            disabled={disabledSizeChange}
                            disabled={disabled}
                            sx={{
                                '}
                            sx={{
                                '={{
                                '& .}
                            sx={{
                                '& .MuiSelect-select& .MuiSelect-selectMuiSelect-select& .MuiSelect-select': {
                                    py: 0': {
                                    py: 0': {
                                    py: 0': {
                                    py: 0.5
                                }
                           .5
                                }
                           .5
                                }
                            }}
                        >
                            {pageSize.5
                                }
                            }}
                        >
                            {pageSizeOptions.map }}
                        >
                            {pageSizeOptions.map }}
                        >
                            {pageSizeOptions.map((sizeOptionOptions.map((size((sizeOption((sizeOption) => (
                                <MenuItem key={) => (
                                <MenuItem key={Option) => (
                                <MenuItem key={sizeOption} value) => (
                                <MenuItem key={sizeOption} value={sizeOptionsizeOption} value={sizeOptionsizeOption} value={sizeOption={sizeOption}>
                                    {sizeOption}>
                                    {sizeOption}
                                </MenuItem}>
                                    {sizeOption}
                                </MenuItem}>
                                    {sizeOption}
                                </MenuItem}
                                </MenuItem>
                            ))}
                       >
                            ))}
                        </Select>
                   >
                            ))}
                        </Select>
                   >
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant </Select>
                    </FormControl </FormControl>
                    <Typography variant </FormControl>
                    <Typography variant="body2" color="textSecondary="body2" color="textSecondary>
                    <Typography variant="body2" color="textSecondary">
                        per page="body2" color="textSecondary">
                        per page">
                        per page
                    </Typography>
                </Box">
                        per page
                    </Typography>
                </Box
                    </Typography>
                </Box
                    </Typography>
                </Box>
            )}
       >
            )}
        </Box>
            )}
        </Box>
            )}
        </Box </Box>
    );
>
    );
>
    );
};

export default Pagination;