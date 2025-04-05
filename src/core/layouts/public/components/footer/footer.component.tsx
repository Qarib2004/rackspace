import { Facebook, Youtube, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './footer.component.scss';
import portugal2020 from '../../../../../assets/images/footer/portugal2020.a482200275b3965bb42c72a0c9e6c791.webp';
import proderam from '../../../../../assets/images/footer/proderam.169ff67748fdaa2aee74b16ff8274452.webp';
import ram from '../../../../../assets/images/footer/ram.377737a8b98a774e321f5bcd7183840e.webp';
import ue from '../../../../../assets/images/footer/ue.4a762b3e0a0a8abc686577db82ebd792.webp';

const Footer = () => {
  return (
    <div style={{ background: '#FFFFFF', marginTop: '8rem' }}>
      <section className="newsletter">
        <div className="newsletter__title--div">
          <h2 className="newsletter__title">Bülletenimizə abunə olun</h2>
        </div>
        <div>
          <form className="newsletter__form">
            <input type="email" placeholder="Email" />
            <button type="submit">Abunə ol</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__social">
          <Link to="#">
            <Facebook size={24} />
          </Link>
          <Link to="#">
            <Youtube size={24} />
          </Link>
          <Link to="#">
            <Instagram size={24} />
          </Link>
          <Link to="#">
            <Linkedin size={24} />
          </Link>
        </div>

        <div className="footer__links">
          <span>© 2025 LankMark</span>
          <span>-</span>
          <Link to="/">Məxfilik siyasəti</Link>
          <span>-</span>
          <Link to="/">Qaydalar və şərtlər</Link>
          <span>-</span>
          <Link to="/">Şikayətlər kitabı</Link>
        </div>

        <p className="footer__description">
          Agromarket kənd təsərrüfatı məhsullarının onlayn satış platformasıdır
          və istehsalçılara təsərrüfatlarını tərk etmədən öz müştərilərinə
          çatmağa imkan verən satış kanalından faydalanmağa imkan verir. Onun
          əsas məqsədləri kiçik istehsalçılara məhsullarını satmaq imkanı
          vermək, qida tullantıları ilə mübarizə və ənənəvi terrasların ahəngdar
          mənzərəsini təbliğ etmək, fermerləri yaşayış vasitəsi kimi kənd
          təsərrüfatına sərmayə qoymağa həvəsləndirməkdir.
        </p>

        <div className="footer__sponsors">
          <img src={portugal2020} alt="Portugal 2020" />
          <img src={proderam} alt="Proderam" />
          <img src={ram} alt="RAM" />
          <img src={ue} alt="União Europeia" />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
