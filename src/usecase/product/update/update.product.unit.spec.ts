import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Arroz", 15.0,);

const input = {
    id: product.id,
    name: "Arroz com Banana",
    price: 20.0
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Test update product usecase unit", () => {

    it("shold update a product", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });
});