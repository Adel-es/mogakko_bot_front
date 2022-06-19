import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export function RegistrationComplete() {
	return (
		<>
			<Grid container direction="column" spacing={10} justifyContent="center">
				<Grid item textAlign={"center"}>
					<Box style={{ fontSize: "20px" }}>회원가입을 완료하였습니다.</Box>
				</Grid>
				<Grid item container justifyContent="center" spacing={2}>
					<Grid item>
						<Button
							fullWidth
							variant="outlined"
							component={Link}
							to={"/signin"}
						>
							로그인 창으로 이동하기
						</Button>
					</Grid>
					<Grid item>
						<Button fullWidth variant="outlined" component={Link} to={"/"}>
							메인 홈으로 이동하기
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}
