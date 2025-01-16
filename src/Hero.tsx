const Hero = ({ title, text }: { title: string; text: string }) => {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
};

export default Hero;
