import image from "../image/image.webp";

const Header = () => {
  return (
    <div className="app-header">
      <img src={image} alt="logo" />

      <h1>QuizHub</h1>
    </div>
  );
};

export default Header;
