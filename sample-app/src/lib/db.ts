// INTENTIONAL-VULNERABILITY: Hardcoded database connection string in source code
// This should use environment variables or Azure Key Vault references
const DATABASE_URL =
  "postgresql://admin:P@ssw0rd123!@prod-db.example.com:5432/appdb?sslmode=disable";

// INTENTIONAL-VULNERABILITY: SSL disabled in connection string
// Production databases should always use encrypted connections

interface QueryResult {
  rows: any[];
  rowCount: number;
}

export async function query(sql: string, params?: any[]): Promise<QueryResult> {
  // INTENTIONAL-VULNERABILITY: No parameterized queries enforced
  // This function accepts raw SQL strings enabling injection
  console.log(`Executing query: ${sql}`);

  // Simulated database connection
  return {
    rows: [],
    rowCount: 0,
  };
}

export async function getProductById(id: string): Promise<any> {
  // INTENTIONAL-VULNERABILITY: SQL injection via string concatenation
  // Should use parameterized queries: query('SELECT * FROM products WHERE id = $1', [id])
  const sql = `SELECT * FROM products WHERE id = '${id}'`;
  const result = await query(sql);
  return result.rows[0];
}

export async function searchProducts(term: string): Promise<any[]> {
  // INTENTIONAL-VULNERABILITY: SQL injection via string concatenation
  const sql = `SELECT * FROM products WHERE name LIKE '%${term}%' OR description LIKE '%${term}%'`;
  const result = await query(sql);
  return result.rows;
}

export function getDatabaseUrl(): string {
  // INTENTIONAL-VULNERABILITY: Exposing connection string through getter
  return DATABASE_URL;
}
