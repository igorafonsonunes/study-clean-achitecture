import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe('Test list product usecase integration', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("shold list a product", async () => {
        const productRepository = new ProductRepository();
        //CREATE A PRODUCTS
        const productOne = ProductFactory.create("a", "Banana de Pijama", 10.0,);
        const productTwo = ProductFactory.create("a", "Banana sem Pijama", 10.50,);
        await productRepository.create(productOne);
        await productRepository.create(productTwo);

        const usecase = new ListProductUseCase(productRepository);
        
        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(productOne.id);
        expect(output.products[0].name).toBe(productOne.name);
        expect(output.products[0].price).toBe(productOne.price);

        expect(output.products[1].id).toBe(productTwo.id);
        expect(output.products[1].name).toBe(productTwo.name);
        expect(output.products[1].price).toBe(productTwo.price);
    });

});