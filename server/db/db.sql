-- Storing file metadata, instead of the file itself, boosts database performance
CREATE TABLE files (
    id serial PRIMARY KEY,
    file_name text NOT NULL,
    size bigint NOT NULL,
    created_at timestamptz DEFAULT NOW()
);
