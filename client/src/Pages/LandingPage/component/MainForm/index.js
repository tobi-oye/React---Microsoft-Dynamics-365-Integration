import './index.css';
import Header from './components/Header';
import BodySection from './components/BodySection';

const MainForm = () => {
  return (
    <div className="container">
      <div className="main-body">
        <Header />
        <BodySection />
      </div>
    </div>
  );
};

export default MainForm;
