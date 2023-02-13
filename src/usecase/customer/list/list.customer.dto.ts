
type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
    };
}

export interface InputListCustomerDto { }


export interface OutputListCustomerDto {
    customers: Customer[];
}