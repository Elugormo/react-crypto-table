import React, { useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { observer, inject } from 'mobx-react'
import { TToken } from '../../types/index'
import CurrenciesStore from '../../stores/currenciesStore';

type ICryptoTable = { 
    classes: any;
    currenciesStore?: CurrenciesStore; 
}


const CryptoTable = inject('currenciesStore')(observer(({ classes, currenciesStore } : ICryptoTable) => { 
           const items : TToken[] = currenciesStore!.getItems;
            
           useEffect(() => { 
               if(currenciesStore)
                   currenciesStore.fetchTokens();
           }, []);
           
            return(
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="left">FullName</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">volume24hour</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!items.length ? "Loading" : items.map( item => (
                      <TableRow key={item.name}>
                        <TableCell align="left"><img className={classes.currencyImgIcon} src={item.imageUrl} alt="Token icon"/></TableCell>
                        <TableCell align="left">{item.name}</TableCell>
                        <TableCell align="left">{item.fullName}</TableCell>
                        <TableCell align="left">${item.price}</TableCell>
                        <TableCell align="left">${item.volume24Hour}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
        )}))




export default CryptoTable