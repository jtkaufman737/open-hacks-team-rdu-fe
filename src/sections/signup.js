import React from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button, makeStyles, Divider, FormLabel, FormControl, FormGroup, FormHelperText, Checkbox, FormControlLabel } from '@material-ui/core';
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
        },
        formControl:  {
            marginTop: theme.spacing(5),
        },
        checkBoxGroup: {
            marginTop: theme.spacing(2)
        }
    }
});

function Signup(props) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [notifications, setNotifications] = React.useState({
    textEnabled: false,
    emailEnabled: false
  })

  const classes = sectionStyles();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleNotificationsChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked })
  }

  const handleInputKeyPress = (e) => {
      if (e.key === "Enter") {
          handleSignup();
      }
  };

  const handleSignup = () => {
    if(username && password && email && phone) {
      let data = { username, password, email, phone }
      data.textEnabled = notifications.textEnabled
      data.emailEnabled = notifications.emailEnabled

      client.signup(data).then(() => {
        props.onSignup();
      })
    }
  }

  const { textEnabled, emailEnabled } = notifications

  return(
    <React.Fragment>
        <Grid container justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6} >
              <Card>
                <CardHeader title="Sign Up" titleTypographyProps={{
                  color: "primary"
                }} />
                <Divider />
                <CardContent>
                  <TextField
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleEmailChange}
                    onKeyPress={handleInputKeyPress}
                    type="text"
                  />
                  <TextField
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleUsernameChange}
                    onKeyPress={handleInputKeyPress}
                    type="text"
                  />
                  <TextField
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handlePasswordChange}
                    onKeyPress={handleInputKeyPress}
                    type="password"
                  />
                  <TextField
                    label="Phone"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handlePhoneChange}
                    onKeyPress={handleInputKeyPress}
                    type="text"
                  />
                 <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Choose your subscription options to receive Coronavirus updates in specific locations.</FormLabel>
                  <FormGroup className={classes.checkBoxGroup}>
                      <FormControlLabel
                        control={<Checkbox checked={textEnabled} onChange={handleNotificationsChange} name="textEnabled" />}
                        label="Text Alerts Enabled"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={emailEnabled} onChange={handleNotificationsChange} name="emailEnabled" />}
                        label="Email Alerts Enabled"
                      />
                    </FormGroup>
                  </FormControl>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button color="primary" size="large" variant="contained" fullWidth onClick={handleSignup}>Sign Up</Button>
                </CardActions>
              </Card>
            </Grid>
        </Grid>
    </React.Fragment>
  );
}

export default Signup;
