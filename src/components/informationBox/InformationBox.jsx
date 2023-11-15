import Box from "@mui/material/Box";
import { Divider, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";
import { InformationText } from "./InformationText.jsx";

export const InformationBox = ({
  isPending,
  operationResult,
  userBalance,
  lastCost,
  selectedOperationType,
}) => {
  return (
    <Box
      sx={{
        alignItems: "inherit",
        backgroundColor: "neutral.800",
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        color: "common.white",
        display: "flex",
        flex: {
          xs: "0 0 auto",
          md: "1 1 auto",
        },
        justifyContent: "center",
        p: {
          xs: 4,
          md: 8,
        },
      }}
    >
      <Paper
        elevation={3}
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          maxWidth: 270,
          minWidth: 230,
        }}
      >
        <Typography variant="h4">Information</Typography>
        <InformationText
          isLoading={isPending}
          text={`Result: ${operationResult}`}
          color={"green"}
        />
        <Divider />
        <InformationText
          isLoading={isPending}
          text={`Operation type: ${selectedOperationType}`}
        />
        <Divider />
        <InformationText
          isLoading={isPending}
          text={`Operation cost: ${lastCost} Credits`}
          color={"indianred"}
        />
        <Divider />
        <InformationText
          isLoading={isPending}
          text={`Balance: ${userBalance} Credits`}
        />
        <Divider />
      </Paper>
    </Box>
  );
};

InformationBox.propTypes = {
  isPending: PropTypes.bool,
  operationResult: PropTypes.string,
  userBalance: PropTypes.number,
  lastCost: PropTypes.number,
  selectedOperationType: PropTypes.string,
};
