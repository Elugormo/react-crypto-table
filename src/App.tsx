import React from 'react';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';
import axios from 'axios'

import { CryptoTable, ConverterBlock } from './components'
import { TToken } from './types/index'
import useStyles from './styles'
// const APIKEY = `a3e6cc11bfdb61aecb04afbfda96bf89628412c141474ea6db52cd3cf4318bfb`;


function App() {

  const classes = useStyles();
  const [ allTokens, setAllTokens ] = React.useState<TToken[]>([]);

  React.useEffect(() => {
    axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`)
    .then( ({ data })  => { 
    const tokens : TToken[] = data.Data.map((coin: any) => { 
      const obj: TToken = { 
        name: coin.CoinInfo.Name, 
        fullName: coin.CoinInfo.FullName, 
        imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`, 
        price: coin.RAW.USD.PRICE.toFixed(2), 
        volume24Hour: coin.RAW.USD.VOLUME24HOUR.toFixed(2)
      }

      return obj;
    });  
    console.log(tokens)
    setAllTokens(tokens);
    })
  }, [classes]);


  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <CryptoTable classes={classes} items={allTokens} />
        </Grid>
        <Grid item xs={4}>
          <ConverterBlock classes={classes} />
        </Grid>
      </Grid>
  </Container>
  );
}

export default App;
