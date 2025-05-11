import React from 'react';
import { SwipeableDrawer, IconButton, Box } from '@mui/material';
import Close from '@shared/svgs/Close';

interface CustomSwipeableDrawerProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => void;
  children: React.ReactNode;
  size?:number
}

const OffCanvas: React.FC<CustomSwipeableDrawerProps> = ({
  drawerOpen,
  toggleDrawer,
  children,
  size
}) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
      sx={{
        width: { xs: '100%', sm: size ? size : 350 },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: size ? size : 350  },
          padding: 2,
        },
      }}
    >
      <IconButton
        onClick={() => toggleDrawer(false)}
        sx={{
          position: 'fixed',
          top: 10,
          right: 10,
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <Close />
      </IconButton>

      <Box sx={{ padding: 2 }}>{children}</Box>
    </SwipeableDrawer>
  );
};

export default OffCanvas;
