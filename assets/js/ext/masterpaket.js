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

	var grupKotaCabang= Ext.create('Ext.data.Store', {
		fields: [
			'fs_kode_kota','fs_nama_kota'
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
			url: 'apknew/ambil_kota'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var winGrid = Ext.create('Ext.ux.LiveSearchGridPanel', {
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKotaCabang,
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKotaCabang,
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
			{text: 'Kode Kota', dataIndex: 'fs_kode_kota', menuDisabled: true, width: 240},
			{text: 'Nama Kota', dataIndex: 'fs_nama_kota', menuDisabled: true, width: 120},
			
		],
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboKotaCabang').setValue(record.get('fs_nama_kota'));
				
				winCari.hide();
			}
		},
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
				grupKotaCabang.load();
				vMask.show();
			}
		}
	});

	var cboKotaCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kota Cabang',
		editable: true,
		id: 'cboKotaCabang',
		//maxLength: 5,
		name: 'cboKotaCabang',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				Ext.getCmp('cekAktif').setValue('1');
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
		anchor: '90%',
		fieldLabel: 'Kode Cabang',
		id: 'txtKodeCabang',
		maxLength : 2,
		fieldStyle: 'background-color: #eee; background-image: none;',
 		value:21,
 		readOnly:true,
 		enforceMaxLength : true,
		name: 'txtKodeCabang',
		xtype: 'numberfield',
		hideTrigger: true,
	};

	var txtKodePaket = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '30%',
		fieldLabel: 'Kode Paket',
		id: 'txtKodePaket',
 		enforceMaxLength: true,
		minLength: '0',
		maxLength: '7', 
		maskRe: /[-zxcvbnmasdfghjklqwertyuiopZXCVBNNMASDFGHJKLQWERTYUIOP1234567890.]/,
		name: 'txtKodePaket',
		xtype: 'textfield',
		hideTrigger: true,
	};


	var txtNamaPaket = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '60%',
		fieldLabel: 'Nama Paket',
		id: 'txtNamaPaket',
		enforceMaxLength: true,
		minLength: '0',
		maxLength: '30', 
		name: 'txtNamaPaket',
		xtype: 'textfield'
	};

	var txtPenjelasanPaket = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Penjelasan Paket',
		id: 'txtPenjelasanPaket',
		maxLength: 50,
		name: 'txtPenjelasanPaket',
		xtype: 'textarea'
	};

	Ext.define('DataGridDetil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_kode_paket', type: 'string'},
			{name: 'fs_nama_paket', type: 'string'},
			{name: 'fs_penjelasan_paket', type: 'string'},
			{name: 'fs_aktif', type: 'bool'}
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
			url: 'masterpaket/listMasterPaket'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridDetil = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 650,
		sortableColumns: false,
		store: grupGridDetil,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true, 
			text: 'Kode Cabang',
			width: 100
		},{
			dataIndex: 'fs_kode_paket',
			menuDisabled: true, 
			text: 'Kode Paket',
			width: 150
		},
		{
			dataIndex: 'fs_nama_paket',
			menuDisabled: true, 
			text: 'Nama Paket',
			width: 120
		},
		{
			dataIndex: 'fs_penjelasan_paket',
			menuDisabled: true, 
			text: 'Penjelasan Paket',
			width: 120
		},
		{
			align: 'center',
			dataIndex: 'fs_aktif',
			menuDisabled: true, 
			stopSelection: false,
			text: 'Aktif',
			width: 55,
			xtype: 'checkcolumn',
			listeners: {
				beforecheckchange: function() {
					return false;
				}
			}
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Cabang  / Kode Paket /  Nama Paket',
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
					grupGridDetil.load();
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
			store: grupGridDetil
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	function fnCekSimpan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masterpaket/CekSimpan',
				params: {
					'fs_kode_paket': Ext.getCmp('txtKodePaket').getValue()
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
						if (xText.sukses === true && xText.hasil == 'lanjut') {
							fnSimpan();
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
									}
								}
							});
						}
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
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'masterpaket/Simpan',
			params: {
				'fs_kode_paket': Ext.getCmp('txtKodePaket').getValue(),
				'fs_kode_cabang': Ext.getCmp('txtKodeCabang').getValue(),
				'fs_nama_paket': Ext.getCmp('txtNamaPaket').getValue(),
				'fs_penjelasan_paket': Ext.getCmp('txtPenjelasanPaket').getValue(),
				'fs_aktif': Ext.getCmp('cekAktif').getValue(),
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
				fnReset();
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

	function fnReset() {
		Ext.getCmp('txtKodePaket').setValue('');
		Ext.getCmp('cekAktif').setValue('1');
		Ext.getCmp('txtKodeCabang').setValue('');
		Ext.getCmp('txtNamaPaket').setValue('');
		Ext.getCmp('txtPenjelasanPaket').setValue('');
		Ext.getCmp('txtKtpSurveyor').setValue('');

		grupGridDetil.load();
	}

	var frmSetupVariabelTipe = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master paket',
		width: 930,
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
				title: 'Setup',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 150,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [
								txtKodeCabang
								
							]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [
								cekAktif
							]
						}]
					},
					
						txtKodePaket,
						txtNamaPaket,
						txtPenjelasanPaket
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					text: 'Simpan',
					handler: fnCekSimpan
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					handler: fnReset
				}]
			},{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Jenis Paket',
				xtype: 'form',
				items: [
					gridDetil
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