/**
 * Check the device type based on the user agent string.
 * @param userAgent - The user agent string to check.
 * @returns "MOBILE" if the device is a mobile device, "DEFAULT" otherwise.
 */
export function checkDevice(userAgent: undefined): "DEFAULT";
export function checkDevice(userAgent: string): "MOBILE" | "DEFAULT";
export function checkDevice(userAgent: null): "DEFAULT";
export function checkDevice(userAgent?: string | null): "MOBILE" | "DEFAULT" {
  if (!userAgent) return "DEFAULT";
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent) ? "MOBILE" : "DEFAULT";
}