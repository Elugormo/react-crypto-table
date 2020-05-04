// import { observable, computed, action } from 'mobx'
// import { TToken } from '../types';

import { observable, computed, action } from 'mobx'
import { TToken } from '../types';

type TSelectedToken = { 
    name: string;
    price: number;
}


class ConverterStore { 
    @observable private selectedToken: TSelectedToken = {
        name: '', 
        price: 0
    };

    @computed
    get getItems() { 
        return this.selectedToken;
    }


    @action
    set setSelectedToken(token : TToken) { 
        this.selectedToken = {
            name: token.name, 
            price: token.price
        };
    }


    @action
    setItems = (items: TToken[]): void => {
    }

   
}

export default ConverterStore