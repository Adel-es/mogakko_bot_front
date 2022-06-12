import {
	AppBar,
	Box,
	Button,
	CssBaseline,
	SvgIcon,
	Toolbar,
} from "@mui/material";

import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../static/icons/discord_icon_logo.svg";
function Home() {
	return (
		<>
			<CssBaseline />
			<AppBar position="static" sx={{ flexGrow: 1 }}>
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
		</>
	);
}
export default Home;
