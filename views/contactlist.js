Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*'
]);

// Define Company entity
// Null out built in convert functions for performance *because the raw data is known to be valid*
// Specifying defaultValue as undefined will also save code. *As long as there will always be values in the data, or the app tolerates undefined field values*
Ext.define('Contact', {
    extend: 'Ext.data.Model',
    fields: [
       { name: 'Name' },
       { name: 'LastName' },
       { name: 'Description' },
       { name: 'Id' }
    ],
    idProperty: 'Id'
});

Ext.onReady(function () {
    Ext.QuickTips.init();

    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    // sample static data for the store
    var myData = [
        ['Oscar', 'Marin', '', 1],
        ['Pamela', 'Molina', '', 2]
    ];

    

    // create the data store
    var store = Ext.create('Ext.data.ArrayStore', {
        model: 'Company',
        data: myData
    });

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        stateful: true,
        collapsible: true,
        multiSelect: true,
        stateId: 'stateGrid',
        columns: [
            {
                text: 'Name',
                flex: 1,
                sortable: true,
                dataIndex: 'Name'
            },
            {
                text: 'Last Name',
                sortable: true,
                dataIndex: 'LastName'
            },
            {
                text: 'Description',
                width: 75,
                sortable: true,
                dataIndex: 'Description'
            },
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    icon: '/images/delete.gif',  // Use a URL in the icon config
                    tooltip: 'delete',
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = store.getAt(rowIndex);
                        alert("Delete " + rec.get('Name'));
                    }
                }]
            }
        ],
        height: 350,
        width: 600,
        title: 'Contacts',
        renderTo: 'contactslist',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        }
    });
});