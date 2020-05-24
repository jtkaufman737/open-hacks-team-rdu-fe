import React from 'react';
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import maps from '../utils/maps'

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

const mapStyles = makeStyles((theme) => {
    return {
        cardHeader: {
            marginBottom: "1.5rem",
        },
        mapContainer: {
            height: "45vh",
        }
    }
});

function USAMap() {
    const classes = mapStyles();

    const mapRef = React.useRef(null);

    const renderMap = (ref) => {
        maps.usa(ref);
    };
    React.useEffect(() => {
        if (mapRef.current) {
            renderMap(mapRef.current);
        }
    }, [mapRef]);

    React.useEffect(() => {
        function handleResize() {
          renderMap(mapRef.current);
        }
        
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [mapRef]);

    return (
        <Grid container item xs={12} component={Card} direction="column">
            <CardContent>
            <Grid item className={classes.cardHeader}>
                <Typography color="textPrimary" variant="h4" align="center">United States</Typography>
            </Grid>
            <Grid container item justify="space-evenly">
                <MetricCount metric="Total Positives" count="9,999" />
                <MetricCount metric="Total Tested" count="9,999" />
                <MetricCount metric="Total Recovered" count="9,999" />
                <MetricCount metric="Deaths" count="9,999" />
            </Grid>
            <div ref={mapRef} className={classes.mapContainer}>
            </div>
            </CardContent>
        </Grid>
    );
};

export default USAMap;