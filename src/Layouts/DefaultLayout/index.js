import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Defaultlayout.scss";

function DefaultLayout({ children }) {
  return (
    <div className="defaultlayout__container">
      <Header />

      <div className="defaulayout__main--content">{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
