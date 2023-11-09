import { Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";

export const InformationText = ({ isLoading, text, color = "" }) => {
  return (
    <>
      {isLoading ? (
        <Skeleton variant={"rectangular"} />
      ) : (
        <Typography gutterBottom component="div" color={color}>
          {text}
        </Typography>
      )}
    </>
  );
};

InformationText.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};
