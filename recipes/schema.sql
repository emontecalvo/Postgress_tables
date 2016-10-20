create table if not exists recipes (
    id serial primary key,
    name text not null,
    description text not null
);

create table if not exists tags (
    id serial primary key,
    tag text not null
);
