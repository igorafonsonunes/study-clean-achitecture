import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "street",
        city: "city",
        number: 123,
        zip: "zip",
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create customer use case", () => {

    it("shold create a cuistomer", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await createCustomerUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip,
            }
        });
    });

    it("shold throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        await expect(createCustomerUseCase.execute(input))
            .rejects.toThrow("Name is required.");
        input.name = "John";
    });

    it("shold throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";
        await expect(createCustomerUseCase.execute(input))
            .rejects.toThrow("street is required.");
        input.address.street = "street";
    });

    it("shold throw an error when number is missing", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.number = 0;
        await expect(createCustomerUseCase.execute(input))
            .rejects.toThrow("number is required.");
        input.address.number = 123;
    });

    it("shold throw an error when city is missing", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.city = "";
        await expect(createCustomerUseCase.execute(input))
            .rejects.toThrow("city is required.");
        input.address.city = "City";
    });


    it("shold throw an error when zipcode is missing", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.zip = "";
        await expect(createCustomerUseCase.execute(input))
            .rejects.toThrow("zipcode is required.");
        input.address.zip = "zipcode";
    });

});