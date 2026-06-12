// --- 1. IMPORTS ---
import { PrismaClient } from "@prisma/client";

// --- 2. TYPES / INTERFACES ---
declare global {
  // Cho phép Node.js đính kèm thuộc tính vào globalObject trong môi trường dev
  var prismaGlobal: PrismaClient | undefined;
}

// --- 3. MAIN INITIALIZATION (SINGLETON PATTERN) ---
// Chặn cơ chế tạo mới kết nối liên tục khi Hot Reload kích hoạt
const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// --- 4. ENVIRONMENT-SPECIFIC CONFIG ---
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

// --- 5. EXPORTS ---
export { prisma };
