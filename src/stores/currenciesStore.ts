import { observable, computed, action } from 'mobx'
import { TToken } from '../types';
import axios from 'axios'

class CurrenciesStore { 
    @observable private items: TToken[] = [];

    @computed
    get getItems() { 
        return this.items;
    }

    @action
    setItems = (items: TToken[]) : void => { 
        this.items = items;
    }

    @action 
    fetchTokens = () => { 
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
                this.items = tokens;
         })
    }
}

export default CurrenciesStore