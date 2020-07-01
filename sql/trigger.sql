CREATE TRIGGER newest_odler_price BEFORE UPDATE ON products 
FOR EACH ROW
BEGIN
    INSERT INTO older_prices (start_date, price , barcode)
    VALUES (now(), new.price, barcode);
END


