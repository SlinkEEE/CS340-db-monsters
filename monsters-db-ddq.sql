--
-- Table structure for table 'types'
--
DROP TABLE IF EXISTS types;
CREATE TABLE types (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL
) 
ENGINE = InnoDB DEFAULT CHARSET = UTF8 AUTO_INCREMENT = 1;

--
-- Sample data for table 'types'
--
INSERT INTO types
  (name)
VALUES
  ('Martian'),
  ('Dragon'),
  ('Giant Spider'),
  ('Minion'),
  ('Irregular');


--
-- Table structure for table 'habitats'
--
DROP TABLE IF EXISTS habitats;
CREATE TABLE habitats (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL DEFAULT 'unknown',
  climate varchar(25) NOT NULL DEFAULT 'unknown' 
) 
ENGINE = InnoDB DEFAULT CHARSET = UTF8 AUTO_INCREMENT = 1;

--
-- Sample data for table 'habitats'
--
INSERT INTO habitats
  (name, climate)
VALUES
  ('outer space', 'freezing'),
  ('swamp', 'steamy'),
  ('your closet', 'room temperature'),
  ('under the bed', 'room temperature'),
  ('a tower', 'various');
  
  

--
-- Table structure for table 'monsters'
--
DROP TABLE IF EXISTS monsters;
CREATE TABLE monsters (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  color varchar(25) NOT NULL DEFAULT 'unknown',
  type int,
  habitat int NOT NULL,
  scariness int NOT NULL,
  CHECK (scariness >= 1 AND scariness <= 5),
  FOREIGN KEY (type) REFERENCES types(id) ON DELETE RESTRICT ON UPDATE CASCADE
) 
ENGINE = InnoDB DEFAULT CHARSET = UTF8 AUTO_INCREMENT = 1;

--
-- Sample data for table 'monsters'
--
INSERT INTO monsters 
  (name, color, type, habitat, scariness) 
VALUES
  ('Bob', 'green', 1, 1, 1),
  ('Frank', 'green', 1, 1, 2),
  ('Tentacula', 'white', 3, 2, 2),
  ('Dave', 'yellow', 4, 4, 3),
  ('The 25th Baam', 'black', 5, 5, 5);


  
