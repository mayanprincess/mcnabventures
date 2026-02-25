/**
 * Shared markdown rendering utilities.
 *
 * decodeHtml    — decodes HTML entities from WP wysiwyg/REST output
 * markdownComponents        — base preset   (p=plain span, strong=turquoise)
 * markdownComponentsNavy    — navy preset   (p=navy span, strong=turquoise)
 * markdownComponentsRich    — rich preset   (p=navy/70, strong=turquoise, ul/ol/li with arrow)
 */

/**
 * Decodes HTML entities (e.g. &amp; &#8217;) returned by the WP REST API.
 * Falls back to the raw string in SSR / Edge environments where the DOM is unavailable.
 */
export function decodeHtml(html) {
  if (!html) return '';
  if (typeof window === 'undefined') return html;
  const el = document.createElement('textarea');
  el.innerHTML = html;
  return el.value;
}

/** Base preset — used by GetHighlights, WhoWeAre */
export const markdownComponents = {
  p: ({ children }) => <span>{children}</span>,
  strong: ({ children }) => (
    <span className="font-fustat-medium text-turquoise">{children}</span>
  ),
};

/** Navy preset — used by MissionStatement */
export const markdownComponentsNavy = {
  p: ({ children }) => <span className="text-navy">{children}</span>,
  strong: ({ children }) => (
    <span className="font-fustat-medium text-turquoise">{children}</span>
  ),
};

/** Rich preset — used by GroupSnapshot (includes list elements with arrow style) */
export const markdownComponentsRich = {
  p: ({ children }) => <span className="text-navy/70">{children}</span>,
  strong: ({ children }) => (
    <span className="font-fustat-medium text-turquoise">{children}</span>
  ),
  ul: ({ children }) => <ul className="mt-4 space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 space-y-2">{children}</ol>,
  li: ({ children }) => (
    <li className="flex items-start gap-3 ml-2">
      <span className="text-turquoise flex-shrink-0" style={{ marginTop: '-2px' }}>→</span>
      <span className="text-navy/70">{children}</span>
    </li>
  ),
};
