namespace orders;

entity Orders {
  key id       : String(10);
      customer : String(100);
      status   : String(20);
      amount   : Decimal(10,2);
      date     : Date;
}