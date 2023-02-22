const Header = () => {
  return (
    <div className="grid grid-cols-3 items-center justify-items-center p-4">
      <h1 className="text-3xl lg:text-7xl md:text-5xl sm:xl">Where's Waldo?</h1>
      <div className="flex justify-around items-center w-full h-full">
        <div>img One</div>
        <div>img Two</div>
        <div>img Three</div>
      </div>
      <div>
        <h2>Timer</h2>
      </div>
    </div>
  );
};

export default Header;
