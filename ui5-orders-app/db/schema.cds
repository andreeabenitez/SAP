namespace orders;

entity Customers {
  key id       : String(10);
      name     : String(100);
      email    : String(100);
      country  : String(50);
}

entity Orders {
  key id         : String(10);
      customer   : Association to Customers;
      status     : String(20);
      amount     : Decimal(10,2);
      date       : Date;
}

entity StatusValues {
  key code        : String(20);
      description : String(50);
}