import { Order } from '../interfaces/order.interface';
import { OrderStore } from '../models/order';

const orderStore = new OrderStore();

describe('Order Model', () => {
  let order: Order;

  beforeAll(async () => {
    // Create a new order to be used in the tests
    const orderData = {
      
        id: 1,
      user_id: 1,
      status: 'active'
      
    };
    order = await orderStore.createOrder(orderData);
  });

  afterAll(async () => {
    // Delete the order created in the beforeAll hook
    await orderStore.deleteOrder(order.id);
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const orderData = {
        id: 1,
        user_id: 1,
        status: 'active'
      };
      const newOrder = await orderStore.createOrder(orderData);

      expect(newOrder.id).toBeDefined();
      expect(newOrder.user_id).toBe(orderData.user_id);
      expect(newOrder.status).toBe(orderData.status);

      await orderStore.deleteOrder(newOrder.id);
    });
  });

  describe('getOrderById', () => {
    it('should return the specified order', async () => {
      const fetchedOrder = await orderStore.getOrderById(order.id);

      expect(fetchedOrder).toEqual(order);
    });

    it('should throw an error if the order does not exist', async () => {
      const invalidId = 99999;

      expectAsync(orderStore.getOrderById(invalidId)).toBeRejectedWithError(
        `Could not find order with id ${invalidId}`
      );
    });
  });

  describe('updateOrder', () => {
    it('should update an existing order', async () => {
      const updatedData = {
        id: order.id,
        user_id: 2,
        status: 'completed'
      };
      const updatedOrder = await orderStore.updateOrder(updatedData);

      expect(updatedOrder.id).toBe(order.id);
      expect(updatedOrder.user_id).toBe(updatedData.user_id);
      expect(updatedOrder.status).toBe(updatedData.status);

      // Update the order object for use in subsequent tests
      order = updatedOrder;
    });
  });

  describe('deleteOrder', () => {
    it('should delete an existing order', async () => {
      const deletedOrder = await orderStore.deleteOrder(order.id);

      expect(deletedOrder).toEqual(order);

      // Attempting to fetch the deleted order should throw an error
      expectAsync(orderStore.getOrderById(order.id)).toBeRejectedWithError(
        `Could not find order with id ${order.id}`
      );
    });

    it('should throw an error if the order does not exist', async () => {
      const invalidId = 99999;

      expectAsync(orderStore.deleteOrder(invalidId)).toBeRejectedWithError(
        `Could not delete order with id ${invalidId}`
      );
    });
  });
});
