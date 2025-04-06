# DB マイグレーションについて

DB のマイグレーションには以下を使用します。

- [db-migrate](https://www.npmjs.com/package/db-migrate)

また、"longblob"など、特殊な型を利用するために、DB 更新は SQL 文を用います。

## 公式リファレンス:

- [Usage - db-migrate](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/)

## 使い方

### 接続先を .env ファイルに設定します。

```
DATABASE_URL=<driver>://<user>:<password>@<address>:<port>/<database>
```

### テーブルを更新する

```
npx db-migrate up
```

### テーブルの更新を 1 つ戻す

```
npx db-migrate down
```

### テーブルを消す(最初からやり直したい時など)

```
npx db-migrate reset
```

### マイグレーションを作成する

```
npx db-migrate create add-people --sql-file
```

この時、以下の３つのファイルが作成されます。

```
./migrations/20111219120000-add-people.js
./migrations/sqls/20111219120000-add-people-up.sql
./migrations/sqls/20111219120000-add-people-down.sql
```

up にはバージョンアップに伴う変更を。
down にはバージョンダウンに伴う変更を記述します。
基本的に 1 ファイルにつき、1 テーブルの変更を書きます。

## mysql 関連メモ

### 欲しいテストケースをダンプする

```
mysqldump -h 127.0.0.1 -P3307 mavisualize testcases testcase_images --no-create-info -uroot -p --where="testcase_id=39" --hex-blob > sqls/sample_testcase.sql
```

※ sql がバイナリデータを含んでおり、データの受け渡しでトラブルがあったので、'--hex-blob' を付けること。

### ダンプした sql を投入する

```
mysql -h 127.0.0.1 -P3307 mavisualize -uroot -p < sqls/sample_testcase.sql
```
