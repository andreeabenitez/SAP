using OrdersService from './orders-service';

annotate OrdersService.Orders with @(
    UI.LineItem: [
        { Value: id,           Label: 'ID' },
        { 
            Value: customer.name,
            Label: 'Cliente',
            ![@UI.Importance]: #High
        },
        { 
            Value:       status,
            Label:       'Estado',
            Criticality: statusCriticality
        },
        { Value: amount, Label: 'Importe' },
        { Value: date,   Label: 'Fecha' }
    ],

    UI.SelectionFields: [ id, status ],

    UI.HeaderInfo: {
        TypeName:       'Orden',
        TypeNamePlural: 'Órdenes',
        Title:          { Value: id },
        Description:    { Value: customer.name }
    }
);

annotate OrdersService.Orders with {
    customer @(
        Common.Text: customer.name,
        Common.TextArrangement: #TextOnly,
        title: 'Cliente'
    );
    status @(
        Common.ValueList: {
            CollectionPath: 'Orders',
            Parameters: [
                { $Type: 'Common.ValueListParameterOut', LocalDataProperty: status, ValueListProperty: 'status' }
            ]
        }
    )
};

