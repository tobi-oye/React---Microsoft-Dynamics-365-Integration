import axios from 'axios';

const baseApiUrl = `https://microagemb.api.crm3.dynamics.com/api/data/v9.2`;

const config = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export function getQuoteData(quoteId, token) {
  const queryString = `${baseApiUrl}/quotes?$select=quoteid,name,totallineitemamount,totalamount,quotenumber,totalamountlessfreight,freightamount,mca_gst,mca_pst&$expand=quote_details($select=extendedamount,quantity,baseamount,productname,quotedetailname,mca_quotelinestatus),mca_account($select=address1_country,address1_stateorprovince,address1_city,name),mca_contact($select=address1_country,fullname,address1_stateorprovince,address1_city),createdby($select=jobtitle,address1_telephone1,fullname,title,internalemailaddress)&$filter=(quoteid%20eq%20${quoteId})%20and%20(quote_details/any(o1:(o1/quotedetailid%20ne%20null)))%20and%20(mca_account/accountid%20ne%20null)%20and%20(mca_contact/contactid%20ne%20null)%20and%20(createdby/systemuserid%20ne%20null)`;
  return axios.get(queryString, config(token));
}

export function postQuoteLine(id, postBody, token) {
  return axios.patch(
    `${baseApiUrl}/quotedetails(${id})`,
    postBody,
    config(token)
  );
}

export function postQuoteLines(quoteLineRequests) {
  return Promise.all(quoteLineRequests);
}

export function batchUpdate(id, token) {
  const postBody = `
--batch_1629454869062 
Content-Type: application/http
Content-Transfer-Encoding: binary

GET /api/data/v9.0/quotes(${id})?$select=quotenumber,revisionnumber,_ownerid_value,name,_transactioncurrencyid_value,_pricelevelid_value,mca_departments,mca_locations,_mca_taxcode_value,_mca_quotesignatory_value,_opportunityid_value,_customerid_value,_mca_account_value,_mca_contact_value,shippingmethodcode,paymenttermscode,freighttermscode,billto_line1,billto_line2,billto_line3,billto_city,billto_stateorprovince,billto_postalcode,billto_country,billto_composite,willcall,shipto_line1,shipto_line2,shipto_line3,shipto_city,shipto_stateorprovince,shipto_postalcode,shipto_country,shipto_composite,totallineitemamount,discountpercentage,discountamount,totalamountlessfreight,freightamount,mca_gst,mca_pst,totaltax,totalamount,description,effectivefrom,mca_effectiveto,statuscode,effectiveto,statecode,quoteid HTTP/1.1
Prefer: odata.include-annotations="*"
Accept: application/json
MSCRM.ReturnNotifications: true
Content-Type: application/json
x-ms-app-id: 0cae619b-fcd4-eb11-bacc-000d3af4d69f
x-ms-app-name: msdynce_saleshub
x-ms-client-request-id: 0c941b67-eb0a-4d7f-9619-f33fac18955a
x-ms-client-session-id: 55fec5a0-b825-4485-ba02-d7cc55eef2d8
x-ms-correlation-id: a76369ec-3c38-4857-8ea1-45880c0f362b
x-ms-sw-objectid: a552359f-d283-4ab0-a6cb-91fe62f3b9bd
x-ms-sw-tenantid: f40eb0bd-8715-4c3a-9aa9-b8ab7326d29b
x-ms-user-agent: PowerApps-UCI/1.4.2995-2108.1 (Browser; AppName=msdynce_saleshub)
ClientHost: Browser

--batch_1629454869062
Content-Type: application/http
Content-Transfer-Encoding: binary

GET /api/data/v9.0/systemusers(21cef250-86e5-eb11-bacb-0022486d8263)/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@Target)?@Target=%7B%22%40odata.id%22%3A%22quotes(${id})%22%7D HTTP/1.1
Accept: application/json
Prefer: odata.include-annotations="*"
Content-Type: application/json
x-ms-app-id: 0cae619b-fcd4-eb11-bacc-000d3af4d69f
x-ms-app-name: msdynce_saleshub
x-ms-client-request-id: 7d7d72d1-386a-4afc-8ec6-e2fa108a5661
x-ms-client-session-id: 55fec5a0-b825-4485-ba02-d7cc55eef2d8
x-ms-correlation-id: a76369ec-3c38-4857-8ea1-45880c0f362b
x-ms-sw-objectid: a552359f-d283-4ab0-a6cb-91fe62f3b9bd
x-ms-sw-tenantid: f40eb0bd-8715-4c3a-9aa9-b8ab7326d29b
x-ms-user-agent: PowerApps-UCI/1.4.2995-2108.1 (Browser; AppName=msdynce_saleshub)
ClientHost: Browser

--batch_1629454869062
Content-Type: application/http
Content-Transfer-Encoding: binary

GET /api/data/v9.0/RetrieveProcessControlData(Target=@Target,ProcessId=@ProcessId,ProcessInstanceId=@ProcessInstanceId)?@Target=%7B%22%40odata.id%22%3A%22quotes(${id})%22%7D&@ProcessId=null&@ProcessInstanceId=null HTTP/1.1
Accept: application/json
Prefer: odata.include-annotations="*"
Content-Type: application/json
x-ms-app-id: 0cae619b-fcd4-eb11-bacc-000d3af4d69f
x-ms-app-name: msdynce_saleshub
x-ms-client-request-id: 6db6ece1-d1e6-4959-8063-1c241494952d
x-ms-client-session-id: 55fec5a0-b825-4485-ba02-d7cc55eef2d8
x-ms-correlation-id: a76369ec-3c38-4857-8ea1-45880c0f362b
x-ms-sw-objectid: a552359f-d283-4ab0-a6cb-91fe62f3b9bd
x-ms-sw-tenantid: f40eb0bd-8715-4c3a-9aa9-b8ab7326d29b
x-ms-user-agent: PowerApps-UCI/1.4.2995-2108.1 (Browser; AppName=msdynce_saleshub)
ClientHost: Browser

--batch_1629454869062--`;
  const batchConfig = {
    headers: {
      'Content-Type': 'multipart/mixed; boundary=batch_1629454869062',
      ...config(token).headers,
    },
  };
  return axios.post(`${baseApiUrl}/$batch`, postBody, batchConfig);
}

export function postApprovalInfo(postBody, token) {
  return axios.post(
    `${baseApiUrl}/mca_quotesignatories`,
    postBody,
    config(token)
  );
}

export function acquireToken() {
  // const queryString = 'https://quoteapprovalbackend.azurewebsites.net/token';
  const queryString = '/token';
  return axios.get(queryString);
}

export function writePDFFile(postBody) {
  // const queryString = 'https://quoteapprovalbackend.azurewebsites.net/token';
  const queryString = 'http://localhost:5000/writeFile';
  return axios.post(queryString, postBody);
}

export function getQuoteTemplates(token) {
  const queryString = `${baseApiUrl}/personaldocumenttemplates?$filter=(associatedentitytypecode eq 'quote')`;
  return axios.get(queryString, config(token));
}

export function getQuoteTemplatePDF(token, documentId, quoteId) {
  const queryString = `${baseApiUrl}/ExportPdfDocument`;
  const postBody = {
    EntityTypeCode: 1084,
    SelectedTemplate: {
      '@odata.type': 'Microsoft.Dynamics.CRM.personaldocumenttemplate',
      personaldocumenttemplateid: `${documentId}`,
    },
    SelectedRecords: `["{${quoteId.toUpperCase()}}"]`,
  };
  return axios.post(queryString, postBody, config(token));
}
