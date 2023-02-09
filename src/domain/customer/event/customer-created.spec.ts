import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../../entity/address";
import Customer from "../entity/custumer";

import CustomerChangedAddressEvent from "./customer-changed-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerChangedAddressHandler from "./handler/customer-changed-address.handler";
import CustomerCreated1Handler from "./handler/customer-created-1.handler";
import CustomerCreated2Handler from "./handler/customer-created-2.handler";

describe("Customer event tests", () => {
    it("shold verify if both events are called", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new CustomerCreated1Handler();
        const eventHandler2 = new CustomerCreated2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

        //Criando Customer
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua da Banana", 3, "303045123", "Banana");
        customer.changeAddress(address);

        //Adicionado Customer criado ao evento
        const customerCreatedEvent = new CustomerCreatedEvent({customer});

        //Quando o notify for executado o CustomerCreated1Handler deve ser chamado
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });


    it("shold verify if Change Address event is called", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CustomerChangedAddressHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua da Banana", 3, "303045123", "Banana");
        customer.changeAddress(address);

        const customerChangedAddressEvent = new CustomerChangedAddressEvent({customer});
        eventDispatcher.notify(customerChangedAddressEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

});