// Centralized Google tag (gtag.js) loader for the entire site
// Loads GA4 and Google Ads IDs once and exposes window.gtag
(function () {
  if (window.__sendelGAInitialized) return;
  window.__sendelGAInitialized = true;

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Load the gtag library (use the GA4 ID for the script URL)
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-NG45EL8QDN';
  (document.head || document.documentElement).appendChild(gtagScript);

  // Initialize
  gtag('js', new Date());

  // Configure all tracking IDs here
  // GA4 measurement ID
  gtag('config', 'G-NG45EL8QDN');
  // Google Ads conversion ID (existing)
  gtag('config', 'AW-17637931008');
})();
