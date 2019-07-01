frappe.ui.form.on('Sales Invoice', {
    customer: function (frm) {
        if (frm.doc.customer != null) {
            frm.set_value('customer_optics', '')
            cur_frm.fields_dict['customer_optics'].get_query = function (doc, cdt, cdn) {
                return {
                    filters: {
                        'customer': doc.customer,
                        'docstatus': 0
                    }
                }
            }
        }
    },
    customer_optics: function (doc, dt, dn) {
        var html = ''
        if (cur_frm.doc.customer_optics != null) {
            cur_frm.set_value('optics_detail', '')
            frappe.call({
                method: "hamdan.hamdan.doctype.customer_optics.customer_optics.get_optics_detail",
                args: {
                    customer_optics: cur_frm.doc.customer_optics
                },
                callback: function (r) {
                    if (!r.message) {
                        html = `There is no optics detail  ` + cur_frm.doc.customer_optics
                        cur_frm.set_value('optics_detail', html)
                    }
                    const optics_data = r.message[0];
                    if (optics_data) {
                        if (optics_data.optic_type == 'Glasses') {
                            html = `
                                <table class="table table-bordered" cellpadding="0" >
                                <tr>
                                <th>${optics_data.optic_type}</th>
                                <th>SPH</th> 
                                <th>CYL</th>
                                <th>AXIS</th>
                                <th>PRISM</th>
                                <th>VA</th>
                              </tr>
                                    <tbody>
                                       <tr><td><span style="font-weight: bold">العين اليمنى</br>Right Eye</td>
                                       <td>${optics_data.re_sph|| ""}</td>
                                       <td>${optics_data.re_cyl|| ""}</td>
                                       <td>${optics_data.re_axis|| ""}</td>
                                       <td>${optics_data.re_prism|| ""}</td>
                                       <td>${optics_data.re_va|| ""}</td></tr>
                                       <tr><td><span style="font-weight: bold">العين اليسرى</br>Left Eye</td>
                                       <td>${optics_data.le_sph|| ""}</td>
                                       <td>${optics_data.le_cyl|| ""}</td>
                                       <td>${optics_data.le_axis|| ""}</td>
                                       <td>${optics_data.le_prism|| ""}</td>
                                       <td>${optics_data.le_va|| ""}</td></tr>
                               <tr>
                                <td><span style="font-weight: bold">Add.</td>
                                <td colspan="2">${optics_data.add|| ""}</td>
                                <td><span style="font-weight: bold">I.P.D</td>
                                <td colspan="2">${optics_data.ipd|| ""}</td></tr>
                                </tr>                               
                                     </tbody>
                                </table>`
                        } else {
                            html = `
                            <table class="table table-bordered table-sm">
                            <tr>
                            <th>${optics_data.optic_type}</th>
                            <th>BRAND</th> 
                            <th>B.C.</th>
                            <th>POWER</th>
                            <th>DIA</th>
                            <th>TINT</th>
                          </tr>
                                <tbody>
                                   <tr><td><span style="font-weight: bold">العين اليمنى</br>Right Eye</td>
                                   <td>${optics_data.re_brand|| ""}</td>
                                   <td>${optics_data.re_bc|| ""}</td>
                                   <td>${optics_data.re_power|| ""}</td>
                                   <td>${optics_data.re_dia|| ""}</td>
                                   <td>${optics_data.re_tint|| ""}</td></tr>
                                   <tr><td><span style="font-weight: bold">العين اليسرى</br>Left Eye</td>
                                   <td>${optics_data.le_brand|| ""}</td>
                                   <td>${optics_data.le_bc|| ""}</td>
                                   <td>${optics_data.le_power|| ""}</td>
                                   <td>${optics_data.le_dia || ""}</td>
                                   <td>${optics_data.le_tint || ""}</td></tr>
                                </tbody>
                            </table>       
                            `
                        }
                        cur_frm.set_value('optics_detail', html)
                    }
                }
            });
        }
    },
    validate: function (doc, dt, dn) {
var i=0;
        for (i = 0; i < cur_frm.doc.items.length; i++) {
            if (Object.keys(JSON.parse(cur_frm.doc.items[i].item_tax_rate)).length != 0) {
                var itemtaxrate = Object.values(JSON.parse(cur_frm.doc.items[i].item_tax_rate))[0];
                cur_frm.doc.items[i].line_tax_rate = itemtaxrate;
                cur_frm.doc.items[i].line_tax_amount = (cur_frm.doc.items[i].amount * itemtaxrate) / 100;
                cur_frm.doc.items[i].line_total_tax_amount = cur_frm.doc.items[i].line_tax_amount + cur_frm.doc.items[i].amount;
            } else {
                cur_frm.doc.items[i].line_tax_rate = 0;
                cur_frm.doc.items[i].line_tax_amount = 0.0;
            }
        }
    }
})