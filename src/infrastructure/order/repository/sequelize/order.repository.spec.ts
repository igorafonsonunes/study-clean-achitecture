import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/entity/address";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import Customer from "../../../../domain/customer/entity/custumer";
import Product from "../../../../domain/product/entity/product";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";


describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem("1", product.name, product.price, product.id, 1);

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update a order", async () => {
    //Create Customer and Address
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    //Create Product
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    //Create Order
    const ordemItem = new OrderItem("1", product.name, product.price, product.id, 1);
    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    //Updated Product
    product.changeName("Product 2");
    product.changePrice(20);

    //Updated Order
    const ordemItem2 = new OrderItem("1", product.name, product.price, product.id, 4);
    const order2 = new Order("123", "123", [ordemItem2]);

    await orderRepository.update(order2);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });;

    //Validação
    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order2.total(),
      items: [
        {
          id: ordemItem2.id,
          name: ordemItem2.name,
          price: ordemItem2.price,
          quantity: ordemItem2.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });


  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("Product1", "Product 1", 15);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const ordemItem = new OrderItem("Item123", product.name, product.price, product.id, 2);
    const order = new Order("OrderId123", "123", [ordemItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: "OrderId123" }, include: ["items"] });

    let orderResult = await orderRepository.find("OrderId123");

    expect(orderModel.toJSON()).toStrictEqual({
      id: orderResult.id,
      customer_id: orderResult.customerId,
      total: orderResult.total(),
      items: [
        {
          id: orderResult.items[0].id,
          name: orderResult.items[0].name,
          price: orderResult.items[0].price,
          quantity: orderResult.items[0].quantity,
          order_id: orderResult.id,
          product_id: orderResult.items[0].productId,
        },
      ],
    });
  });


  it("should find all order", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("Product1", "Product 1", 15);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "Item1",
      product.name,
      product.price,
      product.id,
      2
    );

    const ordemItem2 = new OrderItem(
      "Item2",
      product.name,
      product.price,
      product.id,
      2
    );


    const orderRepository = new OrderRepository();

    const order = new Order("Ordem1", "123", [ordemItem]);
    await orderRepository.create(order);

    const order2 = new Order("Ordem2", "123", [ordemItem2]);
    await orderRepository.create(order2);

    const orders = [order, order2,];
    const foundOrder = await orderRepository.findAll();

    expect(orders).toEqual(foundOrder);
  });

});