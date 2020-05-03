import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { CryptoTable, ConverterBlock } from './components'
import useStyles from './styles'
// const APIKEY = `a3e6cc11bfdb61aecb04afbfda96bf89628412c141474ea6db52cd3cf4318bfb`;


function App() {

  const classes = useStyles();


  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <CryptoTable classes={classes} />
        </Grid>
        <Grid item xs={4}>
          <ConverterBlock classes={classes} />
        </Grid>
      </Grid>
  </Container>
  );
}

export default App;
