import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const Auth = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
            width: "100%",
          }}
        >
          <CircularProgress
            sx={{
              display: "flex",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
            }}
          />
        </Box>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
