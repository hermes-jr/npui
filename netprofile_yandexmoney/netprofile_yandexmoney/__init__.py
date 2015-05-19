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

_ = TranslationStringFactory('netprofile_yandexmoney')

from pyramid.response import Response

from netprofile.db.connection import DBSession
from netprofile_xop.models import (
	ExternalOperation,
	ExternalOperationProvider,
	ExternalOperationState
)

from netprofile_core.models import (
	GlobalSetting,
	GlobalSettingSection
)

import hashlib

class Module(ModuleBase):
	def __init__(self, mmgr):
		self.mmgr = mmgr
		'''
		mmgr.cfg.add_route(
			'yandexmoney.cl.accounts',
			'/yandexmoney/*traverse',
			factory='netprofile_yandexmoney.views.ClientRootFactory',
			vhost='client'
		)
		'''
		mmgr.cfg.add_translation_dirs('netprofile_yandexmoney:locale/')
		mmgr.cfg.scan()

	@classmethod
	def get_deps(cls):
		return ('stashes', 'xop')

	@classmethod
	def get_models(cls):
		from netprofile_yandexmoney import models
		return (
		)

	@classmethod
	def get_sql_data(cls, modobj, sess):
		gss_ym_settings = GlobalSettingSection( # no old id
			module=modobj,
			name='Yandex.Money settings',
			description='Settings for netprofile_yandexmoney module.'
		)

		sess.add(gss_ym_settings)

		sess.add(GlobalSetting(
			section=gss_ym_settings,
			module=modobj,
			name='ym_sharedsecret',
			title='Shared secret',
			type='text',
			default='',
			value='',
			description='Shared secret key for Yandex.Money notifications validation.'
		))

	def get_css(self, request):
		return (
		)

	@property
	def name(self):
		return _('Yandex.Money')

class YandexMoney(object):
	def __init__(self, provider):
		self.provider = provider

	@staticmethod
	def _ym_verify_sha1(postdata):
		'''Yandex.Money provides SHA1 hash in POST data, which was calculated using a pre-shared key.
		It should be recalculated here to make sure that request was generated by Yandex.Money service
		and doesn't contain errors.

		Formula is:
		sha1(notification_type&operation_id&amount&currency&datetime&sender&codepro&notification_secret&label)

		Args:
			postdata (MultiDict): object returned by request.POST which contains all variables
				provided by Yandex.Money. Example:
				MultiDict
				([
					('notification_type', 'p2p-incoming'),
					('amount', '369.06'),
					('datetime', '2015-05-19T15:25:22Z'),
					('codepro', 'false'),
					('sender', '41001000040'),
					('sha1_hash', 'f2e167ac66c1d7ff697e6215615c459e5ce13238'),
					('test_notification', 'true'),
					('operation_label', ''),
					('operation_id', 'test-notification'),
					('currency', '643'),
					('label', '')
				])

		Returns:
			bool: True if successful, False otherwise.

		'''

		from netprofile_core import global_setting
		secret = global_setting('ym_sharedsecret')

		concat = "{}&{}&{}&{}&{}&{}&{}&{}&{}".format(
		postdata.get('notification_type', ''),
		postdata.get('operation_id', ''),
		postdata.get('amount', ''),
		postdata.get('currency', ''),
		postdata.get('datetime', ''),
		postdata.get('sender', ''),
		postdata.get('codepro', ''),
		secret,
		postdata.get('label', ''))

		calculated_sha1 = hashlib.sha1(concat.encode()).hexdigest()
		goal_sha1 = postdata.get('sha1_hash')

		if(calculated_sha1 == goal_sha1):
			return True
		return False

	def process_request(self, request, sess):
		xop = ExternalOperation()
		xop.provider = self.provider

		if not self._ym_verify_sha1(request.POST):
			print('Verification failed')
			xop.state = ExternalOperationState.canceled
			return []
		print('Verification succeeded')

		xop.external_id = request.POST.get('operation_id', '')
		xop.difference = request.POST.get('amount', '')

		#xop.state = ExternalOperationState.cleared
		return [xop]

	def generate_response(self, request, xoplist):
		return Response(status=str('200 OK'), content_type=str('text/plain'), charset=str('UTF-8'))
