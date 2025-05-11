import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

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

type TooltipsProps = {
    Componente: React.ElementType;
    text: string;
};

const Tooltips: React.FC<TooltipsProps> = ({ Componente, text }) => {
    return (
        <CustomTooltip title={text} arrow placement="right">
            <Componente />
        </CustomTooltip>
    );
};

export default Tooltips;
