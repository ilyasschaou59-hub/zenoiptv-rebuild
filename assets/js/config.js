/*
 * ZenoIPTV site configuration
 * ---------------------------------------------------------------
 * Edit prices here. Website price displays, WhatsApp order links,
 * the contact form plan list and pricing structured data use this file.
 *
 * - Prices are whole amounts in the currency below.
 * - Each plan must have a price for every duration id listed in
 *   `durations`.
 */
window.ZENO_CONFIG = {
  siteName: "ZenoIPTV",
  siteUrl: "https://zenoiptv.com",
  currency: "EUR",
  locale: "en-IE",

  durations: [
    { id: "1m", label: "1 Month", months: 1 },
    { id: "3m", label: "3 Months", months: 3 },
    { id: "6m", label: "6 Months", months: 6 },
    { id: "12m", label: "12 Months", months: 12 }
  ],

  plans: [
    { id: "1-device", devices: 1, tier: "Base plan", prices: { "1m": 20, "3m": 35, "6m": 45, "12m": 65 } },
    { id: "2-devices", devices: 2, tier: "Save approximately 10%", prices: { "1m": 36, "3m": 63, "6m": 81, "12m": 118 } },
    { id: "3-devices", devices: 3, tier: "Save approximately 15%", prices: { "1m": 51, "3m": 90, "6m": 115, "12m": 165 } },
    { id: "4-devices", devices: 4, tier: "Save approximately 20%", prices: { "1m": 64, "3m": 112, "6m": 144, "12m": 208 } }
  ]
};
