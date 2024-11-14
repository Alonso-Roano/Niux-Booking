import React from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Definimos el componente personalizado `CustomTooltip`
const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    transform: 'skew(-10deg)',
  },
  [`& .MuiTooltip-arrow`]: {
    color: '#fff',
  },
});

const Tooltips: React.FC = () => {
  return (
    <CustomTooltip title="Clientes" arrow placement="right">
      <Button>
          👤
      </Button>
    </CustomTooltip>
  );
};

export default Tooltips;
