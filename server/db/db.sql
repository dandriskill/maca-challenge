-- Storing file metadata, instead of the file itself, boosts database performance
CREATE TABLE IF NOT EXISTS files (
    id serial PRIMARY KEY,
    file_name text NOT NULL,
    size bigint NOT NULL,
    num_lines integer NOT NULL,
    num_no_contact_info integer DEFAULT 0,
    num_no_deal integer DEFAULT 0,
    deals_total money DEFAULT 0, -- Always USD
    created_at timestamptz DEFAULT NOW()
);
