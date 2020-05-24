import React from 'react';
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import maps from '../utils/maps'
import MetricCount from './metric_count'
import client from '../utils/api_client';

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

function USAMap(props) {
    const [usTotals, setUsTotals] = React.useState({});

    const classes = mapStyles();

    const mapRef = React.useRef(null);

    const renderMap = (ref, data) => {
        maps.usa(ref, data);
    };
    React.useEffect(() => {
        if (mapRef.current) {
            renderMap(mapRef.current, props.data);
        }
    }, [mapRef, props.data]);

    React.useEffect(() => {
        function handleResize() {
          renderMap(mapRef.current, props.data);
        }
        
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [mapRef, props.data]);

    const getData = async () => {
        try {
            const totals = await client.getCountryTotals();

            setUsTotals(totals);

        } catch(_) {
            // TODO: some error handling
        }
    };

    React.useEffect(() => {
        getData();
    }, []);

    const nf = new Intl.NumberFormat();

    return (
        <Grid container item xs={12} component={Card} direction="column">
            <CardContent>
            <Grid item className={classes.cardHeader}>
                <Typography color="textPrimary" variant="h4" align="center">United States</Typography>
            </Grid>
            <Grid container item justify="space-evenly">
                <MetricCount metric="Total Positives" count={usTotals.positive_tests ? nf.format(usTotals.positive_tests) : "--"} />
                <MetricCount metric="Total Tested" count={usTotals.total_tested ? nf.format(usTotals.total_tested) : "--"} />
                <MetricCount metric="Total Recovered" count={usTotals.recovered ? nf.format(usTotals.recovered) : "--"} />
                <MetricCount metric="Deaths" count={usTotals.deaths ? nf.format(usTotals.deaths) : "--"} />
            </Grid>
            <div ref={mapRef} className={classes.mapContainer}>
            </div>
            </CardContent>
        </Grid>
    );
};

export default USAMap;