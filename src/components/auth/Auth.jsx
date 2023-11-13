import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../loading/Loading.jsx";

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
        <Loading />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
