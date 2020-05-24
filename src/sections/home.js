import React from 'react';
import { Grid, Typography, makeStyles, Divider } from '@material-ui/core'
import USAMap from '../components/usa_map';
import StateMap from '../components/state_map';
import client from '../utils/api_client';
import StateFilter from '../components/state_filter';
import { Link } from '@reach/router';
import LoginStatusContext from '../utils/login_status_context'

const sectionStyles = makeStyles((theme) => {
    return {
        sectionDivider: {
            height: "0.2rem",
            marginBottom: "1.5rem",
            backgroundColor: theme.palette.text.secondary,
        },
        withBottomMargin: {
            marginBottom: "1.5rem",
        },
        simpleLink: {
            textDecoration: "none",
            color: "#CCCCCC",
            '&:hover': {
                color: theme.palette.primary.main,
            }
        }
    }
});

function Home() {
    const [allCurrent, setAllCurrent] = React.useState([]);
    const [displayed, setDisplayed] = React.useState([]);

    const loginStatus = React.useContext(LoginStatusContext)
    
    const classes = sectionStyles();

    const onUpdate = (selected) => {
        let selectedCodes = selected.map((d) => { return d.code });

        let filtered = allCurrent.filter((el) => { return selectedCodes.includes(el.state_code) });

        setDisplayed(filtered)
    }

    const getAllCurrent = async () => {
        try {
            let ac = await client.getAllCurrent();

            setAllCurrent(ac);
            setDisplayed(ac);

        } catch(_) {
            setAllCurrent([]);
            setDisplayed([]);
        }
    };

    React.useEffect(() => {
        getAllCurrent();
    }, []);

    const nf = new Intl.NumberFormat();

    return (
        <React.Fragment>
            <Grid container justify="center" className={classes.withBottomMargin}>
                <Grid item xs={12} md={10}>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography color="textSecondary" component="h1" variant="h3">Home</Typography>
                        </Grid>
                        { loginStatus.loggedIn && <Grid item>
                            <Link to="dashboard" className={classes.simpleLink}><Typography color="inherit" component="h1" variant="h3">My Dashboard</Typography></Link>
                        </Grid> }
                    </Grid>
                    <Divider className={classes.sectionDivider}/>
                    <USAMap data={allCurrent} />
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid item xs={12} md={10} container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            { displayed.map((value) => {
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
                            <StateFilter stateList={displayed.map((el) => { return { code: el.state_code, name: el.state_name }})} onUpdate={onUpdate} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Home;