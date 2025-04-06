/* Replace with your SQL commands */
CREATE TABLE matchTable (
    `id` int unsigned auto_increment primary key COMMENT "大会ID",
    `title` varchar(255) not null COMMENT "大会名",
    `match_id` varchar(255) not null COMMENT "大会ログインID",
    `password` varchar(255) not null COMMENT "大会パスワード",
    `auth_password` varchar(255) default null COMMENT "大会更新パスワード",
    `created_at` timestamp(0) not null default CURRENT_TIMESTAMP,
    `updated_at` timestamp(0) not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    constraint UNIQUE_matchTableInfos_match_id unique (match_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;