
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "street",
        city: "city",
        number: 123,
        zip: "zip",
    }
};

describe('Test create custumer usecase integration', () => {

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

    it('should create a customer', async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const output = {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip,
            }
        };
        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("shold throw an error when name is missing", async () => {
        const customerRepository = new CustomerRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Name is required.");
        input.name = "John";
    });

    it("shold throw an error when street is missing", async () => {
        const customerRepository = new CustomerRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";
        await expect(createCustomerUseCase.execute(input))
            .rejects.toThrow("street is required.");
        input.address.street = "street";
    });

    it("shold throw an error when number is missing", async () => {
        const customerRepository = new CustomerRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.number = 0;
        await expect(createCustomerUseCase.execute(input))
            .rejects.toThrow("number is required.");
        input.address.number = 123;
    });

    it("shold throw an error when city is missing", async () => {
        const customerRepository = new CustomerRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.city = "";
        await expect(createCustomerUseCase.execute(input))
            .rejects.toThrow("city is required.");
        input.address.city = "City";
    });


    it("shold throw an error when zipcode is missing", async () => {
        const customerRepository = new CustomerRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.zip = "";
        await expect(createCustomerUseCase.execute(input))
            .rejects.toThrow("zipcode is required.");
        input.address.zip = "zipcode";
    });


});