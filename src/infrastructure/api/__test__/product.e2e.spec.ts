import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for Product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });


    it("shold create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "banana",
                price: 1.50,
                type: "a"
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("banana");
        expect(response.body.price).toBe(1.50);

    });

    it("shold not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "banana",
            });

        expect(response.status).toBe(500);
    });

    it("shold list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "banana",
                price: 1.50,
                type: "a"
            });

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "maçã",
                price: 0.50,
                type: "a"
            });

        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/product")
            .send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        
        const product = listResponse.body.products[0];
        expect(product.name).toBe("banana");
        expect(product.price).toBe(1.50);

        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("maçã");
        expect(product2.price).toBe(0.50)
    });

});