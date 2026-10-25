/*
 * ZenoIPTV site configuration
 * ---------------------------------------------------------------
 * Edit prices here. Every price shown on the website (homepage,
 * pricing page, contact form plan list, pricing structured data)
 * is generated from this file. No HTML changes are needed.
 *
 * - Prices are whole amounts in the currency below.
 * - Each plan must have a price for every duration id listed in
 *   `durations`.
 * - Set `featuredDuration` to the duration selected by default.
 */
window.ZENO_CONFIG = {
  siteName: "ZenoIPTV",
  siteUrl: "https://zenoiptv.com",
  supportEmail: "support@zenoiptv.com",

  currency: "EUR",
  locale: "en-IE",

  durations: [
    { id: "1m", label: "1 month", shortLabel: "Monthly", months: 1 },
    { id: "3m", label: "3 months", shortLabel: "3 months", months: 3 },
    { id: "6m", label: "6 months", shortLabel: "6 months", months: 6 },
    { id: "12m", label: "12 months", shortLabel: "Yearly", months: 12 }
  ],

  featuredDuration: "1m",

  plans: [
    { id: "1-device", devices: 1, prices: { "1m": 20, "3m": 35, "6m": 45, "12m": 65 } },
    { id: "2-devices", devices: 2, prices: { "1m": 36, "3m": 63, "6m": 81, "12m": 118 } },
    { id: "3-devices", devices: 3, prices: { "1m": 51, "3m": 90, "6m": 115, "12m": 165 } },
    { id: "4-devices", devices: 4, prices: { "1m": 64, "3m": 112, "6m": 144, "12m": 208 } }
  ]
};
