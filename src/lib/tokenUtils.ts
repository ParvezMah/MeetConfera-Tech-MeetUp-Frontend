/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Safely extract the user ID from JWT token
 * Tries multiple property names for compatibility
 */
export const getHostIdFromToken = (): string | null => {
    try {
        // Try to get token from localStorage
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
            console.warn('No access token found in localStorage');
            return null;
        }

        // Parse JWT payload (without server verification - just for client-side extraction)
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        console.log('📋 JWT Payload:', payload);

        // Try multiple property names (different backends use different naming)
        const hostId = payload.id || payload.sub || payload.userId || payload.hostId;
        
        if (!hostId) {
            console.warn('⚠️ No hostId found in token payload. Available properties:', Object.keys(payload));
            return null;
        }

        console.log('✅ Host ID extracted:', hostId);
        return hostId;
    } catch (error: any) {
        console.error('❌ Failed to extract host ID from token:', error.message);
        return null;
    }
};

/**
 * Get token from localStorage or cookies
 */
export const getAccessToken = (): string | null => {
    // Try localStorage first
    const token = localStorage.getItem('accessToken');
    if (token) {
        return token;
    }

    // Fallback: Try to get from cookies
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'accessToken' || name === 'token') {
            return decodeURIComponent(value);
        }
    }

    return null;
};

/**
 * Check if token is valid (not expired)
 */
export const isTokenValid = (): boolean => {
    const token = getAccessToken();
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp ? payload.exp * 1000 : null;
        
        if (!expirationTime) {
            return true; // No expiration set
        }

        return Date.now() < expirationTime;
    } catch (error) {
        console.error('Failed to validate token:', error);
        return false;
    }
};
