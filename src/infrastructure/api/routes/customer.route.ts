import express, { Request, Response, Router } from "express";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute: Router = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());

    try {
        const customerDto: InputCreateCustomerDto = {
            name: req.body.name,
            address: {
                city: req.body.address.city,
                number: req.body.address.number,
                street: req.body.address.street,
                zip: req.body.address.zip
            }
        }
        const output = await usecase.execute(customerDto);

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.get("/", async (req: Request, res: Response) => {
    try {
        const usecase = new ListCustomerUseCase(new CustomerRepository());
        const output = await usecase.execute({});

        res.format({
            json: async () => res.send(output),
            xml: async () => res.send(CustomerPresenter.listXML(output))
        });

    } catch (err) {
        res.status(500).send(err);
    }
});