using OrdersService from './orders-service';

annotate OrdersService.Orders with @(
    UI.LineItem: [
        { Value: id,       Label: 'ID' },
        { Value: customer, Label: 'Cliente' },
        { Value: status,   Label: 'Estado' },
        { Value: amount,   Label: 'Importe' },
        { Value: date,     Label: 'Fecha' }
    ],

    UI.SelectionFields: [ id, customer, status ],

    UI.HeaderInfo: {
        TypeName:       'Orden',
        TypeNamePlural: 'Órdenes',
        Title:          { Value: id },
        Description:    { Value: customer }
    }
);