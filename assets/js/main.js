/* Energiepraxis Kaiser – Interaktionen
   Menü · Scroll-Story · Preis-Umschalter · Video · Buchungsleiste */
(function () {
  "use strict";

  /* ---------- Menü (Tablet & Handy) ---------- */
  var burger = document.querySelector(".burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    var setMenu = function (open) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
      menu.hidden = !open;
    };
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { setMenu(false); burger.focus(); }
    });
    window.matchMedia("(min-width: 1101px)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- Scroll-Story: Vom Tropfen zur Diagnose ---------- */
  var steps = document.querySelectorAll(".step[data-step]");
  var layers = document.querySelectorAll(".layer[data-layer]");
  var dots = document.querySelectorAll(".stage .dot");
  var stepNum = document.querySelector("[data-step-num]");
  var current = 0;

  function activate(n) {
    if (n === current) return;
    current = n;
    steps.forEach(function (el, i) { el.classList.toggle("is-active", i === n); });
    layers.forEach(function (el, i) { el.classList.toggle("is-active", i === n); });
    dots.forEach(function (el, i) { el.classList.toggle("is-active", i === n); });
    if (stepNum) stepNum.textContent = String(n + 1);
  }

  if (steps.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(Number(entry.target.getAttribute("data-step")) || 0);
      });
    }, { rootMargin: window.matchMedia("(max-width: 760px)").matches ? "-62% 0px -28% 0px" : "-45% 0px -45% 0px" });
    steps.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Preise: Allein / Zu zweit ---------- */
  var toggleButtons = document.querySelectorAll(".toggle [data-persons]");
  var priceSlots = document.querySelectorAll("[data-solo][data-duo]");
  toggleButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var duo = btn.getAttribute("data-persons") === "2";
      toggleButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      priceSlots.forEach(function (el) {
        // geschützte Leerzeichen, damit Preise und Dauer nie umbrechen
        el.textContent = el.getAttribute(duo ? "data-duo" : "data-solo").replace(/ /g, " ");
      });
    });
  });

  /* ---------- Video: direkt in der Seite abspielen ---------- */
  var video = document.getElementById("ablauf-video");
  var playBtn = document.querySelector(".video__play");
  if (video && playBtn) {
    playBtn.addEventListener("click", function () {
      playBtn.hidden = true;
      video.preload = "auto";
      var p = video.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
      video.focus({ preventScroll: true });
    });
    video.addEventListener("play", function () { playBtn.hidden = true; });
  }

  /* ---------- Buchungsleiste (Handy): erst nach dem Hero zeigen ---------- */
  var bar = document.querySelector(".bookbar");
  var hero = document.querySelector(".hero");
  var footer = document.querySelector(".footer");
  if (bar && hero && "IntersectionObserver" in window) {
    var heroVisible = true, footerVisible = false;
    var update = function () { bar.classList.toggle("is-visible", !heroVisible && !footerVisible); };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; update(); }).observe(hero);
    if (footer) new IntersectionObserver(function (e) { footerVisible = e[0].isIntersecting; update(); }).observe(footer);
  }

  /* ---------- Jahr im Footer ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
