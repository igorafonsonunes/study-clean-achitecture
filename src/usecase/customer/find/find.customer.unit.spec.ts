
import Customer from "../../../domain/customer/entity/custumer";
import Address from "../../../domain/entity/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";


//CREATE A CUSTUMER
const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Test find custumer usecase unit', () => {

    it('should find a customer', async () => {

        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

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


    it('should not find a customer', async () => {

        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found.");
        });

        const usecase = new FindCustomerUseCase(customerRepository)

        const input: InputFindCustomerDto = {
            id: "123"
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found.")
    });

});