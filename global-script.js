const body = document.querySelector("body");
if (body) {

  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  const currentRoute = segments[0] || '';

  console.log('Current route:', currentRoute);

  const footerHTML = `
    <footer>
        <div class="container footer-content">
            <div class="footer-left">
                Designed and Developed by Phuong Tran
            </div>
            <div class="footer-center">
                Copyright © 2025 PT
            </div>
            <div class="footer-right social-links">
                <a href="#" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="#" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
    </footer>
`;

  body.insertAdjacentHTML('beforeend', footerHTML);

  const headerHTML = `<header class="navbar">
    <div class="container">
      <div class="btns-container">
        <a href="../home/index.html" class="logo highlight-purple">PT</a>
        <div class="toggle-nav-btn">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
      </div>
      <nav class="navbar-links hide">
        <ul>
          <li class="${currentRoute == "home" ? "active" : ""}"><a href="../home/index.html"><i class="fas fa-home"></i>Home</a></li>
          <li class="${currentRoute == "about" ? "active" : ""}"><a href="../about/index.html"><i class="fas fa-user"></i>About</a></li>
          <li class="${currentRoute == "project" ? "active" : ""}"><a href="../project/index.html"><i class="fas fa-briefcase"></i>Projects</a></li>
          <li class="${currentRoute == "contact-me" ? "active" : ""}"><a href="../contact-me/index.html"><i class="fa-solid fa-address-book"></i>Contact Me</a></li>
          <li class="${currentRoute == "cv" ? "active" : ""}"><a href="../cv/index.html"><i class="fas fa-file-alt"></i>Resume</a></li>
        </ul>
      </nav>
    </div>
  </header>`
  body.insertAdjacentHTML('afterbegin', headerHTML);
}

const menuBtn = document.getElementsByClassName("toggle-nav-btn")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

if (menuBtn) {
  if (menuBtn.classList.contains("showMenu")) {
    menuBtn.classList.remove("showMenu")
    navbarLinks.classList.add("hide")
  }

  menuBtn.addEventListener("click", () => {
    if (menuBtn.classList.contains("showMenu")) {
      menuBtn.classList.remove("showMenu")
      navbarLinks.classList.add("hide")
    } else {
      menuBtn.classList.add("showMenu")
      navbarLinks.classList.remove("hide")
    }
  });
}
