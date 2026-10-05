/* Dokani site — bilingual (বাংলা / English) toggle + small helpers. */
(function () {
  "use strict";

  var KEY = "dokani-lang";
  var SUPPORTED = ["bn", "en"];

  function normalise(value) {
    if (!value) return null;
    value = String(value).toLowerCase();
    if (SUPPORTED.indexOf(value) !== -1) return value;
    // "bn-BD" / "en-US" -> base tag
    var base = value.split("-")[0];
    if (SUPPORTED.indexOf(base) !== -1) return base;
    return null;
  }

  function pickInitial() {
    try {
      var saved = normalise(window.localStorage.getItem(KEY));
      if (saved) return saved;
    } catch (e) {
      /* localStorage unavailable (private mode) — fall through */
    }
    return normalise(document.documentElement.lang) || "bn";
  }

  function store(lang) {
    try {
      window.localStorage.setItem(KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  /* Elements carry both translations:
       <h1 data-bn="…" data-en="…">
     or a placeholder + inline variants:
       <span data-bn="…" data-en="…"></span>
     Attribute-only pairs fall back to whichever one exists. */
  function apply(root, lang) {
    var other = lang === "bn" ? "en" : "bn";
    var nodes = root.querySelectorAll("[data-bn],[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var text = el.getAttribute("data-" + lang);
      if (text === null) text = el.getAttribute("data-" + other);
      if (text === null) continue;
      if (el.hasAttribute("data-attr")) {
        el.setAttribute(el.getAttribute("data-attr"), text);
      } else {
        el.textContent = text;
      }
    }
  }

  function setLang(lang, persist) {
    lang = normalise(lang) || "bn";
    document.documentElement.lang = lang;
    apply(document, lang);

    var buttons = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute(
        "aria-pressed",
        buttons[i].getAttribute("data-set-lang") === lang ? "true" : "false"
      );
    }

    var titleKey = document.body && document.body.getAttribute("data-title-" + lang);
    if (titleKey) document.title = titleKey;

    if (persist !== false) store(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setLang(pickInitial(), false);

    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-set-lang]") : null;
      if (btn) setLang(btn.getAttribute("data-set-lang"), true);
    });
  });
})();
