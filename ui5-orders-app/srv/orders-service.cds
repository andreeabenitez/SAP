using orders from '../db/schema';

service OrdersService {
  entity Orders    as projection on orders.Orders;
  entity Customers as projection on orders.Customers;
}