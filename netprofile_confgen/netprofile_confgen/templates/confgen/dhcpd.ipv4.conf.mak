## -*- coding: utf-8 -*-
<%!
	import itertools
%>\
# NetProfile
# Configuration: ${srv.type.description or srv.type.name}
# For DHCPv4 server
# Autogenerated on ${now.date()} at ${now.time()}
# Do not modify - this file will be overwritten!

log-facility ${srv.get_param('syslog_facility', 'local7')};
default-lease-time ${srv.get_param('lease_time_default', '9600')};
max-lease-time ${srv.get_param('lease_time_max', '86400')};
option architecture code 93 = unsigned integer 16;
option classless-route code 121 = string;
option ms-classless-route code 249 = string;
option domain-name "${srv.get_param('domain_default', str(srv.host.domain))}";
% if sum(ds.type_id in (1, 2) for ds in srv.host.domain.services):
option domain-name-servers ${gen.host_iplist(ds.host for ds in srv.host.domain.services if ds.type_id in (1, 2))};
% endif
ddns-update-style none;
authoritative;

% for ng in gen.all_netgroups:
% if len(ng.networks) > 0:
shared-network ${ng.name}
{
% for net in ng.networks:
% if net.enabled and net.ipv4_address:
	# Network ${net}
	subnet ${net.ipv4_network.network} netmask ${net.ipv4_network.netmask}
	{
		authoritative;
		option broadcast-address ${net.ipv4_network.broadcast};
		option subnet-mask ${net.ipv4_network.netmask};
		option domain-name "${net.domain}";
% if sum(ns.type_id == 1 for ns in net.services):
		option domain-name-servers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 1)};
% endif
% if sum(ns.type_id == 2 for ns in net.services):
		option netbios-node-type 8;
		option netbios-name-servers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 2)};
% else:
		option netbios-node-type 1;
% endif
% if sum(ns.type_id == 3 for ns in net.services):
		option time-servers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 3)};
		option ntp-servers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 3)};
% endif
% if sum(ns.type_id == 4 for ns in net.services):
		option routers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 4)};
% endif
% if sum(ns.type_id == 5 for ns in net.services):
		option slp-directory-agent false ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 5)};
% endif
% if net.ipv4_guest_start and net.ipv4_guest_end and (net.ipv4_guest_start <= net.ipv4_guest_end) and (net.ipv4_guest_end <= net.ipv4_network.numhosts):
		range ${net.ipv4_address + net.ipv4_guest_start} ${net.ipv4_address + net.ipv4_guest_end};
% endif
% if net.routing_table and len(net.routing_table.entries):
		option classless-route ${':'.join(itertools.chain.from_iterable(rte.dhcp_strings(net) for rte in net.routing_table.entries))};
		option ms-classless-route ${':'.join(itertools.chain.from_iterable(rte.dhcp_strings(net) for rte in net.routing_table.entries))};
% endif
	}
% endif
% endfor
}
% endif
% endfor
% for net in gen.all_nets:
% if net.enabled and net.ipv4_address:
# Network ${net}
subnet ${net.ipv4_network.network} netmask ${net.ipv4_network.netmask}
{
	authoritative;
	option broadcast-address ${net.ipv4_network.broadcast};
	option subnet-mask ${net.ipv4_network.netmask};
	option domain-name "${net.domain}";
% if sum(ns.type_id == 1 for ns in net.services):
	option domain-name-servers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 1)};
% endif
% if sum(ns.type_id == 2 for ns in net.services):
	option netbios-node-type 8;
	option netbios-name-servers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 2)};
% else:
	option netbios-node-type 1;
% endif
% if sum(ns.type_id == 3 for ns in net.services):
	option time-servers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 3)};
	option ntp-servers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 3)};
% endif
% if sum(ns.type_id == 4 for ns in net.services):
	option routers ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 4)};
% endif
% if sum(ns.type_id == 5 for ns in net.services):
	option slp-directory-agent false ${gen.host_iplist(ns.host for ns in net.services if ns.type_id == 5)};
% endif
% if net.ipv4_guest_start and net.ipv4_guest_end and (net.ipv4_guest_start <= net.ipv4_guest_end) and (net.ipv4_guest_end <= net.ipv4_network.numhosts):
	range ${net.ipv4_address + net.ipv4_guest_start} ${net.ipv4_address + net.ipv4_guest_end};
% endif
% if net.routing_table and len(net.routing_table.entries):
	option classless-route ${':'.join(itertools.chain.from_iterable(rte.dhcp_strings(net) for rte in net.routing_table.entries))};
	option ms-classless-route ${':'.join(itertools.chain.from_iterable(rte.dhcp_strings(net) for rte in net.routing_table.entries))};
% endif
}
% endif
% endfor

group
{
% if srv.has_param('option_time_offset'):
	option time-offset ${srv.get_param('option_time_offset', '0')};
% endif
% if srv.has_param('option_tz_string'):
	option pcode "${srv.get_param('option_tz_string')}";
% endif
% if srv.has_param('option_tz_name'):
	option tcode "${srv.get_param('option_tz_name')}";
% endif
% for host in gen.all_hosts_ipv4:
	# Host ID:   ${host.id}
	# Entity ID: ${host.entity_id}
	group
	{
		option host-name "${host}";
% for ipv4 in host.ipv4_addresses:
		host ${host.name}-${ipv4}
		{
			hardware ethernet ${ipv4.hardware_address};
			fixed-address ${ipv4};
		}
% endfor
	}
% endfor
}

