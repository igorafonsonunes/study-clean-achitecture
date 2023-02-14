import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/entity/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUseCase from "./update.cstomer.usecase";

describe('Test list custumer usecase unit', () => {

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

    it("shold update a customer", async () => {

        const customerRepository = new CustomerRepository();

        //CREATE CUSTOMER
        const customer = CustomerFactory.createWithAddress("John", new Address("street", 123, "zip", "city"));
        await customerRepository.create(customer);

        const input = {
            id: customer.id,
            name: "John Updated",
            address: {
                street: "street updated",
                city: "city updated",
                number: 1234,
                zip: "zip updated",
            }
        };

        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);


        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});