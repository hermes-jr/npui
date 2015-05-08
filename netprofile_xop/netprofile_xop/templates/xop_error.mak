## -*- coding: utf-8 -*-
<%inherit file="netprofile_xop:templates/xop_base.mak"/>

	<div class="jumbotron"><div class="container">
		<h1>${error} <small>${_('Error %d', domain='netprofile_xop') % req.response.status_code}</small></h1>
% if req.response.status_code == 404:
		<p>
			${_('There is no page with the address you provided.', domain='netprofile_xop')}
			${_('We\'re really sorry about that.', domain='netprofile_xop')}
		</p>
% elif req.response.status_code == 403:
		<p>
			${_('You don\'t have the credentials that are required to access this page.', domain='netprofile_xop')}
% if not req.user:
			${_('Maybe you forgot to log in?', domain='netprofile_xop')}
% else:
			${_('We\'re really sorry about that.', domain='netprofile_xop')}
% endif
		</p>
% endif
		<p>${_('You can contact support or try again.', domain='netprofile_xop')}</p>
	</div></div>

