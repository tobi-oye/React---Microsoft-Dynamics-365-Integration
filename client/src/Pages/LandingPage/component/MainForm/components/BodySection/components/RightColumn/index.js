import { Button } from '@chakra-ui/react';

const RightColumn = () => {
  return (
    <div className="RightColumn">
      <div className="Panel">
        <div className="SilverRightPanel">
          <div className="Center">
            <h1 aria-hidden="true">Your Active Quotes:</h1>
          </div>
          <br />
          <div className="ActiveQuotes"></div>
        </div>
      </div>
      <div className="Panel">
        <div className="SilverRightPanel">
          <div className="Comments">
            <h1 aria-hidden="true">Comments or questions?</h1>
            <br />
            <input type="hidden" name="comment" value="add" />
            <input
              type="hidden"
              name="CommentSubject"
              value="Customer Comment or Question from bantale@relianceinfosystems.com"
            />
            <input type="hidden" name="CommentFirstName" value="Bantale" />
            <input type="hidden" name="CommentLastName" value="Babajide" />
            If you have any comments or questions about this quote, please feel
            free to enter it here. Your comment will be logged and emailed to
            wunmi.adedokun@microagemanitoba.com.
            <textarea
              rows="20"
              name="CommentContent"
              style={{ width: '100%', border: '1px solid black' }}
            ></textarea>
            <div className="submit-question">
              <Button type="submit" colorScheme="red">
                {' '}
                Submit Question / Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
