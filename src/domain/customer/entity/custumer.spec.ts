import Address from "../../entity/address";
import Customer from "./custumer";

describe("Custumer unit tests", () => {
    
    it("should throw error when id is empty", ()=> {
        expect(() => {
            let customer = new Customer("", "Igor");
        }).toThrowError("customer: Id is required")
    });


    it("should throw error when name is empty", ()=> {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("customer: Name is required")
    });

    it("should throw error when name and id are empty", ()=> {
        expect(() => {
            let customer = new Customer("", "");
        }).toThrowError("customer: Id is required,customer: Name is required")
    });

    it("should change name", ()=> {
        let customer = new Customer("123", "Igor");
        customer.changeName("Afonso");

        expect(customer.name).toBe("Afonso");
    });

    it("should activate custumer", ()=> {
        let customer = new Customer("123", "Igor");
        let address = new Address("1", 123, "1234", "BH");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });


    it("should deactivated custumer", ()=> {
        let customer = new Customer("123", "Igor");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should throw when address is undefined when you activated a custumer", ()=> {
        expect(()=>{
            let customer = new Customer("123", "Igor");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer.");
    });

    it("should add reward points", ()=> {
        let customer = new Customer("123", "Igor");
        
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});