import {
  acquireToken,
  getQuoteData,
  getQuoteTemplates,
  postApprovalInfo,
  postQuoteLine,
  postQuoteLines,
} from '../api';
import TokenServiceInstance from '../services/Token';

export const RECEIVE_QUOTE_DATA = 'RECEIVE_QUOTE_DATA';
export const UPDATE_QUOTELINE_DATA = 'UPDATE_QUOTELINE_DATA';
export const RECEIVE_PDF = 'RECEIVE_PDF';

export const checkToken = () => {
  if (TokenServiceInstance.isTokenExpired()) {
    acquireToken().then(resp => {
      const token = resp.data.accessToken && resp.data.accessToken;
      return TokenServiceInstance.setToken(token);
    });
  }
};

export function receiveQuoteData(quoteData, quotePDFTemplates) {
  return {
    type: RECEIVE_QUOTE_DATA,
    quoteData,
    quotePDFTemplates,
  };
}
export function handleInitialQuoteData(dispatch, quoteId) {
  let token;
  checkToken();

  const quotePDFTemplates = async () => {
    let result = await getQuoteTemplates(TokenServiceInstance.getToken());
    return result && result.data.value;
  };

  token = TokenServiceInstance.getToken() && TokenServiceInstance.getToken();
  getQuoteData(quoteId, token)
    .then(resp => {
      const quoteData = resp.data.value[0];
      quotePDFTemplates().then(resp =>
        dispatch(receiveQuoteData(quoteData, resp))
      );
    })
    .catch(err => console.log(err));
}
export function updateQuoteLineQuantity(quoteLineData) {
  return {
    type: UPDATE_QUOTELINE_DATA,
    quoteLineData,
  };
}

export function updateQuoteLineQuantityOnCrm(quoteLineDataState) {
  checkToken();
  return postQuoteLines(
    quoteLineDataState.map(quoteLine =>
      postQuoteLine(
        quoteLine.quotedetailid,
        {
          quantity: quoteLine.quantity,
          mca_quotelinestatus: quoteLine['mca_quotelinestatus'],
        },
        TokenServiceInstance.getToken()
      )
    )
  );
}

export function postApprovalInfoAction(
  { email, purchaseOrderNo, initials, signatory },
  id
) {
  const approvalInfoPostBody = {
    mca_initials: initials,
    mca_purchaseordernumber: purchaseOrderNo,
    mca_emailaddress: email,
    mca_signature: signatory,
    mca_imagebase64string: signatory,
    mca_name: initials,
    mca_quoteid: id,
  };
  checkToken();
  return postApprovalInfo(
    approvalInfoPostBody,
    TokenServiceInstance.getToken()
  );
}
