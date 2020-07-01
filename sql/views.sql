CREATE VIEW store_view AS
SELECT c.name, store_id, SUM(total_amount) AS total FROM transactions AS t
JOIN contain USING(date_time)
JOIN products  AS p USING(barcode)
JOIN category AS c USING(category_id)
GROUP BY category_id, store_id
ORDER BY category_id, store_id;


CREATE VIEW customer_info AS
SELECT cl.name AS customer, c.name AS category, store_id AS store, SUM(total_amount) AS total FROM customer AS cl
JOIN transactions AS t USING(card_id)
JOIN contain USING(date_time)
JOIN products USING(barcode)
JOIN category AS c USING(category_id)
GROUP BY category_id, store_id
ORDER BY cl.name, category_id, store_id;