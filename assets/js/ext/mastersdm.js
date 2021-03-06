Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.LiveSearchGridPanel',
	'Ext.ux.ProgressBarPager'
]);

Ext.onReady(function() {
    Ext.QuickTips.init();
	Ext.util.Format.thousandSeparator = ',';
	Ext.util.Format.decimalSeparator = '.';

	var required = '<span style="color:red;font-weight:bold" data-qtip="Bagian ini wajib diisi">*</span>';

	function gridTooltipSearch(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Klik 2x pada record untuk memilih',
			target: view.el,
			trackMouse: true
		});
	}

	var cellEditingProd = Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 2
	});

	function gridTooltipProd(view) {
		view.tip = Ext.create('Ext.tip.ToolTip', {
			delegate: view.itemSelector,
			html: 'Double click on the Qty to edit',
			target: view.el,
			trackMouse: true
		});
	}

	var grupNik= Ext.create('Ext.data.Store', {
		fields: [
			'fs_nik','fs_nama','fs_kode_cabang'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'mastersdm/ambil_nik2'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_kode_cabang': Ext.getCmp('txtKodeCabang2').getValue(),
					'fs_nik': Ext.getCmp('cboNIK').getValue(),
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	Ext.define('DataGridDetil4', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fb_cek2', type: 'bool'},
			{name: 'fs_kode_jabatan', type: 'string'},
			{name: 'fs_kode_parent', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'}
		]
	});

	var grupGridDetil4 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDetil4',
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
			url: 'masteruser/ambil_jabatan2'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_kode_cabang': Ext.getCmp('txtKodeCabang2').getValue(),
					'fs_nik': Ext.getCmp('txtNikk').getValue()
				});
			}
		}
	});

	 var gridDetil4 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupGridDetil4,
		columns: [{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			text: 'Kode Jabatan',
			width: 10
		},{
			dataIndex: 'fs_kode_jabatan',
			menuDisabled: true,
			hidden:true, 
			text: 'Kode Jabatan',
			width: 100
		},{
			dataIndex: 'fs_kode_parent',
			menuDisabled: true,
			hidden:true, 
			text: 'Kode Parent',
			width: 100
		},{
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true, 
			text: 'Jabatan',
			width: 150
		},
		{
            xtype: 'checkcolumn',
            header: ' ',
            dataIndex: 'fb_cek2',
            width: 60,
            listeners: {
				beforecheckchange: function() {
					return false;
				}
			}
    	}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridDetil2
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	Ext.define('DataGridDetil3', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_aktif', type: 'bool'},
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_nama_cabang', type: 'string'}
		]
	});

	var grupGridDetil3 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDetil3',
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
			url: 'masteruser/listMasterCabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_kode_cabang': Ext.getCmp('txtKodeCabang2').getValue(),
					'fs_nik': Ext.getCmp('cboNIK').getValue()
				});
			}
		}
	});


	var txtKodeCabang2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Nama',
		id: 'txtKodeCabang2',
		hidden:true,
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtKodeCabang2',
		xtype: 'textfield'
	};

	var txtKodeCabangs = {
		anchor: '50%',
		fieldLabel: 'Nama',
		id: 'txtKodeCabangs',
		hidden:true,
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtKodeCabangs',
		xtype: 'textfield'
	};

	var txtKodeCabangs2 = {
		anchor: '50%',
		fieldLabel: 'Nama',
		id: 'txtKodeCabangs2',
		hidden:true,
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtKodeCabangs2',
		xtype: 'textfield'
	};


	var txtKodeJabatans = {
		anchor: '50%',
		fieldLabel: 'Nama',
		id: 'txtKodeJabatans',
		hidden:true,
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtKodeJabatans',
		xtype: 'textfield'
	};

	var txtKodeJabatans2 = {
		anchor: '50%',
		fieldLabel: 'Nama',
		id: 'txtKodeJabatans2',
		hidden:true,
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtKodeJabatans2',
		xtype: 'textfield'
	};

	var txtEmail = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Email',
		id: 'txtEmail',
		maxLength: 30,
		vtype: 'email',
		name: 'txtEmail',
		xtype: 'textfield'
	};


	var txtUsername = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Username',
		id: 'txtUsername',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtUsername',
		xtype: 'textfield'
	};


	var txtPassword = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Password',
		id: 'txtPassword',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		inputType: 'password',
		name: 'txtPassword',
		xtype: 'textfield'
	};

	 var gridDetil3 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupGridDetil3,
		columns: [{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			text: 'Kode Cabang',
			width: 100
		},{
			dataIndex: 'fs_nama_cabang',
			menuDisabled: true, 
			text: 'Cabang',
			width: 150
		},
		{	
			fieldStyle: 'background-color: #eee; background-image: none;', 
            xtype: 'checkcolumn',
            header: ' ',
			readOnly:true,
            menuDisabled: true,
			stopSelection: false,
            dataIndex: 'fs_aktif',
            width: 60,
            listeners: {
				beforecheckchange: function() {
					return false;
				}
			}
    	}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridDetil
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});


	var winGrid = Ext.create('Ext.grid.Panel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupNik,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupNik,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCari.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'NIK', dataIndex: 'fs_nik', menuDisabled: true, width: 240},
			{text: 'Nama', dataIndex: 'fs_nama', menuDisabled: true, width: 120},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboNIK').setValue(record.get('fs_nik'));
				Ext.getCmp('txtNikk').setValue(record.get('fs_nik'));
				Ext.getCmp('txtKodeCabangUn').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNamaa').setValue(record.get('fs_nama'));
				Ext.getCmp('txtTglJoin2').setValue(record.get('fd_tanggal_bergabung'));
				

				grupKodeTrans3.load();
				winCari.hide();
				vMask.show();
				win.show();
			}
		},
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nik / Nama ',
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
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupNik.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCari = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGrid
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupNik.load();
				vMask.show();
			}
		}
	});

	var cboNIK = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'NIK',
		editable: true,
		id: 'cboNIK',
		enforceMaxLength: true,
		minLength: '9',
		maxLength: '10', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .0123456789]/,
		//maxLength: 5,
		name: 'cboNIK',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari.show();
					winCari.center();
				}
			}
		}
	};



	var cekAktif = {
		boxLabel: 'Aktif',
		checked: true,
		id: 'cekAktif',
		name: 'cekAktif',
		xtype: 'checkboxfield'
	};

	var txtKodeCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Cabang',
		id: 'txtKodeCabang',
		maxLength : 2,
 		enforceMaxLength : true,
		name: 'txtKodeCabang',
		xtype: 'numberfield',
		hideTrigger: true,
	};

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama',
		id: 'txtNama',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '50', 
		maskRe: /[zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP .]/,
		name: 'txtNama',
		xtype: 'textfield'
	};

	var grupAkses = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx','fs_nm_strx'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'mastersdm/cb_akses'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});



	var cboAkses = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Akses Sistem',
		id: 'cboAkses',
		name: 'cboAkses',
		store: grupAkses,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var grupCabang = Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_cabang','fs_nama_cabang'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'mastersdm/ambil_cabang'
		}
	});

	var grupCabang2 = Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_cabang','fs_nama_cabang'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'masteruser/ambil_cabang_cari'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});


	var grupJabatan= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_jabatan','fs_kode_parent','fs_nama_jabatan'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'mastersdm/ambil_jabatan'
		}
	});

	

	var winGridJabatan = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupJabatan,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupJabatan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariJabatan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Jabatan', dataIndex: 'fs_kode_jabatan', menuDisabled: true, width: 240},
			{text: 'Nama Jabatan ', dataIndex: 'fs_nama_jabatan', menuDisabled: true, width: 140}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboJabatan').setValue(record.get('fs_nama_jabatan'));
				Ext.getCmp('txtKodeJabatan').setValue(record.get('fs_kode_jabatan'));
				
				winCariJabatan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridCabang = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCabang,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCabang,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariCabang.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 240},
			{text: 'Nama Cabang ', dataIndex: 'fs_nama_cabang', menuDisabled: true, width: 140}
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCabang').setValue(record.get('fs_nama_cabang'));
				Ext.getCmp('txtKodeCabang').setValue(record.get('fs_kode_cabang'));
				
				winCariCabang.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridCabang2 = Ext.create('Ext.grid.Panel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCabang2,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCabang2,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					winCariCabang2.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 240},
			{text: 'Nama Cabang ', dataIndex: 'fs_nama_cabang', menuDisabled: true, width: 140}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Cabang / Nama Cabang',
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
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupCabang2.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboCabang2').setValue(record.get('fs_nama_cabang'));
				Ext.getCmp('txtKodeCabang2').setValue(record.get('fs_kode_cabang'));
				
				winCariCabang2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});


	var winCariJabatan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridJabatan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupJabatan.load();
				vMask.show();
			}
		}
	});

	var winCariCabang = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridCabang
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupCabang.load();
				vMask.show();
			}
		}
	});

	var winCariCabang2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Pencarian...',
		items: [
			winGridCabang2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupCabang2.load();
				vMask.show();
			}
		}
	});


	var cboJabatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Pilih Jabatan',
		editable: true,
		id: 'cboJabatan',
		//maxLength: 5,
		name: 'cboJabatan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariJabatan.show();
					winCariJabatan.center();
				}
			}
		}
	};


	var cboCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Pilih Cabang',
		editable: true,
		id: 'cboCabang',
		name: 'cboCabang',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariCabang.show();
					winCariCabang.center();
				}
			}
		}
	};

	var cboCabang2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		fieldLabel: 'Pilih Cabang',
		editable: true,
		id: 'cboCabang2',
		name: 'cboCabang2',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariCabang2.show();
					winCariCabang2.center();
				}
			}
		}
	};


	var txtKodeJabatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Nama',
		id: 'txtKodeJabatan',
		hidden:true,
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtKodeJabatan',
		xtype: 'textfield'
	};


	var txtKodeCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Nama',
		id: 'txtKodeCabang',
		hidden:true,
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtKodeCabang',
		xtype: 'textfield'
	};



	var tglBergabung = {
			afterLabelTextTpl: required,
			allowBlank: false,
			anchor: '100%',
			editable: true,
			fieldLabel: 'Tgl Join',
			format: 'Y-m-d',
			id: 'tglBergabung',
			maskRe: /[0-9-]/,
			minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
			name: 'tglBergabung',
			value: new Date(),
			xtype: 'datefield'
		};

	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });


	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fb_cek', type: 'bool'},
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_nama_cabang', type: 'string'}
		]
	});

	Ext.define('DataGridDetil2', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fb_cek2', type: 'bool'},
			{name: 'fs_kode_jabatan', type: 'string'},
			{name: 'fs_kode_parent', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'}
		]
	});

	var grupGridDetil = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDetil',
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
			url: 'mastersdm/listMasterCabang'
		}
	});

	var grupGridDetil2 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDetil2',
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
			url: 'mastersdm/ambil_jabatan'
		}
	});

	var winz = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: false,
		frame: false,
		height: 450,
		layout: 'fit',
		minHeight: 580,
		maxHeight: 580,
		minWidth: 990,
		maxWidth: 990,
		title: 'Siap',
		width: 500,
		items: [{ 
                                     xtype: 'component',
                                     html : '<iframe src="10.pdf" width="100%" height="100%"></iframe>',
        }],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				vMask.show();
			}
		},
		buttons: [{
			text: 'Cancel',
			handler: function() {
				vMask.hide();
				winz.hide();
			}
		}]
	});

	var gridDetil = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupGridDetil,
		columns: [{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true, 
			text: 'Kode cabang',
			width: 73
		},{
			dataIndex: 'fs_nama_cabang',
			menuDisabled: true, 
			text: 'Nama Cabang',
			width: 150
		},
		{
            xtype: 'checkcolumn',
            header: ' ',
            menuDisabled: true,
			stopSelection: false,
            dataIndex: 'fb_cek',
            width: 60,
            listeners: {
				checkchange: function(grid, rowIndex, checked) {
					var xStore = gridDetil.getStore();
					var xRecord = xStore.getAt(rowIndex);
					var xTotal = grupGridDetil.getCount();

					var xKode = xRecord.get('fs_kode_cabang').trim();
					var xCek = xRecord.get('fb_cek');

					var xLen = 0;
					xLen = xKode.length;
					var j = 0;
					var xAda = false;
					
					if (xCek === true) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kode_cabang').trim();
								xLen = xKode.length;
									if (xLen === 2 && i !== rowIndex) {
									break;
								}
								else {
									xRecord.set('fb_cek','1');
								}
								
							}
						
						
					}
					
					else { //uncek
						
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kode_cabang').trim();
								xLen = xKode.length;
									if (xLen === 2 && i !== rowIndex) {
									break;
								}
								else {
									xRecord.set('fb_cek','0');
								}
								
							}
						}
				}
			}
    	}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridDetil
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var gridDetil2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupGridDetil2,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_jabatan',
			menuDisabled: true,
			hidden:true, 
			text: 'Kode Jabatan',
			width: 100
		},{
			dataIndex: 'fs_kode_parent',
			menuDisabled: true,
			hidden:true, 
			text: 'Kode Parent',
			width: 100
		},{
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true, 
			text: 'Jabatan',
			width: 150
		},
		{
            xtype: 'checkcolumn',
            header: ' ',
            dataIndex: 'fb_cek2',
            width: 60,
            listeners: {
				checkchange: function(grid, rowIndex, checked) {
					var xStore = gridDetil2.getStore();
					var xRecord = xStore.getAt(rowIndex);
					var xTotal = grupGridDetil2.getCount();

					var xKode = xRecord.get('fs_kode_jabatan').trim();
					var xCek = xRecord.get('fb_cek2');

					var xLen = 0;
					xLen = xKode.length;
					var j = 0;
					var xAda = false;
					
					if (xCek === true) {
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kode_jabatan').trim();
								xLen = xKode.length;
								if (xLen === 2 && i !== rowIndex) {
									break;
								}
								if (xLen === 1 && i !== rowIndex) {
									break;
								}
								else {
									xRecord.set('fb_cek2','1');
								}
								
							}
						
						
					}
					
					else { //uncek
						
							for (i=rowIndex;i<xTotal;i++) {
								xRecord = xStore.getAt(i);
								xKode = xRecord.get('fs_kode_jabatan').trim();
								xLen = xKode.length;
								if (xLen === 2 && i !== rowIndex) {
									break;
								}
								if (xLen === 1 && i !== rowIndex) {
									break;
								}
								else {
									xRecord.set('fb_cek2','0');
								}
								
							}
						}
				}
			}
    	}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupGridDetil2
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	function fnCekUnreg() {
		if (this.up('form').getForm().isValid()) {
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'mastersdm/cekUnreg',
				params: {
				'fs_nik': Ext.getCmp('txtNikk').getValue()
				},
				success: function(response) {
					var xText = Ext.decode(response.responseText);
					
					if (xText.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xText.hasil,
							title: 'Siap'
						});
					}
					else {
					
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'Siap',
								fn: function(btn) {
									if (btn == 'yes') {
										fnUnreg();
									}
								}
							});
						
					}
				},
				failure: function(response) {
					var xText = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'Siap'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnUnreg() {
	
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'mastersdm/Unreg',
			params: {
				'fs_nik': Ext.getCmp('txtNikk').getValue()
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'Siap',
					fn: function(btn) {

						Ext.getCmp('cboNIK').setValue('');
						vMask.hide();
						win.hide();
									
								}
				});
				//fnReset();
			},
			failure: function(response) {
				var xText = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Simpan Gagal, Koneksi Gagal',
					title: 'Siap'
				});
				fnMaskHide();
			}
		});
	}


	function fnPrint() 
	{
		
		var noapk = Ext.getCmp('txtNoApk').getValue();
		var cek = Ext.getCmp('cekKop').getValue();
		var kop = 0;

		if (cek == true) {
			kop = 1;
		}

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'kontrak/print',
			params: {
				'fn_no_apk': noapk,
				'fs_kode_dokumen': Ext.getCmp('txtKdDok').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'SIAP'
				});
				
				var url = xtext.url;
				var title = xtext.title;

				if (xtext.sukses === true) {
					var popUp = Ext.create('Ext.window.Window', {
						border: false,
						closable: false,
						frame: false,
	                    height: 450,
	                    width: 950,
	                    layout:'anchor',
	                    title: title,
	                    buttons: [{
							text: 'OK',
							handler: function() {
								vMask.hide();
								popUp.hide();
							}
						}]
                	});

					popUp.add({html: '<iframe height="450", width="942" src="'+ url + noapk + '/' + kop +'"></iframe>'});
	                popUp.show();
					fnReset();
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Printing Failed, Connection Failed!!',
					title: 'SIAP'
				});
				fnMaskHide();
			}
		});
	}

	function fnViewOrg() {
		if (this.up('form').getForm().isValid()) {

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'mastersdm/CekCab',
				params: {
				'fs_kode_cabang': Ext.getCmp('txtKodeCabang2').getValue()
				},
				success: function(response) {
					var xText = Ext.decode(response.responseText);

					//var xText = Ext.decode(response.responseText);
					
					if (xText.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xText.hasil,
							title: 'Siap'
						});
					}
					else {
					
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'Siap',
								fn: function(btn) {
									if (btn == 'yes') {
										
										var xtext = Ext.decode(response.responseText);
												
												var url = xtext.url;
												var title = xtext.title;

												if (xtext.sukses === true) {
													var popUp = Ext.create('Ext.window.Window', {
														border: false,
														closable: false,
														frame: false,
									                    height: 650,
									                    width: 950,
									                    layout:'anchor',
									                    title: title,
									                    buttons: [{
															text: 'OK',
															handler: function() {
																vMask.hide();
																popUp.hide();
															}
														}]
								                	});

													popUp.add({html: '<iframe height="650", width="942" src="'+ url + title+'"></iframe>'});
									                popUp.show();
													fnReset();
												}
										

										//fnSimpan();
									}
								}
							});
						
					}
				},
				failure: function(response) {
					var xText = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'Siap'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnCekSimpan() {
		if (this.up('form').getForm().isValid()) {
		
		var xNamaCabang = '';
		var xNamaJabatan= '';
		var xKdCabang = '';
		var xKdJabatan = '';
			
		var store = gridKode.getStore();
		store.each(function(record, idx) {
				xKdCabang = xKdCabang +'|'+ record.get('fs_kode_cabang');
				xKdJabatan = xKdJabatan +'|'+ record.get('fs_kode_jabatan');
				
			});	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'mastersdm/CekSimpan',
				params: {
				'fs_kode_cabang': xKdCabang,
				'fs_kode_jabatan': xKdJabatan,
				'fs_nik': Ext.getCmp('cboNIK').getValue(),
				'fs_nama': Ext.getCmp('txtNama').getValue(),
				'fd_tanggal_bergabung': Ext.getCmp('tglBergabung').getValue(),
				'fs_akses_sistem': Ext.getCmp('cboAkses').getValue(),
				'fs_kode_cabang2': Ext.getCmp('txtKodeCabang').getValue(),
				'fs_nama_cabang': Ext.getCmp('cboCabang').getValue(),
				'fs_nama_jabatan': Ext.getCmp('cboJabatan').getValue(),
				'fs_kode_jabatan2': Ext.getCmp('txtKodeJabatan').getValue()
				},
				success: function(response) {
					var xText = Ext.decode(response.responseText);
					
					if (xText.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xText.hasil,
							title: 'Siap'
						});
					}
					else {
					
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'Siap',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSimpan();
										//gridKode.getStore().load();
									}
								}
							});
						
					}
				},
				failure: function(response) {
					var xText = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'Siap'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnCekUpdate() {
		if (this.up('form').getForm().isValid()) {
		
		var xNamaCabang = '';
		var xNamaJabatan= '';
		var xKdCabang = '';
		var xKdJabatan = '';
			
		var store = gridKode2.getStore();
		store.each(function(record, idx) {
				xKdCabang = xKdCabang +'|'+ record.get('fs_kode_cabang');
				xKdJabatan = xKdJabatan +'|'+ record.get('fs_kode_jabatan');
				
			});	
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'mastersdm/CekSimpan',
				params: {
				'fs_kode_cabang': xKdCabang,
				'fs_kode_jabatan': xKdJabatan,
				'fs_nik': Ext.getCmp('cboNIK').getValue(),
				'fs_nama': Ext.getCmp('txtNama').getValue(),
				'fd_tanggal_bergabung': Ext.getCmp('tglBergabung').getValue(),
				'fs_akses_sistem': Ext.getCmp('cboAkses').getValue(),
				'fs_kode_cabang2': Ext.getCmp('txtKodeCabang').getValue(),
				'fs_nama_cabang': Ext.getCmp('cboCabang').getValue(),
				'fs_nama_jabatan': Ext.getCmp('cboJabatan').getValue(),
				'fs_kode_jabatan2': Ext.getCmp('txtKodeJabatan').getValue()
				},
				success: function(response) {
					var xText = Ext.decode(response.responseText);
					
					if (xText.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xText.hasil,
							title: 'Siap'
						});
					}
					else {
					
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'Siap',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSimpan2();
										//gridKode.getStore().load();
									}
								}
							});
						
					}
				},
				failure: function(response) {
					var xText = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'Siap'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSimpan() {
		var xNamaCabang = '';
		var xNamaJabatan= '';
		var xKdCabang = '';
		var xKdJabatan = '';
			
		var store = gridKode.getStore();
		store.each(function(record, idx) {
				xKdCabang = xKdCabang +'|'+ record.get('fs_kode_cabang');
				xKdJabatan = xKdJabatan +'|'+ record.get('fs_kode_jabatan');
				
			});

		
		Ext.Ajax.request({
			method: 'POST',
			url: 'mastersdm/Simpan',
			params: {
				'fs_kode_cabang': xKdCabang,
				'fs_kode_jabatan': xKdJabatan,
				'fs_nik': Ext.getCmp('cboNIK').getValue(),
				'fs_nama': Ext.getCmp('txtNama').getValue(),
				'fd_tanggal_bergabung': Ext.getCmp('tglBergabung').getValue(),
				'fs_akses_sistem': Ext.getCmp('cboAkses').getValue(),
				'fs_kode_cabang2': Ext.getCmp('txtKodeCabang').getValue(),
				'fs_kode_jabatan2': Ext.getCmp('txtKodeJabatan').getValue(),
				'fd_tanggal_dibuat': Ext.Date.format(new Date(), 'Y-m-d')
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xText.hasil,
					title: 'Siap'
				});
			 	//var selection = gridKode.getView().getSelectionModel().getSelection()[0];
               // store.remove(selection);
                


                //gridKode.getStore().load();
                //gridKode.getView().refresh();
				fnReset();
				
			},
			failure: function(response) {
				var xText = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Simpan Gagal, Koneksi Gagal',
					title: 'ototicket'
				});
				fnMaskHide();
			}
		});
	}

	function fnSimpan2() {
		var xNamaCabang = '';
		var xNamaJabatan= '';
		var xKdCabang = '';
		var xKdJabatan = '';
			
		var store = gridKode2.getStore();
		store.each(function(record, idx) {
				xKdCabang = xKdCabang +'|'+ record.get('fs_kode_cabang');
				xKdJabatan = xKdJabatan +'|'+ record.get('fs_kode_jabatan');
				
			});

		
		Ext.Ajax.request({
			method: 'POST',
			url: 'mastersdm/Update',
			params: {
				'fs_kode_cabang': xKdCabang,
				'fs_kode_jabatan': xKdJabatan,
				'fs_nik': Ext.getCmp('txtNikk').getValue(),
				'fs_kode_cabang_fix': Ext.getCmp('txtKodeCabangUn').getValue(),
				'fd_tanggal_dibuat': Ext.Date.format(new Date(), 'Y-m-d')
			},
			success: function(response) {
				var xText = Ext.decode(response.responseText);
				
				Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.MessageBox.QUESTION,
								msg: xText.hasil,
								title: 'MFAS',
								fn: function(btn) {
									if (btn == 'yes') {
										 var selection = gridKode2.getView().getSelectionModel().getSelection()[0];
						                    if (selection) {
						                        store.remove(selection);
						                    }

						                    window.location.href = 'mastersdm';
									}
								}
							});
			 
			
				
			},
			failure: function(response) {
				var xText = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Simpan Gagal, Koneksi Gagal',
					title: 'ototicket'
				});
				fnMaskHide();
			}
		});
	}



	function fnReset() {
		Ext.getCmp('cboCabang').setValue('');
		Ext.getCmp('cboJabatan').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('txtKodeCabang').setValue('');
		Ext.getCmp('txtKodeJabatan').setValue('');
		Ext.getCmp('cboNIK').setValue('');
		Ext.getCmp('cboAkses').setValue('');
		Ext.getCmp('tglBergabung').setValue('');

		 //xt.getCmp('myGridID').getStore().load();
                //Ext.getCmp('myGridID').getView().refresh();

		//gridKode.getStore().load();

		gridKode.getStore().removeAll();
		gridKode.getStore().sync();
		gridKode.getView().refresh()

		//grupGridDetil2.load();
	}

	Ext.define('DataGridProd', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_kode_jabatan', type: 'string'},
			{name: 'fs_nik', type: 'string'}
		]
	});

	Ext.define('DataGridProd2', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_kode_jabatan', type: 'string'},
			{name: 'fs_nik', type: 'string'}
		]
	});

	var grupKodeCabang = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang','fs_nama_cabang'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'mastersdm/ambil_cabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fs_cari': Ext.getCmp('txtCari19').getValue(),
				});
			}
		}
	});

	var grupKodeCabang2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang','fs_nama_cabang'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'mastersdm/ambil_cabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fs_cari': Ext.getCmp('txtCari191').getValue(),
				});
			}
		}
	});

	var grupKodeJabatan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_jabatan','fs_nama_jabatan'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'mastersdm/ambil_jabatan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fs_cari': Ext.getCmp('txtCari20').getValue(),
				});
			}
		}
	});

	var grupKodeJabatan2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_jabatan','fs_nama_jabatan'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'mastersdm/ambil_jabatan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  'fs_cari': Ext.getCmp('txtCari201').getValue(),
				});
			}
		}
	});

	var grupKodeTrans2 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridProd',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'mastersdm/grid_sdm'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				  //'fs_nik': ''
				});
			},
			load: function() {
				var xtotal = grupKodeTrans2.getCount();
				
				if (xtotal > 0) {
					var store = gridKode.getStore();
					var xqty = 0;
					
					gridKode.getSelectionModel().select(0);
				}
			}
		}
	});

	var grupKodeTrans3 = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridProd2',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json',
			},
			type: 'ajax',
			url: 'mastersdm/grid_sdm2'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				'fs_nik': Ext.getCmp('txtNikk').getValue()
				});
			},
			load: function() {
				var xtotal = grupKodeTrans3.getCount();
				
				if (xtotal > 0) {
					var store = gridKode2.getStore();
					var xqty = 0;
					
					gridKode2.getSelectionModel().select(0);
				}
			}
		}
	});

	var winGridKodeCabang = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 430,
		sortableColumns: false,
		store: grupKodeCabang,
		bbar: Ext.create('Ext.PagingToolbar', {
			pageSize: 500,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodeCabang,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari19').setValue('');	
					winCariKodeCabang.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 100},
			{text: 'Nama Cabang', dataIndex: 'fs_nama_cabang', menuDisabled: true, width: 260}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Cabang',
				id: 'txtCari19',
				name: 'txtCari19',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKodeCabang.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKodeCabang').setValue(record.get('fs_nama_cabang'));	
				Ext.getCmp('txtKodeCabangs').setValue(record.get('fs_kode_cabang'));	
				
				winCariKodeCabang.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridKodeCabang2 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 430,
		sortableColumns: false,
		store: grupKodeCabang2,
		bbar: Ext.create('Ext.PagingToolbar', {
			pageSize: 500,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodeCabang2,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari191').setValue('');	
					winCariKodeCabang2.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode', dataIndex: 'fs_kode_cabang', menuDisabled: true, width: 100},
			{text: 'Nama Cabang', dataIndex: 'fs_nama_cabang', menuDisabled: true, width: 260}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Cabang',
				id: 'txtCari191',
				name: 'txtCari191',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKodeCabang2.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKodeCabang2').setValue(record.get('fs_nama_cabang'));	
				Ext.getCmp('txtKodeCabangs2').setValue(record.get('fs_kode_cabang'));	
				
				winCariKodeCabang2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridKodeJabatan = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 430,
		sortableColumns: false,
		store: grupKodeJabatan,
		bbar: Ext.create('Ext.PagingToolbar', {
			pageSize: 500,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodeJabatan,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari20').setValue('');	
					winCariKodeJabatan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode', dataIndex: 'fs_kode_jabatan', menuDisabled: true, width: 100},
			{text: 'Nama Jabatan', dataIndex: 'fs_nama_jabatan', menuDisabled: true, width: 260}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Jabatan',
				id: 'txtCari20',
				name: 'txtCari20',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKodeJabatan.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKodeJabatan').setValue(record.get('fs_nama_jabatan'));	
				Ext.getCmp('txtKodeJabatans').setValue(record.get('fs_kode_jabatan'));	
				
				winCariKodeJabatan.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winGridKodeJabatan2 = Ext.create('Ext.grid.Panel', {
		//autoDestroy: true,
		autoDestroy: true,
		height: 450,
		width: 430,
		sortableColumns: false,
		store: grupKodeJabatan2,
		bbar: Ext.create('Ext.PagingToolbar', {
			pageSize: 500,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodeJabatan2,
			items:[
				'-', {
				text: 'Keluar',
				handler: function() {
					Ext.getCmp('txtCari201').setValue('');	
					winCariKodeJabatan.hide();
				}
			}]
		}),
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode', dataIndex: 'fs_kode_jabatan', menuDisabled: true, width: 100},
			{text: 'Nama Jabatan', dataIndex: 'fs_nama_jabatan', menuDisabled: true, width: 260}
			
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Jabatan',
				id: 'txtCari201',
				name: 'txtCari201',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKodeJabatan2.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKodeJabatan2').setValue(record.get('fs_nama_jabatan'));	
				Ext.getCmp('txtKodeJabatans2').setValue(record.get('fs_kode_jabatan'));	
				
				winCariKodeJabatan2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			}
		}
	});

	var winCariKodeCabang = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodeCabang
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodeCabang.load();
				vMask.show();
			}
		}
	});

	var winCariKodeCabang2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodeCabang2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodeCabang2.load();
				vMask.show();
			}
		}
	});

	var winCariKodeJabatan = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodeJabatan
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodeJabatan.load();
				vMask.show();
			}
		}
	});

	var winCariKodeJabatan2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridKodeJabatan2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodeJabatan2.load();
				vMask.show();
			}
		}
	});

	var cboKodeCabang = {
		anchor: '95%',
				emptyText: 'Select a Kode',
				fieldLabel: 'Kode Cabang',
				id: 'cboKodeCabang',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboKodeCabang',
				xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodeCabang.show();
					winCariKodeCabang.center();
				}
			}
		}
	};

	var cboKodeCabang2 = {
		anchor: '95%',
				emptyText: 'Select a Kode',
				fieldLabel: 'Kode Cabang',
				id: 'cboKodeCabang2',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboKodeCabang2',
				xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodeCabang2.show();
					winCariKodeCabang2.center();
				}
			}
		}
	};

	var cboKodeJabatan2 = {
		anchor: '95%',
				emptyText: 'Select a Kode',
				fieldLabel: 'Kode Jabatan',
				id: 'cboKodeJabatan2',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboKodeJabatan2',
				xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodeJabatan2.show();
					winCariKodeJabatan2.center();
				}
			}
		}
	};

	var cboKodeJabatan = {
		anchor: '95%',
				emptyText: 'Select a Kode',
				fieldLabel: 'Kode Jabatan',
				id: 'cboKodeJabatan',
				labelAlign: 'top',
				labelSeparator: '',
				name: 'cboKodeJabatan',
				xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
			}
		},
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCariKodeJabatan.show();
					winCariKodeJabatan.center();
				}
			}
		}
	};

	var gridKode = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		id:'myGridID',
		defaultType: 'textfield',
		height: 470,
		sortableColumns: false,
		store: grupKodeTrans2,
		columns: [{
			dataIndex: 'fs_kode_cabang',
			text: 'Kode cabang',
			flex: 0.6,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_cabang',
			text: 'Nama Cabang',
			flex: 1.25,
			menuDisabled: true
		},
		{
			dataIndex: 'fs_nama_jabatan',
			text: 'Nama Fungsi',
			flex: 1.25,
			menuDisabled: true
		}],
		listeners: {
			selectionchange: function(view, records) {
				gridKode.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			cellEditingProd
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipProd
			},
			markDirty: false,
			stripeRows: true
		},
		bbar: [
		/*{
			iconCls: 'icon-delete',
			itemId: 'removeData',
			text: 'Delete',
			handler: function() {
				var record = gridKode.getSelectionModel().getSelection()[0];
				
				var xseqno = record.get('fs_seqno');
				var arr_seqno = Array();
				
				grupGridReg.clearFilter();
				var store = gridReg.getStore();
				store.each(function(record, idx) {
					arr_seqno.push(record.get('fs_seqno').trim());
				});
				
				var xtotal = grupGridReg.getCount()-1;
				var xxseqno = '';
				for (i=xtotal;i>=0;i--) {
					xxseqno = arr_seqno[i];
					
					if (xseqno.trim() == xxseqno.trim()) {
						grupGridReg.removeAt(i);
					}
				}
				
				gridReg.getView().refresh();
				
				var sm = gridProd.getSelectionModel();
				cellEditingProd.cancelEdit();
				grupGridProd.remove(sm.getSelection());
				gridProd.getView().refresh();
				if (grupGridProd.getCount() > 0) {
					sm.select(0);
				}
				Ext.getCmp('txtProdAktif').setValue('');
				Ext.getCmp('txtProdAktif2').setValue('');
			},
			disabled: true
		},*/{
			xtype: 'tbfill',
		},{
			value: '<*Double click on the Qty to edit>',
			xtype: 'displayfield'
		}],
		tbar: [
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboKodeCabang,
				txtKodeCabangs
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboKodeJabatan,
				txtKodeJabatans
			]
		},
		{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [
			{
								iconCls: 'icon-add',
								text: 'Add',
								handler: function() {
									var xtotal = grupKodeTrans2.getCount();
									var xcab = Ext.getCmp('cboKodeCabang').getValue();
									var xcabkode = Ext.getCmp('txtKodeCabangs').getValue();
									var xjab = Ext.getCmp('cboKodeJabatan').getValue();
									var xjabkode = Ext.getCmp('txtKodeJabatans').getValue();
									var xdata = Ext.create('DataGridProd', {
										fs_nama_cabang: Ext.getCmp('cboKodeCabang').getValue(),
										fs_kode_cabang: Ext.getCmp('txtKodeCabangs').getValue(),
										fs_nama_jabatan: Ext.getCmp('cboKodeJabatan').getValue(),
										fs_kode_jabatan: Ext.getCmp('txtKodeJabatans').getValue(),
										//fn_qty: '0',
										//fs_kd_unit: Ext.getCmp('cboUnit').getValue(),
										//fs_seqno: zeroPad(xurut, 6)
									});
									
									var store = gridKode.getStore();
									var xlanjut = true;


									store.each(function(record, idx) {
										var xtext = record.get('fs_kode_cabang').trim();
										var xtext2 = record.get('fs_kode_jabatan').trim();
										
										if (xtext == xcabkode && xtext2 == xjabkode) {
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Kode Cabang dan jabatan sudah ada, add struktur cancel!!',
												title: 'MFAS'
											});
											xlanjut = false;
										}

										
												
														
										
									});

									if (xcab === '') {
										Ext.MessageBox.show({
										buttons: Ext.MessageBox.OK,
										closable: false,
										icon: Ext.Msg.WARNING,
										msg: 'Field Cabang masih kosong!',
										title: 'MFAS'
										});

										xlanjut = false;

										}

										if (xjab === '') {
										Ext.MessageBox.show({
										buttons: Ext.MessageBox.OK,
										closable: false,
										icon: Ext.Msg.WARNING,
										msg: 'Field Jabatan masih kosong!',
										title: 'MFAS'
										});

										xlanjut = false;

										}

										if (xcab === '' && xjab === '') {
										Ext.MessageBox.show({
										buttons: Ext.MessageBox.OK,
										closable: false,
										icon: Ext.Msg.WARNING,
										msg: 'Field Jabatan dan cabang masih kosong!',
										title: 'MFAS'
										});

										xlanjut = false;

										}

									if (xlanjut === false) {
										return;
									}
									
									grupKodeTrans2.insert(xtotal, xdata);
									Ext.getCmp('cboKodeJabatan').setValue('');
									Ext.getCmp('txtKodeCabangs').setValue('');
									Ext.getCmp('txtKodeJabatans').setValue('');
									Ext.getCmp('cboKodeCabang').setValue('');
									
									xtotal = grupKodeTrans2.getCount() - 1;
									gridKode.getSelectionModel().select(xtotal);

								}
							},
				{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridKode.getSelectionModel();
					cellEditingProd.cancelEdit();
					grupKodeTrans2.remove(sm.getSelection());
					gridKode.getView().refresh();
					if (grupKodeTrans2.getCount() > 0) {
						sm.select(0);
					}
					
					var xprod = Ext.getCmp('txtProdAktif').getValue();
					var xQty = 0;
					store = gridKode.getStore();
					store.each(function(record, idx) {
						if (xprod.trim() == record.get('fs_kode_jabatan').trim()) {
							xQty = xQty + 1;
						}
					});
					gridKode.getView().refresh();
				},
				disabled: true
			}]
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var gridKode2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 470,
		sortableColumns: false,
		store: grupKodeTrans3,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_kode_cabang',
			text: 'Kode cabang',
			flex: 0.6,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_cabang',
			text: 'Nama Cabang',
			flex: 1.25,
			menuDisabled: true
		},
		{
			dataIndex: 'fs_kode_cabang',
			hidden:true,
			menuDisabled: true
		},
		{
			dataIndex: 'fs_kode_jabatan',
			hidden:true,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_jabatan',
			text: 'Nama Fungsi',
			flex: 1.25,
			menuDisabled: true
		}],
		listeners: {
			selectionchange: function(view, records) {
				gridKode2.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			cellEditingProd
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				render: gridTooltipProd
			},
			markDirty: false,
			stripeRows: true
		},
		bbar: [
		/*{
			iconCls: 'icon-delete',
			itemId: 'removeData',
			text: 'Delete',
			handler: function() {
				var record = gridKode.getSelectionModel().getSelection()[0];
				
				var xseqno = record.get('fs_seqno');
				var arr_seqno = Array();
				
				grupGridReg.clearFilter();
				var store = gridReg.getStore();
				store.each(function(record, idx) {
					arr_seqno.push(record.get('fs_seqno').trim());
				});
				
				var xtotal = grupGridReg.getCount()-1;
				var xxseqno = '';
				for (i=xtotal;i>=0;i--) {
					xxseqno = arr_seqno[i];
					
					if (xseqno.trim() == xxseqno.trim()) {
						grupGridReg.removeAt(i);
					}
				}
				
				gridReg.getView().refresh();
				
				var sm = gridProd.getSelectionModel();
				cellEditingProd.cancelEdit();
				grupGridProd.remove(sm.getSelection());
				gridProd.getView().refresh();
				if (grupGridProd.getCount() > 0) {
					sm.select(0);
				}
				Ext.getCmp('txtProdAktif').setValue('');
				Ext.getCmp('txtProdAktif2').setValue('');
			},
			disabled: true
		},*/{
			xtype: 'tbfill',
		},{
			value: '<*Double click on the Qty to edit>',
			xtype: 'displayfield'
		}],
		tbar: [
		{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboKodeCabang2,
				txtKodeCabangs2
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboKodeJabatan2,
				txtKodeJabatans2
			]
		},
		{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [
			{
								iconCls: 'icon-add',
								text: 'Add',
								handler: function() {
									var xtotal = grupKodeTrans3.getCount();
									var xcab = Ext.getCmp('cboKodeCabang2').getValue();
									var xcabkode = Ext.getCmp('txtKodeCabangs2').getValue();
									var xjab = Ext.getCmp('cboKodeJabatan2').getValue();
									var xjabkode = Ext.getCmp('txtKodeJabatans2').getValue();
									var xdata = Ext.create('DataGridProd2', {
										fs_nama_cabang: Ext.getCmp('cboKodeCabang2').getValue(),
										fs_kode_cabang: Ext.getCmp('txtKodeCabangs2').getValue(),
										fs_nama_jabatan: Ext.getCmp('cboKodeJabatan2').getValue(),
										fs_kode_jabatan: Ext.getCmp('txtKodeJabatans2').getValue(),
										//fn_qty: '0',
										//fs_kd_unit: Ext.getCmp('cboUnit').getValue(),
										//fs_seqno: zeroPad(xurut, 6)
									});
									
									var store = gridKode2.getStore();
									var xlanjut = true;


									store.each(function(record, idx) {
										var xtext = record.get('fs_kode_cabang').trim();
										var xtext2 = record.get('fs_kode_jabatan').trim();
										
										if (xtext == xcabkode && xtext2 == xjabkode) {
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.Msg.WARNING,
												msg: 'Kode Cabang dan jabatan sudah ada, add struktur cancel!!',
												title: 'MFAS'
											});
											xlanjut = false;
										}

									
										
									});
									if (xlanjut === false) {
										return;
									}
									
									grupKodeTrans3.insert(xtotal, xdata);
									Ext.getCmp('cboKodeJabatan2').setValue('');
									Ext.getCmp('txtKodeCabangs2').setValue('');
									Ext.getCmp('txtKodeJabatans2').setValue('');
									Ext.getCmp('cboKodeCabang2').setValue('');
									
									xtotal = grupKodeTrans3.getCount() - 1;
									gridKode2.getSelectionModel().select(xtotal);

								}
							},
				{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridKode2.getSelectionModel();
					cellEditingProd.cancelEdit();
					grupKodeTrans3.remove(sm.getSelection());
					gridKode2.getView().refresh();
					if (grupKodeTrans3.getCount() > 0) {
						sm.select(0);
					}
					
					var xprod = Ext.getCmp('txtProdAktif').getValue();
					var xQty = 0;
					store = gridKode2.getStore();
					store.each(function(record, idx) {
						if (xprod.trim() == record.get('fs_kode_jabatan').trim()) {
							xQty = xQty + 1;
						}
					});
					gridKode2.getView().refresh();
				},
				disabled: true
			}]
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	 var win = Ext.create('Ext.window.Window', {
			border: false,
			closable: false,
			draggable: false,
			frame: false,
			height: 450,
			layout: 'fit',
			minHeight: 580,
			maxHeight: 580,
			minWidth: 990,
			maxWidth: 990,
			title: 'Siap',
			width: 500,
			items: [
				 Ext.create('Ext.form.Panel', {
						border: false,
						frame: true,
						region: 'center',
						autoDestroy:true,
						title: 'Master SDM',
						items: [{
							activeTab: 0,
							bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
							border: false,
							plain: true,
							xtype: 'tabpanel',
							items: [{
								bodyStyle: 'background-color: '.concat(gBasePanel),
								border: false,
								frame: false,
								title: 'Master SDM',
								xtype: 'form',
								items: [{
									fieldDefaults: {
										labelAlign: 'right',
										labelSeparator: '',
										labelWidth: 80,
										msgTarget: 'side'
									},
									style: 'padding: 5px;',
									xtype: 'fieldset',
									items: [
									{
											anchor: '100%',
											layout: 'hbox',
											xtype: 'container',
											items: [{
												flex: 1,
												layout: 'anchor',
												xtype: 'container',
												items: [{
													anchor: '98%',
													style: 'padding: 5px;',
													title: 'SDM',
													height: 535,
													xtype: 'fieldset',
													items: [
															 {
																afterLabelTextTpl: required,
																allowBlank: false,
																anchor: '100%',
																fieldLabel: 'Nik',
																id: 'txtNikk',
																enforceMaxLength: true,
																minLength: '0',
																maxLength: '50',
																fieldStyle: 'background-color: #eee; background-image: none;', 
																value: '',
																readOnly:true,
																name: 'txtNikk',
																xtype: 'textfield'
															},
															{
																afterLabelTextTpl: required,
																allowBlank: false,
																anchor: '100%',
																fieldLabel: 'Nik',
																id: 'txtKodeCabangUn',
																enforceMaxLength: true,
																minLength: '0',
																maxLength: '50',
																fieldStyle: 'background-color: #eee; background-image: none;', 
																value: '',
																hidden:true,
																name: 'txtKodeCabangUn',
																xtype: 'textfield'
															},
															{
																afterLabelTextTpl: required,
																allowBlank: false,
																anchor: '100%',
																fieldLabel: 'Nama',
																id: 'txtNamaa',
																enforceMaxLength: true,
																minLength: '0',
																maxLength: '50',
																fieldStyle: 'background-color: #eee; background-image: none;', 
																value: '',
																readOnly:true,
																name: 'txtNamaa',
																xtype: 'textfield'
															},
															{
																afterLabelTextTpl: required,
																allowBlank: false,
																anchor: '100%',
																fieldLabel: 'Tgl Join',
																id: 'txtTglJoin2',
																enforceMaxLength: true,
																minLength: '0',
																maxLength: '50',
																fieldStyle: 'background-color: #eee; background-image: none;', 
																value: '',
																readOnly:true,
																name: 'txtTglJoin2',
																xtype: 'textfield'
															},
															{
															bodyCls: 'x-panel-body-default-framed',
															buttons: [{
															iconCls: 'icon-save',
															text: 'Update',
															handler: fnSimpan2
														},
														{
															iconCls: 'icon-delete',
															text: 'Unregistrasi',
															handler: fnCekUnreg
														},
														{

															flex: 0.9,
															layout: 'anchor',
															xtype: 'container',
															items: []
														
														}]
													}
													]
												}]
											},{
												flex: 1.5,
												layout: 'anchor',
												xtype: 'container',
												items: [{
													style: 'padding: 5px;',
													title: 'Struktur Fungsi',
													items: [
														gridKode2,
													]
												}]
											}]
										}
									]
								}]
							}]
						}]
					})
			],
			listeners: {
				beforehide: function() {
					vMask.hide();
				},
				beforeshow: function() {
					grupGridDetil3.load();
					grupGridDetil4.load();
					vMask.show();
				}
			},
			buttons: [{
				text: 'Cancel',
				handler: function() {
					vMask.hide();
					win.hide();
				}
			}]
		});

	var frmSetupVariabelTipe = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master SDM',
		items: [{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Master SDM',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 80,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					xtype: 'fieldset',
					items: [
					{
							anchor: '100%',
							layout: 'hbox',
							xtype: 'container',
							items: [{
								flex: 1.4,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									anchor: '98%',
									style: 'padding: 5px;',
									title: 'SDM',
									height: 435,
									xtype: 'fieldset',
									items: [
											cboNIK,
											txtNama,
											tglBergabung,
											cboAkses,
											cboJabatan,
											cboCabang,
											txtKodeJabatan,
											txtKodeCabang,
											{
											bodyCls: 'x-panel-body-default-framed',
											buttons: [{
											iconCls: 'icon-save',
											text: 'Registrasi',
											handler: fnCekSimpan
										},{
											iconCls: 'icon-reset',
											text: 'Reset (ok)',
											handler: fnReset
										},{

											flex: 0.9,
											layout: 'anchor',
											xtype: 'container',
											items: []
										
										}]}
										]
								}]
							},{
								flex: 2,
								layout: 'anchor',
								xtype: 'container',
								items: [{
									style: 'padding: 5px;',
									title: 'Cabang',
									items: [
										gridKode,
									]
								}]
							}]
						}
					]
				}]
			},{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Struktur Organisasi Cabang',
				xtype: 'form',
				items: [
					
					cboCabang2,
					txtKodeCabang2,
					{
											bodyCls: 'x-panel-body-default-framed',
											buttons: [{
											iconCls: 'icon-save',
											text: 'View',
											handler: fnViewOrg
										},{

											flex: 0.9,
											layout: 'anchor',
											xtype: 'container',
											items: []
										
										}]}
				]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Silakan Tunggu...',
		target: frmSetupVariabelTipe
	});
	
	function fnMaskShow() {
		frmSetupVariabelTipe.mask('Silakan tunggu...');
	}

	function fnMaskHide() {
		frmSetupVariabelTipe.unmask();
	}
	
	frmSetupVariabelTipe.render(Ext.getBody());
	Ext.get('loading').destroy();
});