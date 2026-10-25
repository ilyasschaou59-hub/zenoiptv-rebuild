/*
 * ZenoIPTV shared site script (vanilla JavaScript, no dependencies)
 * Requires assets/js/config.js to be loaded first.
 *
 * Modules:
 *  - Mobile navigation
 *  - FAQ accordion
 *  - Pricing cards, "from" price, and structured data
 *  - Footer year
 */
(function () {
  "use strict";

  var config = window.ZENO_CONFIG || null;

  /* ------------------------------------------------------------
   * Helpers
   * ---------------------------------------------------------- */

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "text") {
          node.textContent = attrs[key];
        } else if (key === "className") {
          node.className = attrs[key];
        } else {
          node.setAttribute(key, attrs[key]);
        }
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function formatPrice(amount) {
    var whole = Math.round(amount * 100) % 100 === 0;
    try {
      return new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency: config.currency,
        minimumFractionDigits: whole ? 0 : 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (e) {
      return config.currency + " " + (whole ? amount : amount.toFixed(2));
    }
  }

  function deviceLabel(count) {
    return count + (count === 1 ? " device" : " devices");
  }

  function planOptionId(plan, duration) {
    return plan.id + "-" + duration.id;
  }

  /* ------------------------------------------------------------
   * Mobile navigation
   * ---------------------------------------------------------- */

  function initNav() {
    var toggle = $(".nav-toggle");
    var nav = $("#site-nav");
    if (!toggle || !nav) return;

    var desktop = window.matchMedia("(min-width: 960px)");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ------------------------------------------------------------
   * Accordion (FAQ)
   * Content is visible without JavaScript; panels are collapsed
   * only once this script runs.
   * ---------------------------------------------------------- */

  function initAccordions() {
    $all(".accordion-trigger").forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;

      trigger.setAttribute("aria-expanded", "false");
      panel.hidden = true;

      trigger.addEventListener("click", function () {
        var open = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
      });
    });
  }

  /* ------------------------------------------------------------
   * Pricing
   * ---------------------------------------------------------- */

  function buildCard(plan) {
    var options = config.durations.map(function (duration) {
      var price = plan.prices[duration.id];
      var message = "Hello, I would like to subscribe to the " + duration.label +
        " plan for " + deviceLabel(plan.devices) + " (€" + price + ").";
      var whatsappUrl = "https://wa.me/447577310143?text=" + encodeURIComponent(message);

      return el("li", { className: "price-option", id: planOptionId(plan, duration) }, [
        el("div", { className: "price-option__details" }, [
          el("span", { className: "price-option__duration", text: duration.label }),
          el("strong", { className: "price-option__amount", text: formatPrice(price) })
        ]),
        el("a", {
          className: "btn " + (plan.devices === 2 ? "btn--primary" : "btn--outline") + " btn--block price-option__link",
          href: whatsappUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Subscribe to the " + duration.label + " plan for " + deviceLabel(plan.devices) +
            " (" + formatPrice(price) + ") via WhatsApp",
          text: "Choose this plan"
        })
      ]);
    });

    return el("article", { className: "price-card" + (plan.devices === 2 ? " price-card--accent" : "") }, [
      el("h3", { className: "price-card__title", text: deviceLabel(plan.devices) }),
      el("p", { className: "price-card__tier", text: plan.tier }),
      el("ul", {
        className: "price-card__options",
        "aria-label": "Prices and WhatsApp links for " + deviceLabel(plan.devices)
      }, options)
    ]);
  }

  function initPricing() {
    if (!config) return;

    $all("[data-pricing]").forEach(function (root) {
      var cardsEl = $("[data-pricing-cards]", root);
      cardsEl.innerHTML = "";
      config.plans.forEach(function (plan) {
        cardsEl.appendChild(buildCard(plan));
      });
      root.classList.add("is-ready");
    });

    var lowest = null;
    config.plans.forEach(function (plan) {
      config.durations.forEach(function (d) {
        var price = plan.prices[d.id];
        if (!lowest || price < lowest.price) {
          lowest = { price: price, plan: plan, duration: d };
        }
      });
    });
    $all("[data-price-from]").forEach(function (node) {
      if (!lowest) return;
      node.textContent = "Plans from " + formatPrice(lowest.price) + " for " +
        lowest.duration.label + " (" + deviceLabel(lowest.plan.devices) + ").";
    });

    if ($("[data-pricing-jsonld]")) {
      var offers = [];
      config.plans.forEach(function (plan) {
        config.durations.forEach(function (d) {
          offers.push({
            "@type": "Offer",
            name: config.siteName + " – " + deviceLabel(plan.devices) + ", " + d.label,
            price: String(plan.prices[d.id]),
            priceCurrency: config.currency,
            url: config.siteUrl + "/pricing.html#" + planOptionId(plan, d)
          });
        });
      });
      var data = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: config.siteName + " IPTV subscription",
        serviceType: "IPTV subscription",
        url: config.siteUrl + "/pricing.html",
        provider: { "@type": "Organization", name: config.siteName, url: config.siteUrl + "/" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: config.siteName + " subscription plans",
          itemListElement: offers
        }
      };
      document.head.appendChild(el("script", { type: "application/ld+json", text: JSON.stringify(data) }));
    }
  }

  /* ------------------------------------------------------------
   * Footer year
   * ---------------------------------------------------------- */

  function initYear() {
    $all("[data-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  document.documentElement.classList.add("js");
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initAccordions();
    initPricing();
    initYear();
  });
})();
