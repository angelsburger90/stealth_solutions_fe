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
import { isEmailFormat } from "@services/string.services";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";

const LoginPage = (): JSX.Element => {
  const [loginPayload, setLoginPayload] = useState<TUserAuth>();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: formErrors },
  } = useForm<TUserAuth>();

  const { isAuthenticated, authenticateUser, errors, isError } =
    useAuthenticateUser();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState(false);

  const isFormValidated = (formData: TUserAuth): boolean => {
    let isValidated = false;
    if (
      !formData.userId ||
      formData.userId.trim().length <= 0 ||
      !isEmailFormat(formData.userId)
    ) {
      isValidated = true;
      setError("userId", { message: "Invalid email input." });
    }
    if (!formData.password || formData.password.trim().length <= 0) {
      isValidated = true;
      setError("password", { message: "Invalid password input." });
    }
    return isValidated;
  };

  const onSubmitForm: SubmitHandler<TUserAuth> = (data: TUserAuth) => {
    if (isFormValidated(data)) return;
    setLoginPayload(data);
  };

  useEffect(() => {
    if (loginPayload) {
      setOpenLoading(true);
      authenticateUser(loginPayload);
    }
  }, [loginPayload, authenticateUser]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isAuthenticated) {
      setOpenLoading(false);
      navigate(TAppPage.USER_DETAILS_PAGE);
    }
    if (errors || isError) setOpenLoading(false);
  }, [isAuthenticated, errors, isError]);

  const DisplayFieldError = ({
    field,
  }: {
    field?: FieldError;
  }): JSX.Element => {
    return (
      <>{field && <span className="text-red-500">{field.message}</span>}</>
    );
  };

  return (
    <>
      <LoadingDialog open={openLoading} />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="flex mt-4 items-center flex-col h-screen justify-center">
          <Avatar className="m-1 !bg-pink-600">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitForm)}
            noValidate
            className="!mt-1"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={isError}
              {...register("userId", { required: true })}
            />
            <DisplayFieldError field={formErrors?.userId} />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={isError}
              {...register("password", { required: true })}
            />
            <DisplayFieldError field={formErrors?.password} />

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
