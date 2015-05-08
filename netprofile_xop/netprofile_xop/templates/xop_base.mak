## -*- coding: utf-8 -*-
<%!

from netprofile.tpl.filters import jsone_compact

%>\
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge;chrome=1" />
	<meta name="referrer" content="none" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="keywords" content="netprofile" />
	<meta name="description" content="NetProfile xop test" />
	<title>NPfixme</title>
<%block name="head"/>
</head>
<body>${next.body()}</body>
</html>
