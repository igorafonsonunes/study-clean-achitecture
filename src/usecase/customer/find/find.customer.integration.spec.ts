
import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/custumer";
import Address from "../../../domain/entity/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test find custumer usecase integration', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it('should find a customer', async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        //CREATE A CUSTUMER
        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "Zip", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input: InputFindCustomerDto = {
            id: "123"
        };

        const output: OutputFindCustomerDto = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip",
            }
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

});