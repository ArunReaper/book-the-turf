/**
 * Google Analytics (GA4) utility
 * Provides functions to track page views and events
 */

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

/**
 * Initialize Google Analytics by loading the gtag script dynamically.
 * Call this once at app startup.
 */
export function initGA(): void {
    if (!GA_MEASUREMENT_ID) {
        console.warn('Google Analytics: VITE_GA_MEASUREMENT_ID is not set. Skipping GA initialization.');
        return;
    }

    // Prevent duplicate script loading
    if (document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
        return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
        window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false, // We'll manually send page views to track SPA routes
    });

    // Load the gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
}

/**
 * Track a page view (for SPA route changes)
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
    if (!GA_MEASUREMENT_ID || !window.gtag) {
        return;
    }
    window.gtag('event', 'page_view', {
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
    eventParams?: Record<string, string | number | boolean>
): void {
    if (!GA_MEASUREMENT_ID || !window.gtag) {
        return;
    }
    window.gtag('event', eventName, eventParams);
}