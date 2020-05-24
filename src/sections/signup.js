import React from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, TextField, Button, makeStyles, Divider } from '@material-ui/core';
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

function Signup(props) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password,setPassword] = React.useState("");

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

  const handleInputKeyPress = (e) => {
      if (e.key === "Enter") {
          handleSignup();
      }
  };

  const handleSignup = () => {
    if(username && password && email && phone) {
      client.signup(username, password, email, phone).then(() => {
        props.onSignup();
      })
    }
  }

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
