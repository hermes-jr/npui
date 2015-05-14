#!/usr/bin/env python
# -*- coding: utf-8; tab-width: 4; indent-tabs-mode: t -*-
#
# NetProfile: Yandex.Money module
# © Copyright 2013 Alex 'Unik' Unigovsky
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

from netprofile.common.modules import ModuleBase
from netprofile.tpl import TemplateObject

from pyramid.i18n import TranslationStringFactory

import syslog

_ = TranslationStringFactory('netprofile_yandexmoney')

#from .models import Test

class Module(ModuleBase):
	def __init__(self, mmgr):
		syslog.syslog('YM init message 000000')
		self.mmgr = mmgr
		mmgr.cfg.add_route(
			'yandexmoney.cl.accounts',
			'/yandexmoney/*traverse',
			factory='netprofile_yandexmoney.views.ClientRootFactory',
			vhost='client'
		)
		mmgr.cfg.add_translation_dirs('netprofile_yandexmoney:locale/')
		mmgr.cfg.scan()
		

	@classmethod
	def get_deps(cls):
		return ('stashes', 'xop')

	def get_models(cls):
		return (
			# Test
		)

	def get_css(self, request):
		return (
		)

	@property
	def name(self):
		syslog.syslog('YM init message aaaaaabbbb name')
		return _('Yandex.Money')

class Test:
	def __init__(self, provider):
		syslog.syslog('YM init message aaaaaa')
		self.provider = provider

	def process_request(self, request, sess):
		sux = request.POST.get('test', '')

	def generate_response(self, request, xoplist):
		resp = Response(status='200 OK', content_type='text/plain', charset='UTF-8')
		return 'shitload of python code'

