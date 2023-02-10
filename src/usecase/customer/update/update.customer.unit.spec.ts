import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/entity/address"
import UpdateCustomerUseCase from "./update.cstomer.usecase";

const customer = CustomerFactory.createWithAddress("John", new Address("street", 123, "zip", "city"));

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

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe("Unit test for customer update usecase", () => {

    it("shold update a customer", async () => {

        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

});