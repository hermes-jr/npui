/**
 * This abstract base class is used by grid filters that have a three
 * {@link Ext.data.Store#cfg-filters store filter}.
 *
 * Based on Ext.grid.filters.filter.TriFilter, but with 2 range filters
 * (">", "<") replaced with ">=" and "<=".
 *
 * @protected
 */
Ext.define('NetProfile.grid.filters.filter.TriFilter', {
    extend: 'Ext.grid.filters.filter.TriFilter',

    /**
     * @property {String[]} menuItems
     * The items to be shown in this menu.  Items are added to the menu
     * according to their position within this array.
     * Defaults to:
     *      menuItems : ['le', 'ge', '-', 'eq']
     * @private
     */
    menuItems: ['ge', 'le', '-', 'eq'],

    constructor: function (config) {
        var me = this,
            stateful = false,
            filter = {},
            filterGe, filterLe, filterEq, value, operator;

        me.callParent([config]);

        value = me.value;

        filterLe = me.getStoreFilter('le');
        filterGe = me.getStoreFilter('ge');
        filterEq = me.getStoreFilter('eq');

        if (filterLe || filterGe || filterEq) {
            // This filter was restored from stateful filters on the store so enforce it as active.
            stateful = me.active = true;
            if (filterLe) {
                me.onStateRestore(filterLe);
            }
            if (filterGe) {
                me.onStateRestore(filterGe);
            }
            if (filterEq) {
                me.onStateRestore(filterEq);
            }
        } else {
            // Once we've reached this block, we know that this grid filter doesn't have a stateful filter, so if our
            // flag to begin saving future filter mutations is set we know that any configured filter must be nulled
            // out or it will replace our stateful filter.
            if (me.grid.stateful && me.getGridStore().saveStatefulFilters) {
                value = undefined;
            }

            // TODO: What do we mean by value === null ?
            me.active = !!value;
        }

        // Note that stateful filters will have already been gotten above. If not, or if all filters aren't stateful, we
        // need to make sure that there is an actual filter instance created, with or without a value.
        //
        // Note use the alpha alias for the operators ('ge', 'le', 'eq') so they map in Filters.onFilterRemove().
        filter.le = filterLe || me.createFilter({
            operator: 'le',
            value: (!stateful && value && value.le) || null
        }, 'le');

        filter.ge = filterGe || me.createFilter({
            operator: 'ge',
            value: (!stateful && value && value.ge) || null
        }, 'ge');

        filter.eq = filterEq || me.createFilter({
            operator: 'eq',
            value: (!stateful && value && value.eq) || null
        }, 'eq');

        me.filter = filter;

        if (me.active) {
            me.setColumnActive(true);
            if (!stateful) {
                for (operator in value) {
                    me.addStoreFilter(me.filter[operator]);
                }
            }
            // TODO: maybe call this.activate?
        }
    },

    setValue: function (value) {
        var me = this,
            fields = me.fields,
            filters = me.filter,
            add = [],
            remove = [],
            active = false,
            filterCollection = me.getGridStore().getFilters(),
            field, filter, v, i, len;

        if (me.preventFilterRemoval) {
            return;
        }

        me.preventFilterRemoval = true;

        if ('eq' in value) {
            v = filters.le.getValue();
            if (v || v === 0) {
                remove.push(fields.le);
            }

            v = filters.ge.getValue();
            if (v || v === 0) {
                remove.push(fields.ge);
            }

            v = value.eq;
            if (v || v === 0) {
                add.push(fields.eq);
                filters.eq.setValue(v);
            } else {
                remove.push(fields.eq);
            }
        } else {
            v = filters.eq.getValue();
            if (v || v === 0) {
                remove.push(fields.eq);
            }

            if ('le' in value) {
                v = value.le;
                if (v || v === 0) {
                    add.push(fields.le);
                    filters.le.setValue(v);
                } else {
                    remove.push(fields.le);
                }
            }

            if ('ge' in value) {
                v = value.ge;
                if (v || v === 0) {
                    add.push(fields.ge);
                    filters.ge.setValue(v);
                } else {
                    remove.push(fields.ge);
                }
            }
        }

        if (remove.length || add.length) {
            filterCollection.beginUpdate();

            if (remove.length) {
                for (i = 0, len = remove.length; i < len; i++) {
                    field = remove[i];
                    filter = field.filter;

                    field.setValue(null);
                    filter.setValue(null);
                    me.removeStoreFilter(filter);
                }
            }

            if (add.length) {
                for (i = 0, len = add.length; i < len; i++) {
                    me.addStoreFilter(add[i].filter);
                }

                active = true;
            }

            filterCollection.endUpdate();
        }

        if (!active && filterCollection.length) {
            active = me.hasActiveFilter();
        }

        if (!active || !me.active) {
            me.setActive(active);
        }

        me.preventFilterRemoval = false;
    }
});

