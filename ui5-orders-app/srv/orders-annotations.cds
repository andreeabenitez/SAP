using OrdersService from './orders-service';

annotate OrdersService.Orders with @(
    UI.PresentationVariant: {
    SortOrder: [
        {
            Property:   date,
            Descending: true
        }
    ],
    Visualizations: ['@UI.LineItem']
},
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
    },

    UI.FieldGroup #GeneralInfo: {
        Label: 'Información General',
        Data: [
            { Value: id,     Label: 'ID' },
            { Value: status, Label: 'Estado', Criticality: statusCriticality },
            { Value: amount, Label: 'Importe' },
            { Value: date,   Label: 'Fecha' }
        ]
    },

    UI.FieldGroup #CustomerInfo: {
        Label: 'Cliente',
        Data: [
            { Value: customer.name,    Label: 'Nombre' },
            { Value: customer.email,   Label: 'Email' },
            { Value: customer.country, Label: 'País' }
        ]
    },

    UI.Facets: [
        {
            $Type:  'UI.ReferenceFacet',
            Label:  'Información General',
            Target: '@UI.FieldGroup#GeneralInfo'
        },
        {
            $Type:  'UI.ReferenceFacet',
            Label:  'Cliente',
            Target: '@UI.FieldGroup#CustomerInfo'
        }
    ]
);

annotate OrdersService.Orders with {
    customer @(
        Common.Text: customer.name,
        Common.TextArrangement: #TextOnly,
        title: 'Cliente'
    );
    status @(
        title: 'Estado',
        Common.ValueListWithFixedValues: true,
        Common.ValueList: {
            CollectionPath: 'StatusValues',
            Parameters: [
                {
                    $Type: 'Common.ValueListParameterOut',
                    LocalDataProperty: status,
                    ValueListProperty: 'code'
                },
                {
                    $Type: 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'description'
                }
            ]
        }
    )
};