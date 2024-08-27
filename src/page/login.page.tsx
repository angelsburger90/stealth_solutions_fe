import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TAppPage, TUserAuth } from "@model/data.types";
import { useAuthenticateUser } from "@hooks/useUserAuthDetails.hooks";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "@components/loading.dialog.component";

const LoginPage = (): JSX.Element => {
  const [loginPayload, setLoginPayload] = useState<TUserAuth>();
  const { isAuthenticated, authenticateUser, errors, isError } =
    useAuthenticateUser();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoginPayload({
      userId: data.get("email")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
    });
  };

  useEffect(() => {
    if (loginPayload) {
      setOpenLoading(true);
      authenticateUser(loginPayload);
    }
  }, [loginPayload, authenticateUser]);

  useEffect(() => {
    if (isAuthenticated) {
      setOpenLoading(false);
      navigate(TAppPage.USER_DETAILS_PAGE);
    }
    if (errors || isError) setOpenLoading(false);
  }, [isAuthenticated, errors, isError]);

  return (
    <>
      <LoadingDialog open={openLoading} />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="flex mt-4 items-center flex-col h-screen justify-center">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            className="!mt-1"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={isError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={isError}
            />

            {isError && (
              <Box className="text-red-500">Invalid credentials.</Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!mt-3 !mb-3"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
