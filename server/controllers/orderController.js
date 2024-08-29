// Import the Order model
import Order from '../models/Order.js';

// Function to create a new order
export async function createOrder(req, res) {
  try {
    const { requestedByid } = req.body;
    if (!requestedByid) {
      return res.status(400).send({ message: 'User ID is required to create an order.' });
    }
    const order = new Order({ requestedByid });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ message: 'Failed to create order', error: error.message });
  }
}

// Function to retrieve an order by ID
export async function getOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate('requestedByid');
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve order', error: error.message });
  }
}

// Function to update an order by ID
export async function updateOrder(req, res) {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(400).send({ message: 'Failed to update order', error: error.message });
  }
}

// Function to delete an order by ID
export async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send({ message: 'Order successfully deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete order', error: error.message });
  }
}
