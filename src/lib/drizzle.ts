import { drizzle } from 'drizzle-orm/vercel-postgres';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { sql } from '@vercel/postgres';

export const cartTableDrizzle = pgTable("cart",{
product_id: varchar("product_id", {length:255}).notNull(),
quantity: integer("quantity").notNull(),
user_id: varchar("user_id", {length:255}).notNull(),
price:integer("price").notNull(),
})

export type typeOfCartTable = InferModel <typeof cartTableDrizzle>;
export const db = drizzle(sql);
