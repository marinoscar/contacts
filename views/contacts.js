Ext.require([
    'Ext.form.*',
    'Ext.data.*',
    'Ext.grid.Panel',
    'Ext.layout.container.Column'
]);

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

// sample data
var contactData = [
        ['Oscar', 'Marin', 'N/A', 1],
        ['Pamela', 'Molina', 'N/A', 2]
    ];

// create the data store
var store = Ext.create('Ext.data.ArrayStore', {
    model: 'Contact',
    data: contactData
});

Ext.onReady(function () {
    Ext.QuickTips.init();
    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

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
            }
        ],
        listeners: {
            selectionchange: function (model, records) {
                if (records[0]) {
                    if (contactEditor != undefined)
                        contactEditor.loadRecord(records[0]);
                }
            }
        },
        height: 350,
        width: '90%',
        title: 'Contacts',
        renderTo: 'contactlist',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        }
    });

    var contactEditor = Ext.widget({
        xtype: 'form',
        layout: 'form',
        collapsible: true,
        renderTo: 'contactDiv',
        id: 'contactEditor',
        frame: true,
        title: 'Contact Editor',
        bodyPadding: '5 5 0',
        width: '90%',
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'Name',
            afterLabelTextTpl: required,
            name: 'Name',
            allowBlank: false
        }, {
            fieldLabel: 'Last Name',
            afterLabelTextTpl: required,
            name: 'LastName',
            allowBlank: false
        }, {
            fieldLabel: 'Description',
            name: 'Description',
            allowBlank: false
        }],

        buttons: [{
            text: 'Save',
            handler: function () {
                this.up('form').getForm().isValid();
            }
        }, {
            text: 'Cancel',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }]
    });

    grid.getSelectionModel().select(0);

});