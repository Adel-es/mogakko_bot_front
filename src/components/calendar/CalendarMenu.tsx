import {
	AppBar,
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const drawerWidth = 120;
export function CalendarMenu({ addEvent }: { addEvent: any }) {
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);

	const handleDrawerToggle = () => {
		setMobileOpen((current) => !current);
	};
	const menuDrawer = (
		<div>
			<List>
				<ListItem sx={{ justifyContent: "center" }}>
					<Button variant="contained" onClick={() => addEvent(new Date())}>
						<AddIcon />
					</Button>
				</ListItem>
			</List>
		</div>
	);
	const actions = [{ icon: <AddIcon />, name: "Add" }];
	return (
		<Box>
			<SpeedDial
				ariaLabel="Menu Dial"
				sx={{
					display: { sm: "none" },
					position: "absolute",
					bottom: 16,
					right: 16,
				}}
				icon={<SpeedDialIcon />}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={() => addEvent(new Date())}
					/>
				))}
			</SpeedDial>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar sx={{ display: { sm: "none" } }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box
				component={"nav"}
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{ keepMounted: true }}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{menuDrawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{menuDrawer}
				</Drawer>
			</Box>
		</Box>
	);
}
