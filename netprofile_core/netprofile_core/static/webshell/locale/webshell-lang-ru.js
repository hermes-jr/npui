Ext.onReady(function()
{
	Ext.define('Ext.locale.ru.Date', {
		override: 'Ext.Date',
		defaultFormat: 'd.m.Y'
	});
	Ext.define('Ext.locale.ru.NetProfile.form.field.DateTime', {
		override: 'NetProfile.form.field.DateTime',
		format: 'd.m.Y H:i',
		altFormats: 'Y-m-d H:i|Y-m-d H:i:s|Y-m-d\\TH:i:s|Y-m-d\\TH:i:sP|C', // FIXME
		timeFormat: 'H:i'
	});
	Ext.define('Ext.locale.ru.picker.Date', {
		override: 'Ext.picker.Date',
		format: 'd.m.Y'
	});
	Ext.define('Ext.locale.ru.form.field.Date', {
		override: 'Ext.form.field.Date',
		format: 'd.m.Y'
	});
	Ext.define('Ext.locale.ru.NetProfile.picker.DateTime', {
		override: 'NetProfile.picker.DateTime',
		applyText: 'Применить',
		cancelText: 'Отмена'
	});

	Ext.define('Ext.locale.ru.grid.RowEditor', {
		override: 'Ext.grid.RowEditor',
		saveBtnText: 'Применить',
		cancelBtnText: 'Отмена',
		errorsText: 'Ошибки',
		dirtyText: 'Вам необходимо применить либо отменить изменения'
	});

	Ext.define('Ext.locale.ru.view.Table', {
		override: 'Ext.view.Table',
		loadingText: 'Загрузка...'
	});

	Ext.define('Ext.locale.ru.grid.column.Action', {
		override: 'Ext.grid.column.Action',
		menuText: '<i>Действия</i>'
	});

	Ext.define('Ext.locale.ru.grid.filters.Filters', {
		override: 'Ext.grid.filters.Filters',
		menuFilterText: 'Фильтры'
	});
	Ext.define('Ext.locale.ru.grid.filters.filter.String', {
		override: 'Ext.grid.filters.filter.String',
		emptyText: 'Введите текст...'
	});
	Ext.define('Ext.locale.ru.grid.filters.filter.Boolean', {
		override: 'Ext.grid.filters.filter.Boolean',
		yesText: 'Да',
		noText: 'Нет'
	});
	Ext.define('Ext.locale.ru.grid.filters.filter.Date', {
		override: 'Ext.grid.filters.filter.Date',
		config: {
			fields: {
				gt: { text: 'Позднее' },
				lt: { text: 'Раньше' },
				eq: { text: 'В' }
			}
		}
	});
	Ext.define('Ext.locale.ru.NetProfile.grid.filters.filter.Date', {
		override: 'NetProfile.grid.filters.filter.Date',
		config: {
			fields: {
				ge: { text: 'Позднее' },
				le: { text: 'Раньше' },
				eq: { text: 'В' }
			}
		}
	});
	Ext.define('Ext.locale.ru.grid.filters.filter.List', {
		override: 'Ext.grid.filters.filter.List',
		loadingText: 'Загрузка...'
	});
	Ext.define('Ext.locale.ru.grid.filters.filter.Number', {
		override: 'Ext.grid.filters.filter.Number',
		emptyText: 'Введите число...'
	});
	Ext.define('Ext.locale.ru.NetProfile.grid.filters.filter.Number', {
		override: 'NetProfile.grid.filters.filter.Number',
		emptyText: 'Введите число...'
	});
	Ext.define('Ext.locale.ru.NetProfile.grid.plugin.SimpleSearch', {
		override: 'NetProfile.grid.plugin.SimpleSearch',
		fieldEmptyText: 'Поиск...'
	});
	Ext.define('Ext.locale.ru.NetProfile.grid.plugin.ExtraSearch', {
		override: 'NetProfile.grid.plugin.ExtraSearch',
		searchText: 'Поиск',
		searchTipText: 'Дополнительные условия поиска.',
		advSearchText: 'Расширенный поиск',
		clearText: 'Сбросить'
	});

	Ext.define('Ext.locale.ru.NetProfile.view.ModelGrid', {
		override: 'NetProfile.view.ModelGrid',
		emptyText: 'По вашему запросу ничего не найдено.',
		clearText: 'Сбросить',
		clearTipText: 'Сбросить фильтры и порядок сортировки.',
		addText: 'Добавить',
		addTipText: 'Добавить новый объект.',
		addWindowText: 'Добавить новый объект',
		propTipText: 'Просмотр свойств объекта',
		deleteTipText: 'Удалить объект',
		deleteMsgText: 'Вы уверены в том, что хотите удалить данный объект?',
		actionTipText: 'Действия для объекта',
		exportText: 'Экспорт'
	});

	Ext.define('Ext.locale.ru.NetProfile.view.ModelSelect', {
		override: 'NetProfile.view.ModelSelect',
		chooseText: 'Выберите объект'
	});

	Ext.define('Ext.locale.ru.NetProfile.view.PropBar', {
		override: 'NetProfile.view.PropBar',
		recordText: 'Запись',
		submitText: 'Отправить'
	});

	Ext.define('Ext.locale.ru.NetProfile.view.TopBar', {
		override: 'NetProfile.view.TopBar',
		toolsText: 'Инструменты',
		toolsTipText: 'Различные второстепенные окна и настройки.',
		logoutText: 'Выход',
		logoutTipText: 'Выйти из системы.',
		chLangText: 'Переключение языка',
		showConsoleText: 'Показать консоль',
		aboutText: 'О программе…'
	});

	Ext.define('Ext.locale.ru.NetProfile.view.Form', {
		override: 'NetProfile.view.Form',
		resetText: 'Сбросить',
		resetTipTitleText: 'Сбросить данные',
		resetTipText: 'Вернуть значения полей в этой форме к исходным.',
		submitText: 'Сохранить',
		submitTipTitleText: 'Сохранить данные',
		submitTipText: 'Проверить и сохранить данные в этой форме.'
	});

	Ext.define('Ext.locale.ru.NetProfile.view.Wizard', {
		override: 'NetProfile.view.Wizard',
		btnPrevText: 'Назад',
		btnNextText: 'Далее',
		btnCancelText: 'Отмена',
		btnSubmitText: 'Готово'
	});

	Ext.define('Ext.locale.ru.NetProfile.controller.UserSettingsForm', {
		override: 'NetProfile.controller.UserSettingsForm',
		btnResetText: 'Сбросить',
		btnResetTipTitleText: 'Сбросить настройки',
		btnResetTipText: 'Вернуть значения полей в этой форме к исходным.',
		btnSaveText: 'Сохранить',
		btnSaveTipTitleText: 'Сохранить настройки',
		btnSaveTipText: 'Проверить и сохранить ваши настройки'
	});

	Ext.define('Ext.locale.ru.NetProfile.view.FileFolderContextMenu', {
		override: 'NetProfile.view.FileFolderContextMenu',
		createText: 'Создать подпапку',
		propText: 'Свойства',
		renameText: 'Переименовать',
		deleteText: 'Удалить',
		mountText: 'Подключить',
		newFolderText: 'Новая папка',
		deleteFolderText: 'Удаление папки',
		deleteFolderVerboseText: 'Вы уверены что хотите удалить эту папку?'
	});

	Ext.define('Ext.locale.ru.ux.form.RightsBitmaskField', {
		override: 'Ext.ux.form.RightsBitmaskField',
		ownerText: 'Владелец',
		groupText: 'Группа',
		otherText: 'Прочие',
		readText: 'Чтение',
		writeText: 'Запись',
		executeText: 'Выполнение',
		traverseText: 'Переход'
	});

	Ext.define('Ext.locale.ru.NetProfile.form.field.IPv6', {
		override: 'NetProfile.form.field.IPv6',
		invalidAddressText: 'Некорректный адрес IPv6'
	});

	Ext.define('Ext.locale.ru.NetProfile.view.FileBrowser', {
		override: 'NetProfile.view.FileBrowser',

		emptyText: 'Папка пуста',

		viewText: 'Просмотр',
		viewAsIconsText: 'Иконки',
		viewAsListText: 'Список',
		viewAsGridText: 'Таблица',

		sortText: 'Сортировка',
		sortByNameText: 'По имени файла',
		sortByCTimeText: 'По времени создания',
		sortByMTimeText: 'По времени изменения',
		sortBySizeText: 'По размеру',

		sortAscText: 'По возрастанию',
		sortDescText: 'По убыванию',

		btnDeleteText: 'Удалить',

		deleteTipText: 'Удалить файл',
		deleteMsgText: 'Вы уверены что хотите удалить выбранный файл?',
		deleteManyTipText: 'Удалить файлы',
		deleteManyMsgText: 'Вы уверены что хотите удалить выбранные файлы?',

		btnUploadText: 'Залить',

		uploadTitleText: 'Заливка файлов',
		uploadCloseText: 'Закрыть',
		uploadAddText: 'Добавить',
		uploadUploadText: 'Залить',
		uploadRemoveText: 'Убрать',
		uploadWaitMsg: 'Файлы заливаются...',

		btnRenameText: 'Переименовать',
		btnPropsText: 'Свойства',
		btnDownloadText: 'Скачать',

		searchEmptyText: 'Поиск...',

		gridNameText: 'Имя',
		gridSizeText: 'Размер',
		gridCreatedText: 'Создан',
		gridModifiedText: 'Изменён',

		kibText: 'Кбайт',
		mibText: 'Мбайт',
		gibText: 'Гбайт',
		tibText: 'Тбайт'
	});

	Ext.define('Ext.locale.ru.NetProfile.view.CapabilityGrid', {
		override: 'NetProfile.view.CapabilityGrid',

		textName: 'Название',
		textValue: 'Значение',
		textAllowed: 'Разрешено',
		textDenied: 'Запрещено',
		textNotDefined: 'Не определено',
		textTipACL: 'Редактирование ACL'
	});
});

