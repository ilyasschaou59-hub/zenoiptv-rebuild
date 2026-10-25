/*
 * ZenoIPTV shared site script (vanilla JavaScript, no dependencies)
 * Requires assets/js/config.js to be loaded first.
 *
 * Modules:
 *  - Mobile navigation
 *  - FAQ accordion
 *  - Pricing (cards, table, "from" price, structured data)
 *  - Contact form (composes an email in the visitor's mail app)
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

  function getDuration(id) {
    return config.durations.filter(function (d) { return d.id === id; })[0];
  }

  function deviceLabel(count) {
    return count + (count === 1 ? " device" : " devices");
  }

  function planOptionId(plan, duration) {
    return plan.id + "-" + duration.id;
  }

  function planOptionLabel(plan, duration) {
    return deviceLabel(plan.devices) + " · " + duration.label + " · " + formatPrice(plan.prices[duration.id]);
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

  function buildCard(plan, duration, orderBase) {
    var price = plan.prices[duration.id];
    var perMonth = price / duration.months;
    var monthlyTotal = plan.prices["1m"] ? plan.prices["1m"] * duration.months : null;
    var saving = monthlyTotal ? monthlyTotal - price : 0;

    var meta = [];
    if (duration.months > 1) {
      meta.push(el("li", { text: "Works out at " + formatPrice(Math.round(perMonth * 100) / 100) + " per month" }));
    }
    if (saving > 0) {
      meta.push(el("li", { text: "Save " + formatPrice(saving) + " compared with paying monthly" }));
    }
    meta.push(el("li", { text: "One payment for " + duration.label }));

    var href = orderBase + "?plan=" + encodeURIComponent(planOptionId(plan, duration));

    return el("article", { className: "price-card" + (plan.devices === 2 ? " price-card--accent" : "") }, [
      el("h3", { className: "price-card__title", text: deviceLabel(plan.devices) }),
      el("p", { className: "price-card__price" }, [
        el("span", { className: "price-card__amount", text: formatPrice(price) }),
        el("span", { className: "price-card__period", text: " / " + duration.label })
      ]),
      el("ul", { className: "price-card__meta" }, meta),
      el("a", {
        className: "btn " + (plan.devices === 2 ? "btn--primary" : "btn--outline") + " btn--block",
        href: href,
        text: "Order " + deviceLabel(plan.devices).toLowerCase()
      })
    ]);
  }

  function initPricing() {
    if (!config) return;

    $all("[data-pricing]").forEach(function (root) {
      var cardsEl = $("[data-pricing-cards]", root);
      var switcher = $("[data-pricing-switch]", root);
      var orderBase = root.getAttribute("data-order-url") || "contact.html";
      var current = config.featuredDuration;

      function render() {
        var duration = getDuration(current);
        cardsEl.innerHTML = "";
        config.plans.forEach(function (plan) {
          cardsEl.appendChild(buildCard(plan, duration, orderBase));
        });
        $all("button", switcher).forEach(function (btn) {
          btn.setAttribute("aria-pressed", String(btn.getAttribute("data-duration") === current));
        });
      }

      if (switcher) {
        config.durations.forEach(function (d) {
          var btn = el("button", { type: "button", className: "switch__btn", "data-duration": d.id, text: d.shortLabel });
          btn.addEventListener("click", function () {
            current = d.id;
            render();
          });
          switcher.appendChild(btn);
        });
      }

      render();
      root.classList.add("is-ready");
    });

    $all("[data-pricing-table]").forEach(function (table) {
      var thead = el("thead", null, [
        el("tr", null, [el("th", { scope: "col", text: "Plan" })].concat(
          config.durations.map(function (d) { return el("th", { scope: "col", text: d.label }); })
        ))
      ]);
      var tbody = el("tbody", null, config.plans.map(function (plan) {
        return el("tr", null, [el("th", { scope: "row", text: deviceLabel(plan.devices) })].concat(
          config.durations.map(function (d) { return el("td", { text: formatPrice(plan.prices[d.id]) }); })
        ));
      }));
      table.innerHTML = "";
      table.appendChild(thead);
      table.appendChild(tbody);
    });

    var lowest = null;
    config.plans.forEach(function (plan) {
      config.durations.forEach(function (d) {
        var perMonth = plan.prices[d.id] / d.months;
        if (!lowest || perMonth < lowest.perMonth) {
          lowest = { perMonth: perMonth, plan: plan, duration: d };
        }
      });
    });
    $all("[data-price-from]").forEach(function (node) {
      if (!lowest) return;
      node.textContent = "Plans from " + formatPrice(Math.round(lowest.perMonth * 100) / 100) +
        " per month (" + formatPrice(lowest.plan.prices[lowest.duration.id]) + " for " +
        lowest.duration.label + ", " + deviceLabel(lowest.plan.devices) + ").";
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
            url: config.siteUrl + "/contact.html?plan=" + planOptionId(plan, d)
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
   * Contact form
   * There is no server: the form composes a pre-filled email in
   * the visitor's own email app. It never reports that a message
   * was "sent", because the page cannot know that.
   * ---------------------------------------------------------- */

  function initContactForm() {
    var form = $("#contact-form");
    if (!form || !config) return;

    var planSelect = $("#contact-plan", form);
    var topicSelect = $("#contact-topic", form);
    var status = $("#contact-status");

    if (planSelect) {
      config.plans.forEach(function (plan) {
        var group = el("optgroup", { label: deviceLabel(plan.devices) });
        config.durations.forEach(function (d) {
          group.appendChild(el("option", { value: planOptionId(plan, d), text: planOptionLabel(plan, d) }));
        });
        planSelect.appendChild(group);
      });

      var params = new URLSearchParams(window.location.search);
      var requested = params.get("plan");
      if (requested && $("option[value='" + requested.replace(/[^a-z0-9-]/gi, "") + "']", planSelect)) {
        planSelect.value = requested;
        if (topicSelect) topicSelect.value = "order";
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      var topicText = topicSelect ? topicSelect.options[topicSelect.selectedIndex].text : "Enquiry";
      var planText = planSelect && planSelect.value ? planSelect.options[planSelect.selectedIndex].text : "Not selected";

      var subject = topicText + (planSelect && planSelect.value ? " – " + planText : "");
      var body = [
        "Name: " + data.get("name"),
        "Email: " + data.get("email"),
        "Topic: " + topicText,
        "Plan: " + planText,
        "Device(s): " + (data.get("device") || "Not specified"),
        "",
        String(data.get("message") || "")
      ].join("\n");

      var href = "mailto:" + config.supportEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (status) {
        status.hidden = false;
        status.innerHTML = "";
        status.appendChild(el("p", null, [
          el("strong", { text: "Your message has not been sent yet. " }),
          "We've asked your device to open your email app with a pre-filled message. Please review it there and press Send."
        ]));
        status.appendChild(el("p", null, [
          "If no email app opened, email us directly at ",
          el("a", { href: "mailto:" + config.supportEmail, text: config.supportEmail }),
          "."
        ]));
        status.focus();
      }

      window.location.href = href;
    });
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
    initContactForm();
    initYear();
  });
})();
