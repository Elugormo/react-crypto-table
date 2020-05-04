import React, { useState, useReducer } from 'react'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react' 
import CurrenciesStore from '../../stores/currenciesStore';
import ConverterStore from '../../stores/converterStore';
import { TSelectedToken } from '../../types';


type IConverterBlock = { 
    classes: any;
    currenciesStore?: CurrenciesStore;
    converterStore?: ConverterStore;
}

type TReducerState = {
    value1: string;
    value2: string;
    inPrice: number;
    outPrice: number;
}

type TSetValueAction = { 
    type: string;
    payload: string;
}

type TAction = TSetValueAction;

function reducer(state: TReducerState, action: any ) : TReducerState { 
    switch(action.type) { 
        case 'set_value':
            return {
                ...state, 
                [action.payload.name]: action.payload.value, 
                value2: String((Number(action.payload.value) * state.inPrice) / state.outPrice),
            }
        case 'SET_PRICES':
            return {
                ...state,
                inPrice: action.payload.in,
                outPrice: action.payload.out,
        };    
        default: 
            return state;
    }
}

const ConverterBlock: React.FC<IConverterBlock> = inject('currenciesStore', 'converterStore')
    (observer(({ classes, currenciesStore, converterStore }) => { 
    const [selectedToken, setSelectedToken] = useState('USD');    
    const tokens: string[] =  currenciesStore!.getItems.map(token => token.name);
    const inPrice = Number(converterStore?.getToken.price) || 0;
    const outPrice = Number(currenciesStore!.getItems.find(obj => obj.name === selectedToken)?.price) || 29;
    const [state, dispatch] = useReducer(reducer, { 
        value1: '', 
        value2: '', 
        inPrice,
        outPrice
    })

    const onFieldUpdate = (name: string, value: string) => { 
        dispatch({
            type: 'set_value', 
            payload: {
                name, 
                value
            }
        })
    }

    React.useEffect(() => {
        dispatch({
          type: 'SET_PRICES',
          payload: {
            in: inPrice,
            out: outPrice,
          },
        });
      }, [inPrice, outPrice]);

  
    console.log(tokens)
    return (
        <Paper className={classes.paper}>
        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
      <TextField value={state.value1} onChange={(e : any) => onFieldUpdate('value1', e.target.value)} label="Сумма" />
      </FormControl>
      <FormControl className={classes.currencyType}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
      Валюта
    </InputLabel>
      <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={converterStore?.getToken.name || ''}  
      >
          {
              tokens.map(name => (<MenuItem value={name}>{name}</MenuItem>))
          }
     </Select>
      </FormControl>
        </div>
        <div className={classes.cryptoInputBox}>
          <FormControl className={classes.currencyInput}>
      <TextField onChange={(e : any) => onFieldUpdate('value1', e.target.value)} value={state.value2} label="Сумма" />
      </FormControl>
      <FormControl className={classes.currencyType}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
      Валюта
    </InputLabel>
      <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      onChange={e => setSelectedToken(e.target.value as string)}
      value={selectedToken}
      >
          <MenuItem value="USD">USD</MenuItem>
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
