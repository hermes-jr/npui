/**
 * @class Ext.ux.grid.filter.IPv6Filter
 * @extends Ext.ux.grid.filter.Filter
 * Filters using an Ext.ux.grid.menu.RangeMenu.
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
	...
	filters: [{
		type: 'ipv6',
		dataIndex: 'ipaddr'
	}]
});
 * </code></pre>
 * <p>Any of the configuration options for {@link Ext.ux.grid.menu.RangeMenu} can also be specified as
 * configurations to IPv6Filter, and will be copied over to the internal menu instance automatically.</p>
 */
Ext.define('Ext.ux.grid.filter.IPv6Filter', {
	extend: 'Ext.ux.grid.filter.Filter',
	alias: 'gridfilter.ipv6',
	uses: [
		'Ext.ux.form.field.IPv6'
	],

	/**
	 * @private @override
	 * Creates the Menu for this filter.
	 * @param {Object} config Filter configuration
	 * @return {Ext.menu.Menu}
	 */
	createMenu: function(config)
	{
		var me = this,
			menu;
		menu = Ext.create(
			'Ext.ux.grid.menu.RangeMenu',
			Ext.apply(config, {
				fieldCls: 'Ext.ux.form.field.IPv6',
				menuItemCfgs : {
					selectOnFocus: false,
					allowBlank: true,
					width: 220
				}
			})
		);
		menu.on('update', me.fireUpdate, me);
		return menu;
    },

	/**
	 * @private
	 * Template method that is to get and return the value of the filter.
	 * @return {String} The value of this filter
	 */
	getValue: function()
	{
		return this.menu.getValue();
	},

	/**
	 * @private
	 * Template method that is to set the value of the filter.
	 * @param {Object} value The value to set the filter
	 */
	setValue: function(value, susp)
	{
		var key;
		for(key in value)
		{
			if(value[key])
				value[key] = ipaddr.IPv6.parse(value[key]);
			else
				delete value[key];
		}
		this.menu.setValue(value, susp);
	},

	/**
	 * @private
	 * Template method that is to return <tt>true</tt> if the filter
	 * has enough configuration information to be activated.
	 * @return {Boolean}
	 */
	isActivatable: function()
	{
		var values = this.getValue(),
			key;
		for(key in values)
		{
			if(values[key] !== undefined)
				return true;
		}
		return false;
	},

	/**
	 * @private
	 * Template method that is to get and return serialized filter data for
	 * transmission to the server.
	 * @return {Object/Array} An object or collection of objects containing
	 * key value pairs representing the current configuration of the filter.
	 */
	getSerialArgs: function()
	{
		var key,
			args,
			values = this.menu.getValue();

		args = values;
		args.type = 'ipv6';
		return args;
	},

	/**
	 * Template method that is to validate the provided Ext.data.Record
	 * against the filters configuration.
	 * @param {Ext.data.Record} record The record to validate
	 * @return {Boolean} true if the record is valid within the bounds
	 * of the filter, false otherwise.
	 */
	validateRecord: function(record)
	{
//		var val = record.get(this.dataIndex),
//			values = this.getValue(),
//			isNumber = Ext.isNumber;
//		if(isNumber(values.eq) && val != values.eq)
//			return false;
//		if(isNumber(values.lt) && val >= values.lt)
//			return false;
//		if(isNumber(values.gt) && val <= values.gt)
//			return false;
		return true;
	}
});

