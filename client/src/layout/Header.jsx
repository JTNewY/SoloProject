import React from 'react';
import '../css/styles.css';  // Ensure you have a CSS file for custom styles

const Header = () => (
  <header className="masthead" style={{ backgroundImage: 'url(/img/home-bg.jpg)' }}>
    <div className="container position-relative px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <div className="site-heading">
            <h1>Star DEV Blog</h1>
            <span className="subheading">WelCome!</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
