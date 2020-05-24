import React from 'react';
import { Grid, Card, CardContent, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Divider, makeStyles } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';

const filterStyles = makeStyles((theme) => {
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

function StateFilter(props) {
    const classes = filterStyles();
    const [selectedStates, setSelectedStates] = React.useState([]);
    const [unselectedStates, setUnselectedStates] = React.useState([]);

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

    const handleUpdate = () => {
        props.onUpdate(selectedStates);
    }

    React.useEffect(() => {
        setSelectedStates(props.stateList);
    }, [props.stateList]);

    return (
        <Grid item xs={12} component={Card}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography color="textPrimary" variant="h5">Filter</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
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
                                        <CheckBox color="primary" />
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
                                        <CheckBoxOutlineBlank />
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

export default StateFilter;