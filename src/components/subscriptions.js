import React from 'react';
import { Grid, Card, CardContent, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Divider, makeStyles } from '@material-ui/core';
import { NotificationsNone, Notifications} from '@material-ui/icons';
import client from '../utils/api_client';

const subscriptionsStyles = makeStyles((theme) => {
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
        }
    }
});

function Subscriptions(props) {
    const classes = subscriptionsStyles();
    const [selectedStates, setSelectedStates] = React.useState([]);
    const [unselectedStates, setUnselectedStates] = React.useState([]);
    const [loadingError, setLoadingError] = React.useState(false);

    const handleSelect = (val, pos) => () => {
        const update = [...unselectedStates];
        update.splice(pos, 1)
        setUnselectedStates(update);
        setSelectedStates([...selectedStates, val]);
    }

    const handleDeselect = (val, pos) => () => {
        const update = [...selectedStates];
        update.splice(pos, 1)
        setSelectedStates(update);
        setUnselectedStates([...unselectedStates, val]);
    }

    const handleSave = () => {
        submitSubs();
    }

    const submitSubs = async () => {
        try {
            await client.setSubscriptions(selectedStates.map((el) => el.code ))

            props.onSubsUpdate();
        } catch(_) {
            // TODO: Updating subs failed. notify user
        }
    }

    const getData = async () => {

        try {
            let list = await client.getStateList();
            let subs = await client.getSubscriptions();

            list = list.locations
            subs = subs.data.subscriptions

            setSelectedStates(list.filter((val) => { return subs.includes(val.code); }));
            setUnselectedStates(list.filter((val) => { return !subs.includes(val.code); }));

        } catch(_) {
            setSelectedStates([]);
            setUnselectedStates([]);
            setLoadingError(true);
        }
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Grid item xs={12} component={Card}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography color="textPrimary" variant="h5">Subscriptions</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        {/* className={classes.root} */}
                        <List>
                            {selectedStates.map((value, pos) => {
                                const labelId = `checkbox-list-label-${value.code}`;

                                return (
                                    // <div key={value.code}>{value.code}</div>
                                <ListItem key={value.code} role={undefined} dense button onClick={handleDeselect(value, pos)}>
                                    <ListItemIcon>
                                        <Notifications color="primary" />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.name} />
                                </ListItem>
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item xs={12}>
                        <List className={classes.root}>
                            {unselectedStates.map((value, pos) => {
                                const labelId = `checkbox-list-label-${value.code}`;

                                return (
                                <ListItem key={value.code} role={undefined} dense button onClick={handleSelect(value, pos)}>
                                    <ListItemIcon>
                                        <NotificationsNone />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.name} />
                                </ListItem>
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Grid>
    );
};

export default Subscriptions;