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

var firstLoad = true;

var jsonStore = new Ext.data.JsonStore({
    storeId: 'jsonStore',
    model: 'Contact',
    proxy: {
        type: 'rest',
        url: 'api/contacts',
        reader: {
            type: 'json',
            idProperty: 'Id'
        },
        writer: {
            type: 'json',
            idProperty: 'Id'
        }
    },
    listeners: {
        load: function () {
            var grid = Ext.getCmp('contactGrid');
            if (grid != undefined && firstLoad) {
                grid.getSelectionModel().select(0);
                firstLoad = false;
            }
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
                text: 'Id',
                sortable: true,
                dataIndex: 'Id'
            },
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
                    if (contactForm != undefined)
                        contactForm.loadRecord(records[0]);
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

    var contactForm = Ext.create('Ext.form.Panel', {
        title: 'Contact Editor',
        bodyPadding: 5,
        width: '90%',
        renderTo: 'contactDiv',
        url: 'api/contacts',
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        defaultType: 'textfield',
        items: [{
            xtype: 'hiddenfield',
            fieldLabel: 'Id',
            name: 'Id'
        },
        {
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
            formBind: true,
            disabled: true,
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function (action) {
                            jsonStore.load();
                        },
                        failure: function (action) {
                            Ext.Msg.alert('Failed', action.result.msg);
                        }
                    });
                }
            }
        }, {
            text: 'Cancel',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }]
    });

    jsonStore.load();
});


