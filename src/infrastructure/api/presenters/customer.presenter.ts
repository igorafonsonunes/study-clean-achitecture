import { toXML } from "jstoxml";
import { number } from "yup";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {

    static listXML(data: OutputListCustomerDto): string {
        const xmlOptions = {
            header: true,
            ident: " ",
            newline: "\n",
            allowEmptyu: true
        };

        return toXML({
            customers: {
                customer: data.customers.map((customer) => ({
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zip: customer.address.zip,
                        city: customer.address.city
                    }
                }))
            }
        }, xmlOptions);

    }


}