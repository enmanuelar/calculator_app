import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
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
  );
};
