\c messagely

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users ON DELETE CASCADE,
    to_username text NOT NULL REFERENCES users ON DELETE CASCADE,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);

INSERT INTO users 
    (username, password, first_name, last_name, phone, join_at, last_login_at) 
VALUES
    ('catlover', 'meow', 'bearbear', 'paws', '911', current_timestamp, current_timestamp), 
    ('doglovr', 'woof', 'teddy', 'paws', '626', current_timestamp, current_timestamp);

INSERT INTO messages 
    (from_username, to_username, body, sent_at, read_at) 
VALUES 
    ('catlover', 'doglovr', 'scratch u', current_timestamp, current_timestamp),
    ('doglovr', 'catlover', 'bite u', current_timestamp, current_timestamp);