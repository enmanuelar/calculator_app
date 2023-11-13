import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <CircularProgress sx={{ margin: "auto" }} />
      </Container>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/*<div>*/}
      <Box sx={{ mb: 4, textAlign: "center", width: 400 }}>
        <Stack
          alignItems="center"
          direction="row"
          display="inline-flex"
          spacing={1}
          sx={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              height: 24,
              width: 24,
            }}
          >
            <img src="/vite.svg" alt="logo" />
          </Box>
          <Box
            sx={{
              color: "text.primary",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.3px",
              lineHeight: 2.5,
              "& span": {
                color: "primary.main",
              },
            }}
          >
            Arithmetic<span>Calculator</span>
          </Box>
        </Stack>
      </Box>
      <div>
        <Button
          sx={{ mt: 3, width: 300 }}
          size="large"
          variant="contained"
          onClick={() => loginWithRedirect()}
        >
          Sign in
        </Button>
      </div>
      {/*</div>*/}
    </Box>
  );
};
