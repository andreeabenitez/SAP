using orders from '../db/schema';

service OrdersService {
  @odata.draft.enabled: true
  entity Orders as projection on orders.Orders {
    *,
    case status
      when 'Delivered' then 3
      when 'Shipped'   then 5
      when 'Pending'   then 2
      when 'Cancelled' then 1
      else 0
    end as statusCriticality : Integer
  };

  entity Customers as projection on orders.Customers;
  entity StatusValues as projection on orders.StatusValues;
}