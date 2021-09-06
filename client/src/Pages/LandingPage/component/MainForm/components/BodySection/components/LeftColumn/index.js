import { Image, useDisclosure } from '@chakra-ui/react';
import adobeLogo from '../../../../../../../../assets/pdf-logo.png';
import ApprovalForm from './components/ApprovalForm';
import QuoteForm from './components/QuoteForm';
import QuotePDFModal from './components/QuotePDFModal';
const LeftColumn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="LeftColumn">
      <div className="panel">
        <h1>1. Your Proposal</h1>
        <div className="silver-panel">
          <p>Download and review your PDF document here:</p>

          <Image
            className="adobe-logo"
            src={adobeLogo}
            alt="adobe icon"
            onClick={onOpen}
            cursor="pointer"
            boxSize="55px"
          />
          <QuotePDFModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </div>
      </div>
      <QuoteForm />
      <ApprovalForm />
    </div>
  );
};

export default LeftColumn;
