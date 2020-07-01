CREATE TABLE customer (
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR (10),
    pet VARCHAR (10),
    family_members INT,
    street VARCHAR (40),
    number INT,
    postal_code INT,
    city VARCHAR (20),
    name VARCHAR(50),	
    date_of_birth DATE,
    points INT
);


CREATE TABLE stores (
    store_id INT PRIMARY KEY AUTO_INCREMENT,
    operating_hours VARCHAR (30),
    size INT,
    street VARCHAR (40),
    number INT,
    postal_code INT,
    city VARCHAR (20) 
);


CREATE TABLE phones (
   phone_id VARCHAR (10) PRIMARY KEY,
   store_id INT,
   FOREIGN KEY (store_id) REFERENCES stores (store_id) ON DELETE CASCADE
);


CREATE TABLE category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);


CREATE TABLE provides(
    store_id INT,
    category_id INT,
    FOREIGN KEY (store_id) REFERENCES stores (store_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category (category_id) ON DELETE CASCADE
);


CREATE TABLE products (
    barcode INT PRIMARY KEY AUTO_INCREMENT,
    price DECIMAL (10,2),
    name VARCHAR (30),
    brand_name VARCHAR (30),
    first_transaction DATETIME,
    category_id INT,
    market_label BOOLEAN,
    FOREIGN KEY (category_id) REFERENCES category (category_id) ON DELETE SET NULL
);


CREATE TABLE transactions (
    date_time DATETIME PRIMARY KEY,
    total_amount INT,
    payment_method VARCHAR(20),
    card_id INT,
    store_id INT,
    FOREIGN KEY (card_id) REFERENCES customer (card_id) ON DELETE SET NULL,
    FOREIGN KEY (store_id) REFERENCES stores (store_id) ON DELETE SET NULL
);


CREATE TABLE older_prices (
    start_date DATE,
    price DECIMAL (10,2),
    end_date DATE,
    barcode INT ,
    PRIMARY KEY (start_date, barcode),
    FOREIGN KEY (barcode) REFERENCES products (barcode)
);


CREATE TABLE offers (
    barcode INT,
    store_id INT,
    alley INT,
    shelf INT,
    PRIMARY KEY (barcode,store_id),
    FOREIGN KEY (barcode) REFERENCES products (barcode) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores (store_id) ON DELETE CASCADE
);


CREATE TABLE contain (
    barcode INT,
    date_time DATETIME,
    pieces INT,
    PRIMARY KEY (barcode,date_time),
    FOREIGN KEY (barcode) REFERENCES products (barcode) ON DELETE CASCADE,
    FOREIGN KEY (date_time) REFERENCES transactions (date_time) ON DELETE CASCADE
);