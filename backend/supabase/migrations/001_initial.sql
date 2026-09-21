create extension if not exists "uuid-ossp";

create table site_content (
    id uuid primary key default uuid_generate_v4(),
    key text unique not null,
    value text not null default '',
    updated_at timestamptz not null default now()
);

create table photos (
    id uuid primary key default uuid_generate_v4(),
    filename text not null,
    storage_path text not null,
    alt_text text not null default '',
    caption text not null default '',
    sort_order integer not null default 0,
    is_featured boolean not null default false,
    is_published boolean not null default true,
    created_at timestamptz not null default now()
);

create table pricing_packages (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text not null default '',
    price numeric(10, 2),
    currency text not null default 'ZAR',
    features jsonb not null default '[]'::jsonb,
    sort_order integer not null default 0,
    is_published boolean not null default true,
    created_at timestamptz not null default now()
);

create table contact_messages (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    email text not null,
    phone text,
    message text not null,
    is_read boolean not null default false,
    created_at timestamptz not null default now()
);

create index photos_sort_order_idx
    on photos(sort_order);

create index pricing_sort_order_idx
    on pricing_packages(sort_order);

create index contact_messages_created_at_idx
    on contact_messages(created_at desc);