window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.style.display = "none"; 
      document.querySelector("nav.navbar").style.display = "flex"; // show navbar
      document.getElementById("main-content").style.display = "block"; 
    }, 1000);
  }, 3000);
});

