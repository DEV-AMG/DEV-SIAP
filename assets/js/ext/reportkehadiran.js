Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.ProgressBarPager',
	'Ext.ProgressBar',
	'Ext.view.View',
]);

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.util.Format.thousandSeparator = ',';
	Ext.util.Format.decimalSeparator = '.';

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	Ext.define('Ext.form.field.Month', {
        extend: 'Ext.form.field.Date',
        alias: 'widget.monthfield',
        requires: ['Ext.picker.Month'],
        alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],
        selectMonth: null,
        createPicker: function () {
		    var me = this,
		        format = Ext.String.format,
		        pickerConfig;

		    pickerConfig = {
		        pickerField: me,
		        ownerCmp: me,
		        renderTo: document.body,
		        floating: true,
		        hidden: true,
		        focusOnShow: true,
		        minDate: me.minValue,
		        maxDate: me.maxValue,
		        disabledDatesRE: me.disabledDatesRE,
		        disabledDatesText: me.disabledDatesText,
		        disabledDays: me.disabledDays,
		        disabledDaysText: me.disabledDaysText,
		        format: me.format,
		        showToday: me.showToday,
		        startDay: me.startDay,
		        minText: format(me.minText, me.formatDate(me.minValue)),
		        maxText: format(me.maxText, me.formatDate(me.maxValue)),
		        listeners: {
		            select: { scope: me, fn: me.onSelect },
		            monthdblclick: { scope: me, fn: me.onOKClick },
		            yeardblclick: { scope: me, fn: me.onOKClick },
		            OkClick: { scope: me, fn: me.onOKClick },
		            CancelClick: { scope: me, fn: me.onCancelClick }
		        },
		        keyNavConfig: {
		            esc: function () {
		                me.collapse();
		            }
		        }
		    };

		    if (Ext.isChrome) {
		        me.originalCollapse = me.collapse;
		        pickerConfig.listeners.boxready = {
		            fn: function () {
		                this.picker.el.on({
		                    mousedown: function () {
		                        this.collapse = Ext.emptyFn;
		                    },
		                    mouseup: function () {
		                        this.collapse = this.originalCollapse;
		                    },
		                    scope: this
		                });
		            },
		            scope: me,
		            single: true
		        }
		    }

		    return Ext.create('Ext.picker.Month', pickerConfig);
		},
        onCancelClick: function() {
            var me = this;
            me.selectMonth = null;
            me.collapse();
        },
        onOKClick: function() {
            var me = this;
            if (me.selectMonth) {
                me.setValue(me.selectMonth);
                me.fireEvent('select', me, me.selectMonth);
            }
            me.collapse();
        },
        onSelect: function(m, d) {
            var me = this;
            me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
        }
    });	
	Ext.define('DataGridReport', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_nama', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fd_masuk', type: 'string'},
			{name: 'fd_keluar', type: 'string'},
			{name: 'fn_jam', type: 'string'}
		]
	});

	var blnFilter = {
		anchor: '98%',
		xtype: 'monthfield',
		submitFormat: 'Y-m-d',
		id: 'blnFilter',
		name: 'blnFilter',
		format: 'F, Y',
		value: new Date()
	};

	var grupReport = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridReport',
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'reportkehadiran/gridreport'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fd_mmyy': Ext.getCmp('blnFilter').getValue(),
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridReport = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupReport,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			locked: true,
			width: 100
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'Tanggal',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			width: 100
		},{
			text: 'Masuk',
			dataIndex: 'fd_masuk',
			menuDisabled: true,
			width: 100
		},{
			text: 'Keluar',
			dataIndex: 'fd_keluar',
			menuDisabled: true,
			width: 100
		},{
			text: 'Total Jam',
			dataIndex: 'fn_jam',
			menuDisabled: true,
			width: 100
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				blnFilter
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Karyawan',
				id: 'txtCari',
				name: 'txtCari',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search All',
				xtype: 'button',
				handler: function() {
					grupReport.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupReport
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var frmKehadiran = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Report Kehadiran',
		width: 930,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 100,
				msgTarget: 'side'
			},
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'Report Kehadiran',
			xtype: 'fieldset',
			items: [
				gridReport
			]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmKehadiran
	});

	function fnMaskShow() {
		frmKehadiran.mask('Please wait...');
	}

	function fnMaskHide() {
		frmKehadiran.unmask();
	}
	
	frmKehadiran.render(Ext.getBody());
	Ext.get('loading').destroy();
});