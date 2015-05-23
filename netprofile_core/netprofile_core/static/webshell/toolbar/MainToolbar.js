Ext.define('NetProfile.toolbar.MainToolbar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.maintoolbar',
	requires: [
		'Ext.menu.Menu',
		'Ext.container.ButtonGroup',
		'Ext.form.*',
		'NetProfile.form.Panel',
		'NetProfile.panel.Wizard'
	],
	id: 'npws_maintoolbar',
	stateId: 'npws_maintoolbar',
	stateful: true,
	collapsible: false,
	height: 32,

	toolsText: 'Tools',
	toolsTipText: 'Various tools and windows',
	logoutText: 'Log out',
	logoutTipText: 'Log out of the application and return to login screen.',
	authMgmtText: 'Authorization management',
	chPassText: 'Change password',
	gen2FactorQRCodeText: 'Generate QR code',
	chLangText: 'Change language',
	showConsoleText: 'Show console',
	aboutText: 'About…',

	initComponent: function()
	{
		this.items = [{
			text: this.toolsText,
			iconCls: 'ico-tool',
			itemId: 'sub_tools',
			tooltip: { text: this.toolsTipText, title: this.toolsText },
			menu: {
				xtype: 'menu',
				items: [{
					text: this.aboutText,
					iconCls: 'ico-info',
					handler: function(el, ev)
					{
					}
				}, '-', {
					xtype: 'menuitem',
					showSeparator: false,
					iconCls: 'ico-lock',
					text: this.authMgmtText,
					menu:
					{
						xtype: 'menu',
						plain: true,
						showSeparator: false,
						items: [{
							xtype: 'menuitem',
							iconCls: 'ico-key',
							text: this.chPassText,
							handler: function(el, ev)
							{
								NetProfile.changePassword();
							}
						}, {
							xtype: 'menuitem',
							iconCls: 'ico-qrcode',
							text: this.gen2FactorQRCodeText,
							handler: function(el, ev)
							{
								NetProfile.gen2FactorQRCode();
							}
						}]
					}
				}, {
					xtype: 'menuitem',
					showSeparator: false,
					iconCls: 'ico-locale',
					text: this.chLangText,
					menu: {
						xtype: 'menu',
						plain: true,
						showSeparator: false,
						items: [{
							xtype: 'buttongroup',
							plain: true,
							title: this.chLangText,
							titleAlign: 'left',
							columns: 1,
							defaults: {
								margin: 3,
							},
							items: [{
								xtype: 'combo',
								editable: false,
								itemId: 'ch_lang',
								store: Ext.create('NetProfile.store.Language'),
								displayField: 'name',
								valueField: 'code',
								value: NetProfile.currentLocale,
								listeners: {
									change: function(fld, newval)
									{
										window.location = '/core/noop?__locale=' + newval;
									}
								}
							}]
						}]
					}
				}, {
					xtype: 'menuitem',
					iconCls: 'ico-console',
					text: this.showConsoleText,
					handler: function(el, ev)
					{
						NetProfile.showConsole();
					}
				}]
			}
		}, '->', {
			text: this.logoutText,
			iconCls: 'ico-logout',
			tooltip: { text: this.logoutTipText, title: this.logoutText },
			handler: function()
			{
				NetProfile.logOut(true);
			}
		}];
		this.callParent(arguments);
	}
});

