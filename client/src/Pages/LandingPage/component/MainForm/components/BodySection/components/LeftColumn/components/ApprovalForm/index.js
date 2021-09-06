import { Box, Button, Checkbox, Input, useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import ReactSignatureCanvas from 'react-signature-canvas';
import { postApprovalInfoAction } from '../../../../../../../../../../actions';
import { MyContext } from '../../../../../../../../../../Context';
import reqFieldIcon from '../../../../../../../../../../assets/required-fields-icon.png';

const ApprovalForm = () => {
  const { register, handleSubmit } = useForm();
  const { quote } = useContext(MyContext);
  let id = quote.quoteid;
  let sigPad = {};
  const clear = () => {
    return sigPad.clear();
  };

  const getCanvasRef = () => {
    return sigPad.toDataURL();
  };
  const toast = useToast();

  const onSubmit = data => {
    const approvalInfoPostBody = {
      ...data,
      signatory: getCanvasRef().split(',')[1],
    };
    return postApprovalInfoAction(approvalInfoPostBody, id)
      .then(
        resp =>
          resp &&
          toast({
            title: 'Approval Successful',
            description: 'Your Quote has been approved',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
      )
      .catch(err => {
        return (
          err &&
          toast({
            title: 'Error',
            description: 'We are unable to approve your quote',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        );
      });
  };
  return (
    <div className="panel">
      <div className="SilverHeader">
        <h1>3. Approval and E-Payment</h1>
      </div>
      <div className="SilverPanel">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="Approve">
            <p className="Approve">
              Taxes, shipping, handling and other fees may apply. We reserve the
              right to cancel orders arising from pricing or other errors.
            </p>
            <br />

            <div className="ApprovalFieldsBox">
              <div className="accept-terms">
                <img className="reqcheck" src={reqFieldIcon} alt="req check" />
                {/* <input type="checkbox" name="ApproveOrder" /> */}

                <Checkbox
                  {...register('agreement', {
                    required: true,
                  })}
                />
                <span className="Bold">I accept the above conditions</span>
              </div>
              <div id="FieldColumnLeft" className="FieldColumn">
                <p className="bold">E-Signature</p>
                <p className="SigPay">Your Initials:</p>
                <div className="Field">
                  <Input
                    className="FieldName"
                    type="text"
                    size="20"
                    {...register('initials', {
                      required: true,
                    })}
                  />
                  <img src={reqFieldIcon} className="reqcheck" alt="reqcheck" />
                </div>
                <p className="SigPay">Your Email Address:</p>
                <div className="Field">
                  <Input
                    className="FieldName"
                    type="text"
                    {...register('email', {
                      required: true,
                    })}
                    size="40"
                  />
                  <img src={reqFieldIcon} className="reqcheck" alt="reqcheck" />
                </div>
                <p className="SigPay">Purchase Order Number:</p>
                <div className="Field">
                  <Input
                    type="text"
                    {...register('purchaseOrderNo', {
                      required: true,
                    })}
                    size="40"
                  />
                </div>
              </div>

              <div className="Clear"></div>

              <div id="SignatureRow">
                <p className="SigPay">Sign Here:</p>
                <div className="Center">
                  <img
                    className="SignX"
                    src="https://www.orderporter.com/cust/jQuery/jSignature/x.png"
                    alt="reqcheck"
                  />
                  <div id="Signature">
                    <ReactSignatureCanvas
                      backgroundColor="gray"
                      penColor="black"
                      canvasProps={{
                        width: 500,
                        height: 200,
                        className: 'sigCanvas',
                      }}
                      ref={ref => {
                        sigPad = ref;
                      }}
                    />
                  </div>
                  <div className="ClearButton">
                    <Button onClick={clear} mt="20px">
                      Clear Signature
                    </Button>
                  </div>
                  <input
                    name="base64customersig"
                    type="hidden"
                    className="uniquesignatureclassName"
                  />
                </div>
              </div>
            </div>
            <p></p>
            <Box m="10px 0px">
              <p id="RequiredFieldsMessage">
                Please fill out the required fields above and check 'I accept
                the above conditions'
              </p>
            </Box>

            <div className="accept-order">
              <Button type="submit">Accept Order</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApprovalForm;
