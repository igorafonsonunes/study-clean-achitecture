import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";




export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.sequelize.transaction(async (t) => {

      await OrderItemModel.destroy({
        where: {
          order_id: entity.id
        },
        transaction: t,
      });

      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));

      //Insert multiples rows bulkCreate
      await OrderItemModel.bulkCreate(items, { transaction: t });

      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id: id }, include: ["items"], });

    const orderItens: Array<OrderItem> = await Promise.all(
      orderModel.items.map(async (item): Promise<OrderItem> => {
        let produto = (await ProductModel.findOne({ where: { id: item.product_id } }));

        return new OrderItem(
          item.id,
          item.name,
          produto.price,
          item.product_id,
          item.quantity
        )
      }));

    const newOrder: Order = new Order(orderModel.id,
      orderModel.customer_id,
      orderItens);

    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ["items"] });

    const responseOrders = await Promise.all(
      orderModels.map(async (orderModel): Promise<Order> => {

        let orderItens: Array<OrderItem> = await Promise.all(
          orderModel.items.map(async (item): Promise<OrderItem> => {

            let produto = (await ProductModel.findOne({ where: { id: item.product_id } }));

            return new OrderItem(
              item.id,
              item.name,
              produto.price,
              item.product_id,
              item.quantity
            )
          }));

        return new Order(orderModel.id, orderModel.customer_id, orderItens)
      }));

    return responseOrders;
  }
}