create table if not exists pizzas (
    id serial primary key,
    name text not null
);

create table if not exists batches (
    id serial primary key,
    pizza_id integer references pizzas,
    quantity integer not null
);

create table if not exists toppings (
    id serial primary key,
    name text not null
);

create table if not exists pizzas_toppings (
    pizza_id integer references pizzas,
    topping_id integer references toppings,
    primary key (pizza_id, topping_id)
);

create table if not exists recipes (
    id serial primary key,
    name text not null,
    -- pizza_id integer references pizzas,
    description text not null
);

create table if not exists tags (
    id serial primary key,
    -- recipes_id integer references recipes,
    tag text not null
);

create table if not exists steps (
    id serial primary key,
    recipes_id integer references recipes,
    step text not null
);