import React from 'react';
import { Facebook, Youtube, Instagram, Linkedin } from 'lucide-react';
import './footer.component.scss';

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
          <a href="#">
            <Facebook size={24} />
          </a>
          <a href="#">
            <Youtube size={24} />
          </a>
          <a href="#">
            <Instagram size={24} />
          </a>
          <a href="#">
            <Linkedin size={24} />
          </a>
        </div>

        <div className="footer__links">
          <span>© 2025 Agromarket</span>
          <span>-</span>
          <a href="#">Məxfilik siyasəti</a>
          <span>-</span>
          <a href="#">Qaydalar və şərtlər</a>
          <span>-</span>
          <a href="#">Şikatlər kitabı</a>
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
          <img
            src="src\assets\images\footer\portugal2020.a482200275b3965bb42c72a0c9e6c791.webp"
            alt="Proderam 2020"
          />
          <img
            src="src\assets\images\footer\proderam.169ff67748fdaa2aee74b16ff8274452.webp"
            alt="Região Autónoma da Madeira"
          />
          <img
            src="src\assets\images\footer\ram.377737a8b98a774e321f5bcd7183840e.webp"
            alt="Portugal 2020"
          />
          <img
            src="src\assets\images\footer\ue.4a762b3e0a0a8abc686577db82ebd792.webp"
            alt="União Europeia"
          />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
