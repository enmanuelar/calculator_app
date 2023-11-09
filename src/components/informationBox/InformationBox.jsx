import Box from "@mui/material/Box";
import { Card, CardContent, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";

export const InformationBox = (props) => {
  return (
    <Box
      sx={{
        alignItems: "center",
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
      <Card>
        <CardContent>
          {props.mutation.isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="green"
              >
                Result: {props.informationBoxState.result}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Balance: {props.informationBoxState.balance} Credits
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

InformationBox.propTypes = {
  mutation: PropTypes.object,
  informationBoxState: PropTypes.shape({
    result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    balance: PropTypes.string,
  }),
};
