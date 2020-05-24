import React from 'react';
import { Grid, Typography, makeStyles, Divider } from '@material-ui/core'
import USAMap from '../components/usa_map';

const sectionStyles = makeStyles((theme) => {
    return {
        sectionDivider: {
            height: "0.2rem",
            marginBottom: "1.5rem",
            backgroundColor: theme.palette.text.secondary,
        },
        inputPrompt: {
            padding: "1em 0.5em 1em 1em",
        },
        input: {
            padding: "1em 0.5em 1em 0.5em",
        },
        endButton: {
            minWidth: "0px !important"
        }
    }
});

function Home() {
    const classes = sectionStyles();
    return (
        <Grid container justify="center">
            <Grid item xs={12} md={10}>
                <Typography color="textSecondary" component="h1" variant="h2">Home</Typography>
                <Divider className={classes.sectionDivider}/>
                <USAMap />
            </Grid>
        </Grid>
    );
}

export default Home;