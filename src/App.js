import React from 'react';
import theme from './theme/mui-theme'
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
// import './App.css';
import Home from './sections/home';
import { Router } from '@reach/router';
import UserDashboard from './sections/user_dashboard';
import Login from './sections/login';
import Signup from './sections/signup';
import client from './utils/api_client';
import { AuthError } from './utils/api_client';
import { navigate } from "@reach/router";
import LoginStatusContext from './utils/login_status_context';


const useStyles = makeStyles((theme) => {
  return {
    App: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appTitle: {
      flex: 1,
    },
    hide: {
      display: 'none',
    },
    customToolbar: {
      padding: theme.spacing(0, 2),
    },
    drawerToolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }
});

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const classes = useStyles();

  const handleLogOut = () => {
    client.logout().then(() => {
      setCurrentUser(null);
      setLoggedIn(false);
      navigate('/');
    }).catch((e) => {
      // TODO: Notify user logout failed
    });
  }

  const navToLogIn = () => {
    navigate('/login');
  }

  const navToSignUp = () => {
    navigate('/signup')
  }
  // const navToAbout = () => {
  //   navigate('/about');
  // }

  const getUser = () => {
    client.getUser().then((user) => {
      setCurrentUser(user);
      setLoggedIn(true);
    }).catch((err) => {
      if (err instanceof AuthError) {
        setLoggedIn(false);
      }
    });
  }

  const onLogin = () => {
    getUser();
    navigate('/dashboard');
  }

  const onSignup = () => {
    navigate('/login')
  }

  React.useEffect(() => {
    getUser();
  }, [])

  return (
    <div className="App">
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
          <AppBar position="fixed">
            <Toolbar disableGutters className={classes.customToolbar}>
              <Typography variant="h6" noWrap className={classes.appTitle}>
                CoronAlert
              </Typography>
              <Button size="large" variant="text" color="inherit" onClick={navToSignUp}>Sign Up</Button>
            { loggedIn ? <Button size="large" variant="text" color="inherit" onClick={handleLogOut}>Log Out</Button> : <Button size="large" variant="text" color="inherit" onClick={navToLogIn}>Log In</Button> }
            </Toolbar>
          </AppBar>
          <main className={classes.content}>
            <div className={classes.drawerToolbar} />
            <LoginStatusContext.Provider value={{loggedIn: loggedIn}}>
              <Router>
                <Home path="/" />
                <UserDashboard path="/dashboard" />
                <Login path="/login" onLogin={onLogin}/>
                <Signup path="/signup" onSignup={onSignup}/>
              </Router>
            </LoginStatusContext.Provider>
          </main>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
