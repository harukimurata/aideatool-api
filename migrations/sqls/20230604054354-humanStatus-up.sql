/* Replace with your SQL commands */
CREATE TABLE humanStatus (
    `id` int unsigned auto_increment primary key COMMENT "識別ID",
    `body` int not null COMMENT "身体スコア",
    `mental` int not null COMMENT "メンタルスコア",
    `created_at` timestamp(0) not null default CURRENT_TIMESTAMP,
    `updated_at` timestamp(0) not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;