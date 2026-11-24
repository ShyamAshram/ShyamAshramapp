export const URL_DOMAIN_HOST =
  import.meta.env.VITE_URL_DOMAIN_HOST?.replace(/\/+$/, '') ?? '';

export const HOST_URL = URL_DOMAIN_HOST;

export const VITE_STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '';