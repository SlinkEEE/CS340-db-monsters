--
-- Table structure for table 'monsters'
--

DROP TABLE IF EXISTS monsters;
CREATE TABLE monsters (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  color varchar(25) NOT NULL DEFAULT 'unknown',
  type int NOT NULL,
  habitat int NOT NULL,
  scariness int NOT NULL,
  CHECK (scariness >= 1 AND scariness <= 5)
) ENGINE = InnoDB DEFAULT CHARSET = UTF8 AUTO_INCREMENT = 1;

--
-- Sample data for table 'monsters'
--
INSERT INTO monsters 
  (name, color, type, habitat, scariness) 
VALUES
  ('Frank', 'green', 1, 1, 1),
  ('Tentacula', 'white', 2, 1, 2),
  ('Dave', 'polka-dot', 3, 1, 3),
  ('The 25th Baam', 'black', 4, 2, 5);