import { Box, ButtonBase, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const TopNav = () => {
  const { logout } = useAuth0();
  const location = useLocation();
  return (
    <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Arithmetic Calculator
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "max-content max-content",
          gap: "20px",
          margin: "10px",
        }}
      >
        {location.pathname === "/history" ? (
          <ButtonBase
            component={Link}
            sx={{
              color: "#fff",
              textTransform: "uppercase",
              "&:hover": {
                color: "lightblue",
              },
            }}
            to={"/dashboard"}
          >
            dashboard
          </ButtonBase>
        ) : (
          <ButtonBase
            component={Link}
            sx={{
              color: "#fff",
              textTransform: "uppercase",
              "&:hover": {
                color: "lightblue",
              },
            }}
            to={"/history"}
          >
            History
          </ButtonBase>
        )}
        <ButtonBase
          sx={{
            color: "#fff",
            textTransform: "uppercase",
            "&:hover": {
              color: "lightblue",
            },
          }}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </ButtonBase>
      </Box>
    </Box>
  );
};
