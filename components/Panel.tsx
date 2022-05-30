import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import * as React from "react";

export const Panel = (props: {
    xs?: number;
    md?: number;
    lg?: number;
    height?: number | string;
    children: JSX.Element;
}) => {
    return (
        <Grid item xs={props.xs || 12} md={props.md || 12} lg={props.lg || 12}>
            <Paper
                sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: props.height || "auto",
                    overflow: "scroll"
                }}
            >
                {props.children}
            </Paper>
        </Grid>
    );
};
