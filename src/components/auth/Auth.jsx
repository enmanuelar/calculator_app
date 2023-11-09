import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";

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
        <CircularProgress sx={{ margin: "auto" }} />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
