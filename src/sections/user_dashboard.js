import React from 'react';
import { Grid, Typography, makeStyles, Divider } from '@material-ui/core'
import USAMap from '../components/usa_map';
import StateMap from '../components/state_map';
import Subscriptions from '../components/subscriptions';
import client from '../utils/api_client';

const sectionStyles = makeStyles((theme) => {
    return {
        sectionDivider: {
            height: "0.2rem",
            marginBottom: "1.5rem",
            backgroundColor: theme.palette.text.secondary,
        },
        withBottomMargin: {
            marginBottom: "1.5rem",
        }
    }
});

function UserDashboard() {
    const [allCurrent, setAllCurrent] = React.useState([]);
    
    const classes = sectionStyles();

    const getSubsCurrent = async () => {
        try {
            let ac = await client.getSubsCurrent();

            setAllCurrent(ac);
        } catch(_) {
            setAllCurrent([]);
        }
    };

    const onSubsUpdate = () => {
        getSubsCurrent();
    };

    React.useEffect(() => {
        getSubsCurrent();
    }, []);

    const nf = new Intl.NumberFormat();

    return (
        <React.Fragment>
            <Grid container justify="center" className={classes.withBottomMargin}>
                <Grid item xs={12} md={10}>
                    <Typography color="textSecondary" component="h1" variant="h3"> My Dashboard</Typography>
                    <Divider className={classes.sectionDivider}/>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid item xs={12} md={10} container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            { allCurrent.map((value) => {
                                return (
                                    <Grid key={`state-detail-${value.state_code}`} item xs={12} className={classes.withBottomMargin}>
                                        <StateMap name={value.state_name} state={value.state_code} positiveTests={nf.format(value.positive_tests)} totalTested={nf.format(value.total_tested)} recovered={nf.format(value.recovered)} deaths={nf.format(value.deaths)} />
                                    </Grid>
                                )
                            }) }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container>
                            <Subscriptions onSubsUpdate={onSubsUpdate} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default UserDashboard;