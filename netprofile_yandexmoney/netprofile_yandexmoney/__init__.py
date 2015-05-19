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

from pyramid.response import Response

_ = TranslationStringFactory('netprofile_yandexmoney')

#from .models import Test

class Module(ModuleBase):
	def __init__(self, mmgr):
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
		)

	def get_css(self, request):
		return (
		)

	@property
	def name(self):
		return _('Yandex.Money')

class Test(object):
	def __init__(self, provider):
		self.provider = provider

	def process_request(self, request, sess):
		sux = request.POST.get('test', '')
		print('AAAAAAAAAAAAAAAAAAAAAAA')
		print(repr(request.POST))
		print('AAAAAAAAAAAAAAAAAAAAAAA')
		return []

	def generate_response(self, request, xoplist):
		body = 'OK'
		return Response(body, content_type=str('text/plain'), charset=str('UTF-8'))
		#resp = Response(status='200 OK', content_type='text/plain', charset='UTF-8')
		#return resp

