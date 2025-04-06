/* Replace with your SQL commands *//* Replace with your SQL commands */
CREATE TABLE humanAge (
    `age` int unsigned not null COMMENT "年齢",
    `prio` int not null COMMENT "優先度",
    `created_at` timestamp(0) not null default CURRENT_TIMESTAMP,
    `updated_at` timestamp(0) not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    constraint UNIQUE_humanAge_age unique (age)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;