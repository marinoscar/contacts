Ext.require([
    'Ext.form.*',
    'Ext.data.*',
    'Ext.grid.Panel',
    'Ext.layout.container.Column'
]);

Ext.define('Contact', {
    extend: 'Ext.data.Model',
    fields: [
       { name: 'Id', type: 'int' },
       { name: 'Name', type: 'string' },
       { name: 'LastName', type: 'string' },
       { name: 'Description', type: 'string' },
       { name: 'OfficeNumber', type: 'string' },
       { name: 'MobileNumber', type: 'string' },
       { name: 'HomeNumber', type: 'string' },
       { name: 'Latitude', type: 'float' },
       { name: 'Longitude', type: 'float' }
    ],
    idProperty: 'Id'
});

var jsonStore = new Ext.data.JsonStore({
    storeId: 'jsonStore',
    model: 'Contact',
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: 'api/contacts/getcontacts',
        reader: {
            type: 'json',
            idProperty: 'Id'
        }
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();

    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'contactGrid',
        store: jsonStore,
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

});


