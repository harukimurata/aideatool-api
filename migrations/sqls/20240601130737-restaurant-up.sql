/* Replace with your SQL commands */
CREATE TABLE restaurant (
    `id` int unsigned not null COMMENT "商品ID",
    `name` varchar(255) null COMMENT "商品名",
    `value` int unsigned not null COMMENT "参加者",
    `created_at` timestamp(0) not null default CURRENT_TIMESTAMP,
    `updated_at` timestamp(0) not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;