import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Hidden } from '@mui/material';

export default function LoadSkeleton({ row = 12 }) {
    return (
        <Box sx={{ mx: 3, overflowY: "scroll" }} overflow="Hidden">
            <Skeleton animation="wave" height={80} sx={{ my: 3 - 3 }} />

            {Array.from({ length: row }, (_, index) => (
                <Skeleton key={index} animation="wave" height={80} sx={{ my: -3 }} />
            ))}
        </Box>
    );

}


{/* <Skeleton animation="wave" height={80} sx={{my: -3}} />
            <Skeleton animation="wave" height={80} sx={{my: -3}} />
            <Skeleton animation="wave" height={80} sx={{my: -3}} />
            <Skeleton animation="wave" height={80} sx={{my: -3}} />
            <Skeleton animation="wave" height={80} sx={{my: -3}} />
            <Skeleton animation="wave" height={80} sx={{my: -3}} />
            <Skeleton animation="wave" height={80} sx={{my: -3}} />
            <Skeleton animation="wave" height={80} sx={{my: -3}} />
            <Skeleton animation="wave" height={80} sx={{my: -3}} />
            <Skeleton animation="wave" height={80} sx={{my: -3}} /> */}