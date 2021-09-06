import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Box,
  useToast,
  Checkbox,
} from '@chakra-ui/react';

import { MyContext } from '../../../../../../../../../../Context';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  handleInitialQuoteData,
  updateQuoteLineQuantity,
  updateQuoteLineQuantityOnCrm,
} from '../../../../../../../../../../actions';
import { useRouteMatch } from 'react-router-dom';
import { acquireToken, batchUpdate } from '../../../../../../../../../../api';
import TokenServiceInstance from '../../../../../../../../../../services/Token';
const QuoteForm = () => {
  const { quote, dispatch } = useContext(MyContext);
  let id = useRouteMatch('/:id');
  const {
    quote_details,
    freightamount,
    totallineitemamount,
    mca_gst,
    mca_pst,
    totalamount,
  } = quote;
  const toast = useToast();
  const checkToken = () => {
    if (TokenServiceInstance.isTokenExpired()) {
      acquireToken().then(resp => {
        const token = resp.data.accessToken && resp.data.accessToken;
        return TokenServiceInstance.setToken(token);
      });
    }
  };

  const numberFormatHandler = number => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(number);
  };

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = ({ quoteLine }) => {
    id = id && id.params.id;
    checkToken();

    dispatch(updateQuoteLineQuantity(quoteLine));
    return updateQuoteLineQuantityOnCrm(quote_details)
      .then(resp => {
        if (resp.length) {
          toast({
            title: 'Quote Updated',
            description: "We've updated your quote for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .then(() => batchUpdate(id, TokenServiceInstance.getToken()))
      .then(() => handleInitialQuoteData(dispatch, id))
      .catch(
        err =>
          err.response &&
          toast({
            title: 'Error',
            description: 'We are unable to update your quote please try again',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
      );
  };

  useEffect(
    () =>
      quote_details.map((quoteDetail, index) => {
        const fieldName = `quoteLine[${index}]`;
        return setValue(`${fieldName}.quantity`, quoteDetail.quantity);
      }),
    [quote_details, setValue]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="panel">
        <div>
          <h1>2. Review and Select Your Options</h1>
        </div>
        <div>
          <p className="bold">Your Available Options</p>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Products
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <table>
                  <tbody>
                    <tr className="TabHeaderDetailRow">
                      <td className="ChBx tHeadFoot"></td>
                      <td className="Qty tHeadFoot">Qty</td>
                      <td className="tHead-Left">Description</td>
                    </tr>

                    {quote_details.map(({ quotedetailname }, index) => {
                      const fieldName = `quoteLine[${index}]`;
                      return (
                        <tr
                          className="TabDetailRow"
                          name={`${fieldName}`}
                          key={fieldName}
                        >
                          <td className="VMid Center White">
                            <Checkbox
                              colorScheme="red"
                              defaultIsChecked
                              {...register(`${fieldName}.checkBox`)}
                            />
                          </td>

                          <td className="Center Qty">
                            <fieldset>
                              <input
                                type="text"
                                size="4"
                                {...register(`${fieldName}.quantity`)}
                              />
                            </fieldset>
                          </td>

                          <td>{quotedetailname}</td>
                        </tr>
                      );
                    })}
                    <tr className="TabFooterDetailRow">
                      <td></td>
                      <td className="tHeadFoot Center">Subtotal</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Shipping
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <table className="">
                  <tbody>
                    <tr className="TabHeaderDetailRow">
                      <td className="tHeadFoot"></td>
                      <td className="Qty tHeadFoot">Qty</td>

                      <td className="tHead-Left-Shipping">Description</td>
                      <td className="tHeadFoot"></td>
                      <td className="tHeadFoot-Right">Price</td>
                      <td className="tHeadFoot"></td>
                      <td className="tHeadFoot-Right">Ext. Price</td>
                    </tr>
                    <tr className="TabDetailRow">
                      <td className="VMid Center White">
                        {/* <input type="checkbox" /> */}
                      </td>

                      <td className="Center Qty">1</td>

                      <td>Shipping</td>
                      <td className="tHeadFoot"></td>
                      <td className="Right">
                        {freightamount
                          ? numberFormatHandler(freightamount)
                          : numberFormatHandler(0)}
                      </td>
                      <td className="tHeadFoot"></td>
                      <td className="Right">
                        {freightamount
                          ? numberFormatHandler(freightamount)
                          : numberFormatHandler(0)}
                      </td>
                    </tr>

                    <tr className="TabFooterDetailRow">
                      <td className="tHeadFoot"></td>

                      <td className="tHeadFoot Center">Subtotal</td>

                      <td className="tHeadFoot"></td>
                      <td className="tHeadFoot Right"></td>
                      <td className="tHeadFoot Right">
                        {freightamount
                          ? numberFormatHandler(freightamount)
                          : numberFormatHandler(0)}
                      </td>
                      <td className="tHeadFoot"></td>
                      <td className="tHeadFoot Right">
                        {freightamount
                          ? numberFormatHandler(freightamount)
                          : numberFormatHandler(0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <div style={{ marginTop: '30px', width: '100%' }}>
            <table className="TotalsTable">
              <tbody>
                <tr className="TotalsHeaderRow">
                  <td className="check-box tHeadFoot"></td>
                  <td className="tHeadFoot-Left">Quote Summary</td>
                  <td className="Left"></td>
                  <td className="tHeadFoot-Right Price">One-Time</td>
                </tr>

                <tr>
                  <td className="TotalsTab">
                    {/* <input type="checkbox" /> */}
                  </td>
                  <td className="TotalsTab Left">Products Subtotal</td>
                  <td className="TotalsTab"></td>
                  <td className="TotalsTab Right">
                    {numberFormatHandler(totallineitemamount)}
                  </td>
                </tr>

                <tr>
                  <td className="TotalsTab">{/* <input type="" /> */}</td>
                  <td className="TotalsTab Left">Shipping Subtotal</td>
                  <td className="TotalsTab"></td>
                  <td className="TotalsTab Right">
                    {freightamount
                      ? numberFormatHandler(freightamount)
                      : numberFormatHandler(0)}
                  </td>
                </tr>
                <tr className="TotalsRow">
                  <td className=""></td>
                  <td>Subtotal</td>
                  <td className="Right"></td>
                  <td className="Right">
                    {numberFormatHandler(totallineitemamount + freightamount)}
                  </td>
                </tr>

                <tr className="TotalsRow">
                  <td className=""></td>
                  <td>GST</td>
                  <td className="Right"></td>
                  <td className="Right">{numberFormatHandler(mca_gst)}</td>
                </tr>
                <tr className="TotalsRow">
                  <td className=""></td>
                  <td>PST</td>
                  <td className="Right"></td>
                  <td className="Right">{numberFormatHandler(mca_pst)}</td>
                </tr>

                <tr className="TotalsRow">
                  <td className=""></td>
                  <td>Shipping</td>
                  <td className="Right"></td>
                  <td className="Right">
                    {freightamount
                      ? numberFormatHandler(freightamount)
                      : numberFormatHandler(0)}
                  </td>
                </tr>

                <tr className="TotalsRow TotalsFooterRow">
                  <td className="tHeadFoot"></td>
                  <td className="Bold Left tHeadFoot">Total Amount</td>
                  <td className="Right Bold tHeadFoot"></td>
                  <td className="Right Bold tHeadFoot">
                    {numberFormatHandler(totalamount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="UpdateButton">
          <div>
            <Button type="submit">Update Options</Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default QuoteForm;
