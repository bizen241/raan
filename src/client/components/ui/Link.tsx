import { Link as MuiLink, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const Link = React.memo<{
  to: string;
  label: React.ReactNode;
}>(({ to, label }) => {
  return (
    <MuiLink underline="always" color="textPrimary" component={RouterLink} to={to}>
      <Typography>{label}</Typography>
    </MuiLink>
  );
});
