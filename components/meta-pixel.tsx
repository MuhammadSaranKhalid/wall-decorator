'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    fbq: any
  }
}

const PIXEL_ID = '745673697984087'

export function MetaPixel() {
  useEffect(() => {
    // Initialize pixel if not already done
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [])

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

// Helper functions for e-commerce tracking
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters)
  }
}

export const trackPurchase = (value: number, currency: string = 'USD') => {
  trackEvent('Purchase', { value, currency })
}

export const trackAddToCart = (contentName: string, value: number, currency: string = 'USD') => {
  trackEvent('AddToCart', { content_name: contentName, value, currency })
}

export const trackInitiateCheckout = (value: number, currency: string = 'USD') => {
  trackEvent('InitiateCheckout', { value, currency })
}

export const trackViewContent = (contentName: string, contentType: string = 'product') => {
  trackEvent('ViewContent', { content_name: contentName, content_type: contentType })
}
