import React from 'react';
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import MetricCount from './metric_count';

const mapStyles = makeStyles((theme) => {
    return {
        cardHeader: {
            marginBottom: "1.5rem",
        },
        mapContainer: {
            color: "gray",
        },
        icon: {
            strokeWidth: 0,
            stroke: "currentColor",
            fill: "currentColor",
            width: "100%",
            display: "block",
        }
    }
});

function StateMap(props) {
    const classes = mapStyles();

    return (
        <Grid item xs={12} component={Card}>
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item xs={3}>
                        <div className={classes.mapContainer}>
                            <svg className={classes.icon}>
                                <use xlinkHref={`#icon-state-${props.state}`}></use>
                            </svg>
                        </div>
                    </Grid>
                    <Grid item xs={9} container direction="column">
                        <Grid item className={classes.cardHeader}>
                            <Typography color="textPrimary" variant="h4" align="center">{props.name}</Typography>
                        </Grid>
                        <Grid item container justify="space-evenly">
                            <Grid item xs={6}>
                                <MetricCount metric="Total Positives" count={props.positiveTests} />
                            </Grid>
                            <Grid item xs={6}>
                                <MetricCount metric="Total Tested" count={props.totalTested} />
                            </Grid>
                            <Grid item xs={6}>
                                <MetricCount metric="Total Recovered" count={props.recovered} />
                            </Grid>
                            <Grid item xs={6}>
                                <MetricCount metric="Deaths" count={props.deaths} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Grid>
    );
};

export default StateMap;