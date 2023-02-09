import { v4 as uuid } from 'uuid';
import Address from '../../entity/address';
import Customer from '../entity/custumer';

export default class CustomerFactory {

    public static create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    public static createWithAddress(name: string, address: Address){
        let customer = new Customer(uuid(), name);
        customer.changeAddress(address);
        return customer;
    }
}