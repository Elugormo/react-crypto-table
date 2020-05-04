import { observable, computed, action } from 'mobx'
import { TToken, TSelectedToken } from '../types';



class ConverterStore { 
    @observable private selectedToken: TSelectedToken = {
        name: '', 
        price: 0
    };

    @computed
    get getToken() { 
        return this.selectedToken;
    }


    @action
    setSelectedToken(token : TToken) { 
        this.selectedToken = {
            name: token.name, 
            price: token.price
        };
    }


   
}

export default ConverterStore