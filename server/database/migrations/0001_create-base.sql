-- Migration number: 0001 	 2025-03-04T18:16:15.800Z

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    name TEXT,
    created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS guestbook_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (guest_id) REFERENCES guests(id)
);

CREATE TABLE IF NOT EXISTS article_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (guest_id) REFERENCES guests(id)
);

CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_id INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY (guest_id) REFERENCES guests(id)
);
