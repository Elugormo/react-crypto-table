import { observable, computed, action } from 'mobx'
import { TToken, TTokenDiff } from '../types';
import axios from 'axios'
import stores from '.';


class CurrenciesStore { 
    @observable private items: TToken[] = [];
    @observable private diffObj: TTokenDiff = {}; 
    @computed
    get getItems() { 
        return this.items;
    }

    @computed
    get getDiffObj() { 
        return this.diffObj;
    }

    @action
    setItems = (items: TToken[]): void => {
        this.diffObj = this.diffCurrencies(this.items, items).reduce(
          (initObj: TTokenDiff, obj: TToken) => {
            const newObj: TToken = items.find(o => o.name === obj.name)!;
            const oldObj: TToken = this.items.find(itemObj => itemObj.name === newObj.name)!;
            const color: string =
              newObj.price === oldObj.price ? '' : newObj.price > oldObj.price ? 'green' : 'red';
    
            initObj[newObj.name] = color;
    
            return initObj;
          },
          {},
        );
        this.items = items;
        setTimeout(() => {
            this.diffObj = {};
          }, 10000);
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
                this.setItems(tokens);
                stores.converterStore.setSelectedToken(tokens[0])
         })
    } 

    diffCurrencies(arr1 : TToken[], arr2: TToken[]) { 
        return arr1.filter((entry, index) =>  { 
            if(entry.price !== arr2[index].price) { 
                return true
            }
            return false;
        })
    }
}

export default CurrenciesStore