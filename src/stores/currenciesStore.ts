import { observable, computed, action } from 'mobx'
import { TToken, TTokenDiff } from '../types';
import axios from 'axios'



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
    setItems = (items: TToken[]) : void => { 
        this.items = items;
        this.diffObj = this.diffCurrencies(this.items, items).reduce((init : TTokenDiff, newObj : TToken) => { 
            const obj : TToken = items.find(o => o.name === newObj.name) || newObj;
            const oldObj : TToken = this.items.find(itemsObj => itemsObj.name === obj.name) || obj;
            const color : string = 
                obj.price === oldObj.price ? '' : obj.price > oldObj.price ? 'green' : 'red';

            init[obj.name] = color; 

            return init;
        }, {})
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