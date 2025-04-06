/* Replace with your SQL commands */
CREATE TABLE matchTablePlayer (
    `id` int unsigned auto_increment primary key COMMENT "プレイヤーID",
    `name` varchar(255) not null COMMENT "プレイヤー名",
    `match_id` varchar(255) not null COMMENT "大会ログインID",
    `created_at` timestamp(0) not null default CURRENT_TIMESTAMP,
    `updated_at` timestamp(0) not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    constraint FOREIGN_matchTablePlayer_match_id foreign key (match_id) REFERENCES matchTable(match_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;