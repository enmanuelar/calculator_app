import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";

export const TopNav = () => {
  const { logout } = useAuth0();
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Arithmetic Calculator
      </Typography>
      <Divider />
      <Box>
        <Button
          sx={{ color: "#fff" }}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};
