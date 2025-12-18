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

  // --- Marketplace outbound link analytics ---
  // Tracks clicks to Atlassian Marketplace across the site without blocking navigation.
  // Event schema (GA4 custom event: "marketplace_click"):
  // {
  //   link_url,           // absolute URL clicked
  //   link_text,          // visible text or aria-label
  //   cta_role,           // from data-cta or inferred (e.g., 'nav', 'hero', 'footer')
  //   app,                // just-search | just-vision | just-blame | root | other
  //   page_path,          // current page path
  //   page_title,         // current document.title
  //   target,             // anchor target attribute
  //   timestamp           // ISO string
  // }
  try {
    if (!window.__sendelGAEventsInitialized) {
      window.__sendelGAEventsInitialized = true;

      var MARKETPLACE_HOST = 'marketplace.atlassian.com';

      function getAppFromPath(pathname) {
        if (/\/just-search\//.test(pathname)) return 'just-search';
        if (/\/just-vision\//.test(pathname)) return 'just-vision';
        if (/\/just-blame\//.test(pathname)) return 'just-blame';
        if (pathname === '/' || /\/index\.html$/.test(pathname)) return 'root';
        return 'other';
      }

      function getClosestAnchor(el) {
        while (el && el !== document && el !== window) {
          if (el.tagName && el.tagName.toLowerCase() === 'a') return el;
          el = el.parentNode;
        }
        return null;
      }

      function isMarketplaceLink(a) {
        if (!a || !a.href) return false;
        try {
          var url = new URL(a.href, window.location.href);
          return url.hostname === MARKETPLACE_HOST || url.hostname.endsWith('.atlassian.com') && url.hostname.indexOf('marketplace') !== -1;
        } catch (e) {
          return false;
        }
      }

      function inferCtaRole(a) {
        if (!a) return undefined;
        if (a.dataset && a.dataset.cta) return a.dataset.cta;
        var cls = (a.className || '').toString();
        if (/nav|menu|navbar|header/i.test(cls)) return 'nav';
        if (/btn|button|primary|secondary|cta/i.test(cls)) return 'button';
        // try section context
        var parent = a.closest && a.closest('header, footer, section, nav');
        if (parent) {
          if (parent.tagName === 'HEADER' || parent.tagName === 'NAV') return 'nav';
          if (parent.tagName === 'FOOTER') return 'footer';
          if (parent.tagName === 'SECTION') return parent.id ? 'section:' + parent.id : 'section';
        }
        return undefined;
      }

      function handleClick(ev) {
        var a = getClosestAnchor(ev.target);
        if (!isMarketplaceLink(a)) return;

        var url;
        try { url = new URL(a.href, window.location.href).toString(); } catch (e) { url = a.href; }
        var text = (a.innerText || a.textContent || '').trim();
        if (!text && a.getAttribute) text = a.getAttribute('aria-label') || '';

        var params = {
          link_url: url,
          link_text: text,
          cta_role: inferCtaRole(a),
          app: getAppFromPath(window.location.pathname),
          page_path: window.location.pathname,
          page_title: document.title,
          target: a.getAttribute ? (a.getAttribute('target') || '') : '',
          timestamp: new Date().toISOString(),
          transport_type: 'beacon'
        };

        try { gtag('event', 'marketplace_click', params); } catch (e) { /* no-op */ }
      }

      // Use capture phase to catch early, but don't block navigation
      document.addEventListener('click', handleClick, true);
    }
  } catch (e) {
    // Swallow any analytics setup errors to avoid impacting UX
  }
})();
