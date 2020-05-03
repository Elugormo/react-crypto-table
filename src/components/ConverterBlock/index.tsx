import React from 'react'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react' 
import CurrenciesStore from '../../stores/currenciesStore';


type IConverterBlock = { 
    classes: any;
    currenciesStore?: CurrenciesStore;
}


const ConverterBlock: React.FC<IConverterBlock> = inject('currenciesStore')
    (observer(({ classes, currenciesStore }) => { 

    const tokens: string[] =  currenciesStore!.getItems.map(token => token.name);
    console.log(tokens)
    return (
        <Paper className={classes.paper}>
        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
      <TextField label="Сумма" />
      </FormControl>
      <FormControl className={classes.currencyType}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
      Валюта
    </InputLabel>
      <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={tokens[1]}    
      >
          {
              tokens.map(name => (<MenuItem value={name}>{name}</MenuItem>))
          }
     </Select>
      </FormControl>
        </div>
        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
      <TextField label="Сумма" />
      </FormControl>
      <FormControl className={classes.currencyType}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
      Валюта
    </InputLabel>
      <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={tokens[0]}
      >
          {
              tokens.map(name => (<MenuItem value={name}>{name}</MenuItem>))
          }
     </Select>
      </FormControl>
        </div>
        <Typography variant="h5" component="h5">
        29.70 Украинская гривна
</Typography>
      </Paper>
    )
}))

export default ConverterBlock; 
