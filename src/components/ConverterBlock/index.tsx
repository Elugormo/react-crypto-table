import React from 'react'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography'

type IConverterBlock = { 
    classes: any;
}


const ConverterBlock: React.FC<IConverterBlock> = ({ classes }) => { 
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
      value={10}    
      >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
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
      value={10}
      >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
     </Select>
      </FormControl>
        </div>
        <Typography variant="h5" component="h5">
        29.70 Украинская гривна
</Typography>
      </Paper>
    )
}

export default ConverterBlock; 
