namespace orders;

entity Customers {
  key id       : String(10);
      name     : String(100) @mandatory;
      email    : String(100);
      country  : String(50);
}

entity Orders {
  key id         : String(10);
      customer   : Association to Customers @mandatory;
      status     : String(20) @mandatory;
      amount     : Decimal(10,2) @mandatory;
      date       : Date @mandatory;
}

entity StatusValues {
  key code        : String(20);
      description : String(50);
}