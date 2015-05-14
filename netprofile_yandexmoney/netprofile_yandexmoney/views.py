#!/usr/bin/env python
# -*- coding: utf-8; tab-width: 4; indent-tabs-mode: t -*-
#
# NetProfile: Paypal module - Views
# © Copyright 2013-2014 Alex 'Unik' Unigovsky
#
# This file is part of NetProfile.
# NetProfile is free software: you can redistribute it and/or
# modify it under the terms of the GNU Affero General Public
# License as published by the Free Software Foundation, either
# version 3 of the License, or (at your option) any later
# version.
#
# NetProfile is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General
# Public License along with NetProfile. If not, see
# <http://www.gnu.org/licenses/>.

from __future__ import (
	unicode_literals,
	print_function,
	absolute_import,
	division
)

from pyramid.i18n import (
	TranslationStringFactory,
	get_localizer
)

import math
import datetime as dt
from dateutil.parser import parse as dparse
from dateutil.relativedelta import relativedelta

from pyramid.view import view_config
from pyramid.settings import asbool
from pyramid.httpexceptions import (
	HTTPForbidden,
	HTTPSeeOther
)
from sqlalchemy import func
from sqlalchemy.orm.exc import NoResultFound
from netprofile import locale_neg

from netprofile.common.factory import RootFactory
from netprofile.common.hooks import register_hook
from netprofile.db.connection import DBSession
from netprofile_xop.models import (
	ExternalOperation,
	ExternalOperationProvider,
	ExternalOperationState
)
from netprofile_stashes.models import Stash

_ = TranslationStringFactory('netprofile_yandexmoney')

class ClientRootFactory(RootFactory):
	def __getitem__(self, name):
#		raise KeyError('Invalid URL')
		return 'zzz'

@view_config(
	route_name='yandexmoney.cl.accounts',
	name='',
	context=ClientRootFactory,
	permission='USAGE',
	renderer='netprofile_yandexmoney:templates/client_yandexmoney.mak'
)
def client_list(ctx, request):
	loc = get_localizer(request)
	tpldef = {
	}
	request.run_hook('access.cl.tpldef', tpldef, request)
	request.run_hook('access.cl.tpldef.accounts.list', tpldef, request)
	return tpldef
