import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { checkToken } from '../../../../../../../../../../actions';
import { getQuoteTemplatePDF } from '../../../../../../../../../../api';
import { MyContext } from '../../../../../../../../../../Context';
import TokenServiceInstance from '../../../../../../../../../../services/Token';
// import fs from 'fs-extra';
const QuotePDFModal = ({ isOpen, onOpen, onClose }) => {
  const { quote, pdfTemplates } = useContext(MyContext);
  const exportQuotePDFHandler = (documentId, name) => {
    const quoteId = quote.quoteid;
    checkToken();
    const token = TokenServiceInstance.getToken();
    getQuoteTemplatePDF(token, documentId, quoteId).then(resp => {
      const PdfFile = resp.data.PdfFile && resp.data.PdfFile;
      const bitmap = Buffer.from(PdfFile, 'base64');
      const file = new Blob([bitmap], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select your Quote PDF</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <OrderedList spacing={3}>
            {pdfTemplates &&
              pdfTemplates.map(({ personaldocumenttemplateid, name }) => (
                <ListItem
                  key={personaldocumenttemplateid}
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  onClick={() =>
                    exportQuotePDFHandler(personaldocumenttemplateid, name)
                  }
                >
                  {name}
                </ListItem>
              ))}
          </OrderedList>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuotePDFModal;
