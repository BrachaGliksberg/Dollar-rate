CREATE TABLE monthly_exchange_rates (
    id SERIAL PRIMARY KEY,
    month DATE NOT NULL UNIQUE,
    average_rate NUMERIC(10, 4) NOT NULL
);
