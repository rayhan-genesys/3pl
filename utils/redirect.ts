/**
 * Utility functions for handling redirects and navigation
 */

/**
 * Get the target redirect path from query parameters with security validation
 * @returns The target path to redirect to after authentication
 */
export function getRedirectTarget(): string {
  const route = useRoute()
  const redirectPath = route.query.redirect as string

  // Validate redirect path for security
  if (redirectPath && redirectPath.startsWith('/') && !redirectPath.includes('//')) {
    return redirectPath
  }

  return '/'
}

/**
 * Create a login URL with redirect parameter
 * @param redirectPath - The path to redirect to after login
 * @returns The login URL with redirect parameter
 */
export function createLoginUrl(redirectPath?: string): string {
  if (redirectPath && redirectPath.startsWith('/') && !redirectPath.includes('//')) {
    return `/login?redirect=${encodeURIComponent(redirectPath)}`
  }

  return '/login'
}

/**
 * Validate if a redirect path is safe
 * @param path - The path to validate
 * @returns True if the path is safe for redirect
 */
export function isValidRedirectPath(path: string): boolean {
  return path.startsWith('/') && !path.includes('//')
}
