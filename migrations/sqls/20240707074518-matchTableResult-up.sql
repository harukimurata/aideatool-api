/* Replace with your SQL commands */
CREATE TABLE matchTableResult (
    `id` int unsigned auto_increment primary key COMMENT "対戦結果ID",
    `playerA_id` int not null COMMENT "プレイヤーAID",
    `playerB_id` int not null COMMENT "プレイヤーBID",
    `result` TINYINT(1) COMMENT "対戦結果",
    `match_id` varchar(255) not null COMMENT "大会ログインID",
    `created_at` timestamp(0) not null default CURRENT_TIMESTAMP,
    `updated_at` timestamp(0) not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    constraint FOREIGN_matchTableResult_match_id foreign key (match_id) REFERENCES matchTable(match_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;