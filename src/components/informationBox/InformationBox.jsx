import Box from "@mui/material/Box";
import { Divider, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";
import { InformationText } from "./InformationText.jsx";

export const InformationBox = (props) => {
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
          isLoading={props.mutation.isLoading}
          text={`Result: ${props.informationBoxState.result}`}
          color={"green"}
        />
        <Divider />
        <InformationText
          isLoading={props.mutation.isLoading}
          text={`Operation type: ${props.informationBoxState.operationType}`}
        />
        <Divider />
        <InformationText
          isLoading={props.mutation.isLoading}
          text={`Operation cost: ${props.informationBoxState.lastCost} Credits`}
          color={"indianred"}
        />
        <Divider />
        <InformationText
          isLoading={props.mutation.isLoading}
          text={`Balance: ${props.informationBoxState.balance} Credits`}
        />
        <Divider />
      </Paper>
    </Box>
  );
};

InformationBox.propTypes = {
  mutation: PropTypes.object,
  informationBoxState: PropTypes.shape({
    result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    balance: PropTypes.string,
    lastCost: PropTypes.number,
    operationType: PropTypes.string,
  }),
};
