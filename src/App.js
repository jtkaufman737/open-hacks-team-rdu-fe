import React from 'react';
import theme from './theme/mui-theme'
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core';
// import './App.css';
import Home from './sections/home';
import { Router } from '@reach/router';

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
  const classes = useStyles();

  return (
    <div className="App">
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar disableGutters className={classes.customToolbar}>

            {/* { props.user &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
            } */}
            <Typography variant="h6" noWrap>
              CoronAlert
            </Typography>

            {/* <Button size="medium" variant="text" color="inherit" onClick={handleLogOut}>Log Out</Button> */}
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.drawerToolbar} />
          <Router>
            <Home path="/" />
          </Router>
        </main>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
