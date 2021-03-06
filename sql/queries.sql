##
# products usually bought together
##
SELECT COUNT(c1.date_time) AS times, p1.name AS name1, p1.brand_name AS brand1, p2.name AS name2, p2.brand_name AS brand2
FROM contain AS c1 
CROSS JOIN contain AS c2 ON c1.barcode < c2.barcode AND c1.date_time = c2.date_time 
JOIN products AS p1 ON c1.barcode=p1.barcode
JOIN products AS p2 ON c2.barcode=p2.barcode
GROUP BY c1.barcode, c2.barcode
ORDER BY times DESC LIMIT 10;

##
# most popular locations
##
SELECT alley, shelf, COUNT(barcode) AS number_of_products FROM offers 
GROUP BY alley, shelf 
ORDER BY COUNT(barcode) DESC LIMIT 10;

##
# market label / total per category
##
SELECT COUNT(*)/(
	SELECT COUNT(*) FROM transactions
    JOIN contain USING(date_time)
	JOIN products AS pr USING(barcode)
	WHERE pr.category_id=p.category_id
) * 100 AS percentage, category_id 
FROM transactions
JOIN contain USING(date_time)
JOIN products AS p USING(barcode)
WHERE market_label=true
GROUP BY category_id;

##
# hour / profit
##
SELECT HOUR(date_time) hour, SUM(total_amount) amount
FROM transactions
GROUP BY HOUR(date_time)
ORDER BY amount DESC;

##
# transactions / hour per age_group
##
SELECT HOUR(date_time) AS hour, COUNT(*)/(
	SELECT COUNT(*) FROM transactions
	WHERE HOUR(date_time) = hour
) * 100 AS percentage, "18-24" AS age_group FROM transactions
JOIN customer USING(card_id)
WHERE YEAR(NOW())-YEAR(date_of_birth) BETWEEN 18 AND 24
GROUP BY age_group, hour
UNION
SELECT HOUR(date_time) AS hour, COUNT(*)/(
	SELECT COUNT(*) FROM transactions
	WHERE HOUR(date_time) = hour
) * 100 AS percentage, "25-39" AS age_group FROM transactions
JOIN customer USING(card_id)
WHERE YEAR(NOW())-YEAR(date_of_birth) BETWEEN 25 AND 39
GROUP BY age_group, hour
UNION
SELECT HOUR(date_time) AS hour, COUNT(*)/(
	SELECT COUNT(*) FROM transactions
	WHERE HOUR(date_time) = hour
) * 100 AS percentage, "40-64" AS age_group FROM transactions
JOIN customer USING(card_id)
WHERE YEAR(NOW())-YEAR(date_of_birth) BETWEEN 40 AND 64
GROUP BY age_group, hour
UNION
SELECT HOUR(date_time) AS hour, COUNT(*)/(
	SELECT COUNT(*) FROM transactions
	WHERE HOUR(date_time) = hour
) * 100 AS percentage, "65+" AS age_group FROM transactions
JOIN customer USING(card_id)
WHERE YEAR(NOW())-YEAR(date_of_birth) >= 65
GROUP BY age_group, hour
ORDER BY hour;

##
#  hall of fame
##
SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(name, ' ', 1), ' ', -1) AS name, 
		YEAR(NOW())-YEAR(date_of_birth) AS age, points 
FROM customer 
ORDER BY points DESC LIMIT 5;