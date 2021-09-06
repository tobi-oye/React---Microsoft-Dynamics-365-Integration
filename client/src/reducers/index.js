import { RECEIVE_QUOTE_DATA, UPDATE_QUOTELINE_DATA } from '../actions';

function reducer(state, action) {
  switch (action.type) {
    case RECEIVE_QUOTE_DATA:
      return {
        ...state,
        quote: { ...action.quoteData },
        pdfTemplates: action.quotePDFTemplates,
      };
    case UPDATE_QUOTELINE_DATA:
      let quoteLineData = action.quoteLineData;
      let newQuoteDetailState = [...state.quote.quote_details];
      const added = 100000000,
        removed = 100000001;
      for (let i = 0; i < quoteLineData.length; i++) {
        if (quoteLineData[i].checkBox === true) {
          let quoteLineTobeUpdated = newQuoteDetailState[i];
          quoteLineTobeUpdated.quantity = Number(quoteLineData[i].quantity);
          quoteLineTobeUpdated['mca_quotelinestatus'] = added;
        } else {
          let quoteLineTobeUpdated = newQuoteDetailState[i];
          quoteLineTobeUpdated['mca_quotelinestatus'] = removed;
        }
      }
      return {
        ...state,
        quote_details: newQuoteDetailState,
      };
    default:
      return state;
  }
}

export default reducer;
