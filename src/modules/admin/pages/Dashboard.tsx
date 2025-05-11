import { useState } from "react";
import DashContent from "@shared/constructors/DashContent";
import { Box, Button, Drawer, List, ListItem } from "@mui/material";
import DashboardIcon from "@shared/svgs/Dashboard";
import Service from "@shared/svgs/Service";
import Client from "@shared/svgs/Client";
import Sale from "@shared/svgs/Sale";
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import data from "@admin/json/dashboardAdmin.json";
import Header from "@shared/components/Header";
import Company from "@shared/svgs/Company";
import Tag from "@shared/svgs/Tag";

function Dashboard() {
  const [opcion, setOpcion] = useState<any>(data.dashboard);

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

  const drawer = (
    <List className="dashIconos">
      <ListItem>
        <CustomTooltip title="Dashboard" arrow placement="right">
          <Button onClick={() => setOpcion(data.dashboard)}>
            <DashboardIcon />
          </Button>
        </CustomTooltip>
      </ListItem>
      <ListItem>
        <CustomTooltip title="Servicios" arrow placement="right">
          <Button onClick={() => setOpcion(data.service)}>
            <Service />
          </Button>
        </CustomTooltip>
      </ListItem>
      <ListItem>
        <CustomTooltip title="Usuarios" arrow placement="right">
          <Button onClick={() => setOpcion(data.clients)}>
            <Client />
          </Button>
        </CustomTooltip>
      </ListItem>
      <ListItem>
        <CustomTooltip title="Ventas" arrow placement="right">
        <Button onClick={() => setOpcion(data.sales)}>
            <Sale />
          </Button>
        </CustomTooltip>
      </ListItem>
      <ListItem>
        <CustomTooltip title="Empresas" arrow placement="right">
          <Button onClick={() => setOpcion(data.company)}>
            <Company />
          </Button>
        </CustomTooltip>
      </ListItem>
      <ListItem>
        <CustomTooltip title="Categorias" arrow placement="right">
          <Button onClick={() => setOpcion(data.tag)}>
            <Tag />
          </Button>
        </CustomTooltip>
      </ListItem>
    </List>
  );

  return (
    <>
      <Header setOption={setOpcion} />
      <Box sx={{ display: 'flex', backgroundColor: "#f4f4f4", minHeight: "calc(100vh - 75px)" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: { xs: 50, sm: 75 },
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: { xs: 50, sm: 75 },
              position: 'fixed',
              height: '100vh',
              top: "70px",
              zIndex: 10,
            },
            display: { xs: 'none', sm: 'block' }
          }}
        >
          {drawer}
        </Drawer>
        <DashContent data={opcion} setOpcion={setOpcion} />
      </Box>
    </>
  );
}

export default Dashboard;
