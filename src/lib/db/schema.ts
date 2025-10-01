import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  uuid,
  varchar,
  index,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const userSystemEnum = pgEnum("user_system_enum", ["assistant", "user"]);

export const chats = pgTable(
  "chats",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull().default("Untitled"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    userId: varchar("user_id", { length: 256 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => ({
    userIdIdx: index("chats_user_id_idx").on(table.userId),
    updatedAtIdx: index("chats_updated_at_idx").on(table.updatedAt),
    createdAtIdx: index("chats_created_at_idx").on(table.createdAt),
    userIdUpdatedAtIdx: index("chats_user_id_updated_at_idx").on(
      table.userId,
      table.updatedAt
    ),
  })
);

export type DrizzleChat = typeof chats.$inferSelect;

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chat_id")
      .references(() => chats.id, { onDelete: "cascade" })
      .notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    role: userSystemEnum("role").notNull(),
  },
  (table) => ({
    chatIdIdx: index("messages_chat_id_idx").on(table.chatId),
    userIdIdx: index("messages_user_id_idx").on(table.userId),
    createdAtIdx: index("messages_created_at_idx").on(table.createdAt),
    roleIdx: index("messages_role_idx").on(table.role),
    chatIdCreatedAtIdx: index("messages_chat_id_created_at_idx").on(
      table.chatId,
      table.createdAt
    ),
    userIdCreatedAtIdx: index("messages_user_id_created_at_idx").on(
      table.userId,
      table.createdAt
    ),
  })
);

export type DrizzleMessages = typeof messages.$inferSelect;
