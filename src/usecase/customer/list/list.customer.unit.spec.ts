import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/entity/address";
import ListCustomerUseCase from "./list.customer.usecase";

//CREATE A CUSTUMERS
const customer1 = CustomerFactory.createWithAddress("John Doe", new Address("Street", 123, "Zip", "City"));
const customer2 = CustomerFactory.createWithAddress("Jane Doe", new Address("Street2", 1234, "Zip2", "City2"));


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([
            customer1,
            customer2
        ])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Test list custumer usecase unit', () => {

    it('should list a customers', async () => {

        const customerRepository = MockRepository();
        const usecase = new ListCustomerUseCase(customerRepository);

        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
    });
});