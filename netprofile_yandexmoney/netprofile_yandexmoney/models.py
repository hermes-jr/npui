#!/usr/bin/env python
# -*- coding: utf-8; tab-width: 4; indent-tabs-mode: t -*-
#
# NetProfile: Paypal module - Models
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

__all__ = [
]

from netprofile.db.connection import DBSession
from netprofile_xop.models import (
    ExternalOperation,
	ExternalOperationProvider,
	ExternalOperationState
)
from netprofile_entities.models import PhysicalEntity
import urllib
from pyramid.response import Response
#from pyramid.request import Request
#from urllib2 import urlopen, Request

class YandexMoneyIPN:
	
	def __init__(self, provider):
		self.provider = provider
	
	def process_request(self, request, sess):
#		sess = DBSession()

		payment_type = request.POST.get('payment_type', '')

		txn_type = request.POST.get('txn_type', '')
		txn_id = request.POST.get('txn_id', None)

		#TODO: add variable sanity checks
		if custom is None:
			xop = ExternalOperation()
			
			xop.external_id = txn_id
			xop.external_account = payer_id
			xop.provider = self.provider
	
			entities = sess.query(PhysicalEntity).filter(PhysicalEntity.email == payer_email)
	
			xop.entity = entities[0]
			xop.stash = xop.entity.stashes[0]
			xop.difference = mc_gross

			post = request.POST
			post['cmd'] = '_notify-validate'
			params = urllib.urlencode(post)
			req = Request("""https://www.sandbox.paypal.com/cgi-bin/webscr""", params)
			req.add_header("Content-type", "application/x-www-form-urlencoded")
			response = urllib.urlopen(req)
			status = response.read()

			if not status == "VERIFIED":
				xop.state = ExternalOperationState.canceled
				return (xop)
			
			xop.state = ExternalOperationState.confirmed

		elif txn_id:
			xop = sess.query(ExternalOperation).filter(ExternalOperation.external_id == txn_id).one()
			xop.state = ExternalOperationState.confirmed

		xop.state = ExternalOperationState.cleared
		return [xop]

	def generate_response(self, request, xoplist):
		resp = Response(status='200 OK', content_type='text/plain', charset='UTF-8')
		return resp
