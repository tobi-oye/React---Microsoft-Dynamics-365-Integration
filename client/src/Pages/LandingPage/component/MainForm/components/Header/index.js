import { useContext } from 'react';
import headerImage from '../../../../../../assets/header1170.jpg';
import logo from '../../../../../../assets/logo.jpeg';
import requiredFields from '../../../../../../assets/required-fields-graphic.png';
import { MyContext } from '../../../../../../Context';

const Header = () => {
  const { quote } = useContext(MyContext);
  const { name, createdby, mca_account, mca_contact, quotenumber } = quote;

  return (
    <header>
      {Object.keys(quote).length ? (
        <>
          <div
            className="hero"
            style={{ backgroundImage: `url(${headerImage})` }}
          >
            <div className="logo-container">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <section className="intro-header">
            <div>
              <h1>{name}</h1>
            </div>

            <div>
              <h1>Quote #:{`${quotenumber}`}</h1>
            </div>
          </section>
          <section className="introduction">
            <div className="intro-left">
              <h1>Prepared For</h1>
              <p className="bold">{`${mca_account.name}`}</p>
              <p>
                {`${mca_contact.fullname}`}
                <br />
                {`${mca_contact.address1_city}, ${mca_contact.address1_stateorprovince},${mca_contact.address1_country}`}
              </p>
            </div>

            <div className="intro-mid">
              <p className="not-approved-msg">
                This quote has not been approed. Please review the terms, and
                sign below
              </p>
              <div>
                <img src={requiredFields} alt="req field" />
              </div>
            </div>
            <div className="intro-right">
              <h1>Prepared By</h1>

              <p className="bold">{`${createdby.fullname}`}</p>

              <p>
                {`${createdby.jobtitle !== null ? createdby.jobtitle : ''}`}
                <br />
                Direct: 204-779-1700 x223
                <br />
                {`${createdby.internalemailaddress}`}
              </p>
            </div>
          </section>{' '}
        </>
      ) : (
        'LOADING...'
      )}
    </header>
  );
};

export default Header;
