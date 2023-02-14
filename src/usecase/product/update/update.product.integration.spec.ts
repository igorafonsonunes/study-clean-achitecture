import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe('Test update product usecase integration', () => {

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

    it("shold update a product", async () => {
        const productRepository = new ProductRepository();
        //CREATE A PRODUCTS
        const productOne = ProductFactory.create("a", "Banana de Pijama", 10.0,);
        await productRepository.create(productOne);

        const usecase = new UpdateProductUseCase(productRepository);

        const input = {
            id: productOne.id,
            name: "Banana Sem Pijama",
            price: 20.0
        }

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });

});