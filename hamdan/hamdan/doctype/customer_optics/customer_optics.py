# -*- coding: utf-8 -*-
# Copyright (c) 2018, GreyCube Technologies and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class CustomerOptics(Document):
	pass
@frappe.whitelist()
def get_optics_detail(customer_optics):
	return frappe.db.sql("""select optic_type,re_sph,le_sph,`add`,re_cyl,le_cyl,re_axis,le_axis,ipd,re_prism,le_prism,re_va,le_va,re_brand,le_brand,re_bc,le_bc,re_power,le_power,re_dia,le_dia,re_tint,le_tint from `tabCustomer Optics` where docstatus=0 and name =%s""" ,customer_optics, as_dict=1)
