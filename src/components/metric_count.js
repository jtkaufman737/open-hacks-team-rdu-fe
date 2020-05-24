import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core'

const countStyles = makeStyles((theme) => {
    return {
        count: {
            fontWeight: "bold",
        }
    }
});

function MetricCount(props) {

    const classes = countStyles();

    return (
        <Grid item>
            <Grid container direction="column">
                <Grid item>
                    <Typography color="textSecondary" variant="h4" align="center" className={classes.count}>{props.count}</Typography>
                </Grid>
                <Grid item>
                    <Typography color="textSecondary" variant="h6" align="center">{props.metric}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MetricCount;