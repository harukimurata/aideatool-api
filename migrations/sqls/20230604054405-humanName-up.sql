/* Replace with your SQL commands *//* Replace with your SQL commands */
CREATE TABLE humanName (
    `name` varchar(255) not null COMMENT "名前",
    `prio` int not null COMMENT "優先度",
    `created_at` timestamp(0) not null default CURRENT_TIMESTAMP,
    `updated_at` timestamp(0) not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    constraint UNIQUE_humanName_name unique (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;