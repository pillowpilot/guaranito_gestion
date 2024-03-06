import React from "react";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Renders the name of the company
 */
const Logo = ({ text }) => {
  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: "bold",
        color: "primary.main",
        textTransform: "uppercase",
        textAlign: "center",
      }}
    >
      {text}
    </Typography>
  );
};

Logo.propTypes = {
  /**
   * Text to display
   */
  text: PropTypes.string,
};

Logo.defaultProps = {
  text: "LOGO",
};

export default Logo;
