import "./LoginBanner.scss";
import loginBannerImg from '../../assets/img/login-banner3.png';

const LoginBanner = () => {
  return (
    <section className="login-banner">
      <img
        src={loginBannerImg}
        alt="Login banner image: Woman accessing e-commerce on mobile"
      />
      <div className="content">
        <h2>Bem-vindo(a)!</h2>
        <p>
          Transforme suas ideias em requisitos claros e gerenciáveis. Experimente
          o Lexhub e melhore a eficiência dos seus projetos de software. Comece
          agora!
        </p>
      </div>
    </section>
  );
};

export default LoginBanner;
