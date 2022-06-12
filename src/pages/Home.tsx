import {
	alpha,
	AppBar,
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	SvgIcon,
	Toolbar,
	Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../static/icons/discord_icon_logo.svg";
function Home() {
	return (
		<>
			<CssBaseline />
			<AppBar
				position="static"
				sx={{ flexGrow: 1, backgroundColor: alpha("#000000", 0.5) }}
			>
				<Toolbar>
					<Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
						<SvgIcon>
							<Logo />
						</SvgIcon>
					</Box>
					<Button
						color="inherit"
						variant="outlined"
						component={Link}
						to={"/signup"}
						sx={{ my: 1, mx: 1.5 }}
					>
						회원가입
					</Button>
					<Button
						color="inherit"
						component={Link}
						to={"/signin"}
						sx={{ my: 1, mx: 1.5 }}
					>
						로그인
					</Button>
				</Toolbar>
			</AppBar>
			<Container
				// disableGutters
				maxWidth="sm"
				component="main"
				sx={{ pt: 8, pb: 6 }}
			>
				<Typography
					component="h1"
					variant="h2"
					align="center"
					color="text.primary"
					// gutterBottom
				>
					모각코
				</Typography>
			</Container>
		</>
	);
}
export default Home;
