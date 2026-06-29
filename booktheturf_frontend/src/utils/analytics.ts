/**
 * Google Tag Manager (GTM) utility
 * Provides functions to push events to the dataLayer for GTM to pick up.
 * GTM then forwards these to GA4 (and any other tags configured in the container).
 */

declare global {
    interface Window {
        dataLayer: unknown[];
    }
}

/**
 * Push a custom event to the GTM dataLayer
 */
export function pushEvent(event: string, data?: Record<string, unknown>): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event,
        ...data,
    });
}

/**
 * Track a page view (for SPA route changes).
 * GTM should be configured with a Custom Event trigger listening for 'spa_page_view'.
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
    pushEvent('spa_page_view', {
        page_path: pagePath,
        page_title: pageTitle || document.title,
        page_location: window.location.origin + pagePath,
    });
}

/**
 * Track a custom event
 */
export function trackEvent(
    eventName: string,
    eventParams?: Record<string, unknown>
): void {
    pushEvent(eventName, eventParams);
}