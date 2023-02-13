import FindProductUseCase from "./find.product.usecase";

const product = {
    id: "1234",
    name: "Fei jão",
    price: 15.0,
    type: "a"
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Test find product usecase unit", () => {

    it("shold find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "1234"
        }

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });

    });
});