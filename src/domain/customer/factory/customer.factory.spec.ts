import Address from "../../entity/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("shold create a customer", () => {
        const customer = CustomerFactory.create("Customer 1");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.Address).toBeUndefined();
    });

    it("shold create a customer with an address", () => {

        const address = new Address("Street", 1, "zipcode", "City")

        const customer = CustomerFactory.createWithAddress("Customer 1", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.Address).toBe(address);
    });


});