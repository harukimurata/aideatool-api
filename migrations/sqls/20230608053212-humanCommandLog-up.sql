/* Replace with your SQL commands *//* Replace with your SQL commands */
CREATE TABLE humanCommandLog (
    `command` int unsigned not null COMMENT "コマンド",
    `score` int not null COMMENT "実行回数",
    `created_at` timestamp(0) not null default CURRENT_TIMESTAMP,
    `updated_at` timestamp(0) not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    constraint UNIQUE_humanCommandLog_command unique (command)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;