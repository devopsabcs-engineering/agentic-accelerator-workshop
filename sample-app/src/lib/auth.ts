import crypto from "crypto";

// INTENTIONAL-VULNERABILITY: Hardcoded JWT secret in source code
const JWT_SECRET = "super-secret-jwt-key-do-not-share-2024";

// INTENTIONAL-VULNERABILITY: Hardcoded API key
const API_KEY = "sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234";

export function hashPassword(password: string): string {
  // INTENTIONAL-VULNERABILITY: MD5 password hashing - cryptographically broken
  // Should use bcrypt, scrypt, or Argon2 with proper salt
  return crypto.createHash("md5").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  // INTENTIONAL-VULNERABILITY: Timing-safe comparison not used
  return hashPassword(password) === hash;
}

export async function authenticate(
  username: string,
  password: string
): Promise<{ token: string } | null> {
  // INTENTIONAL-VULNERABILITY: No rate limiting on authentication
  // Should implement exponential backoff or account lockout after N failures
  // INTENTIONAL-VULNERABILITY: No input validation on username/password

  const passwordHash = hashPassword(password);

  // Simulated user lookup
  const user = { id: "1", username, passwordHash: passwordHash };

  if (user && verifyPassword(password, user.passwordHash)) {
    // INTENTIONAL-VULNERABILITY: Weak session token generation using Math.random
    // Should use crypto.randomBytes for session tokens
    const token =
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2);

    return { token };
  }

  return null;
}

export function generateApiToken(): string {
  // INTENTIONAL-VULNERABILITY: Predictable token generation
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `token_${timestamp}_${random}`;
}

export function validateToken(token: string): boolean {
  // INTENTIONAL-VULNERABILITY: No actual token validation
  // Just checks if token is non-empty
  return token.length > 0;
}
