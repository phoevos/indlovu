CREATE TRIGGER update_older_prices
    BEFORE UPDATE ON products
    FOR EACH ROW 
 INSERT INTO older_prices
 SET 
     start_date = (
		SELECT o.end_date FROM older_prices AS o
		WHERE o.barcode=new.barcode
 		ORDER BY o.end_date DESC LIMIT 1
     ),
     price = OLD.price,
     end_date = DATE(NOW()),
     barcode = OLD.barcode;