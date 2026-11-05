CREATE TABLE IF NOT EXISTS content_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  revision INTEGER NOT NULL DEFAULT 0,
  body TEXT NOT NULL
);
INSERT OR IGNORE INTO content_state (id, revision, body) VALUES (1,0,'{"revision":0,"branches":[{"id":"career","name":{"zh":"职业","en":"Career"},"parentId":null,"order":0},{"id":"finance","name":{"zh":"财商 / 金融","en":"Finance"},"parentId":null,"order":1},{"id":"media","name":{"zh":"自媒体","en":"Expression"},"parentId":null,"order":2},{"id":"health","name":{"zh":"健身 / 健康","en":"Wellbeing"},"parentId":null,"order":3},{"id":"learning","name":{"zh":"人生技能","en":"Learning"},"parentId":null,"order":4}],"entries":[],"media":[]}');
