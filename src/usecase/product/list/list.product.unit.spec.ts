import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

//CREATE A PRODUCTS
const productOne = ProductFactory.create("a", "Banana de Pijama", 10.0,);
const productTwo = ProductFactory.create("a", "Banana sem Pijama", 10.50,);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([
            productOne,
            productTwo
        ])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Test list product usecase unit', () => {

    it('should list a products', async () => {

        const productRepository = MockRepository();
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