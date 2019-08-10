--
-- Queries for the monster database
-- Colon (:) character used to denote variables that will have data 
-- from the backend programming language

--
-- VIEW tables
--

-- View all monsters (incl their types and habitats)
SELECT M.id, M.name, M.color, T.name AS type, H.name AS habitat, M.scariness
FROM monsters M
LEFT JOIN types T
  ON M.type = T.id
LEFT JOIN habitats H
  ON M.habitat = H.id;

-- View all types
SELECT T.id, T.name AS type
  FROM types T;

-- View all habitats
SELECT H.id, H.name, H.climate AS habitat 
FROM habitats H;

-- View all skills
SELECT S.id, S.name, S.difficulty AS skill 
FROM skills S;

-- View all weaknesses
SELECT W.id, W.name AS weakness 
FROM weaknesses W;

-- View all monsters and their currently associated skills
SELECT M.name AS monster, S.name AS skill 
FROM monsters M
INNER JOIN monsters_skills MS
  ON M.id = MS.monster_id
INNER JOIN skills S
  ON MS.skill_id = S.id
GROUP BY M.name, S.name;

-- View all monsters and their currently associated weaknesses
SELECT M.name AS monster, W.name AS weakness 
FROM monsters M
INNER JOIN monsters_weaknesses MW
  ON M.id = MW.monster_id
INNER JOIN weaknesses W
  ON MW.weakness_id = W.id
GROUP BY M.name, W.name;

--
-- FILTER monsters
--

-- View monsters by type
SELECT M.id, M.name, M.color, T.name AS type, H.name AS habitat, M.scariness
FROM monsters M
LEFT JOIN types T
  ON M.type = T.id
  WHERE M.type = :type_id_from_dropdownInput;


--
-- INSERT new item in Entities
--

-- New monster: get all Type IDs and Names to populate the Type dropdown
SELECT T.id, T.name FROM types T;
-- New monster: get all Habitat IDs and Names to populate the Habitat dropdown
SELECT H.id, H.name FROM habitats H;
-- New monster: add a new monster
INSERT INTO monsters (name, color, type, habitat, scariness)
VALUES (:name, :color, :type_id_from_dropdown, :habitat_id_from_dropdown, :scariness)

-- New type
INSERT INTO types (name) VALUES (:name);

-- New habitat
INSERT INTO habitats (name, climate) VALUES (:name, :climate);

-- New skill
INSERT INTO skills (name, difficulty) VALUES (:name, :difficulty);

-- New weakness
INSERT INTO weaknesses (name) VALUES (:name);


--
-- INSERT new item in Relationships
--

-- get monsters' names to populate a dropdown for associating with a skill/weakness
SELECT M.id AS id, M.name FROM monsters M; 

-- get skill names to populate a dropdown for associating with a monster
SELECT S.id, S.name AS skill FROM skills S;

-- get weakness names to populate a dropdown for associating with a monster
SELECT W.id, W.name AS weakness FROM weaknesses W;

-- associate a monster with a skill (M:M)
INSERT INTO monsters_skills (monster_id, skill_id)
VALUES (:monster_id_from_dropdownInput, :skill_id_from_dropdownInput);

-- associate a monster with a weakness (M:M)
INSERT INTO monsters_weaknesses (monster_id, weakness_id)
VALUES (:monster_id_from_dropdownInput, :weakness_id_from_dropdownInput);


--
-- UPDATE 
--

-- Get a single monster's data 
SELECT M.id, M.name, M.color, M.type, M.habitat, M.scariness
FROM monsters M
WHERE M.id = :monster_ID_selected_from_view_monsters_page;

-- Update a monster's data after successful form submission
UPDATE monsters M
SET M.name = :nameInput, M.color = :colorInput, M.type = :type_id_from_dropdownInput, M.habitat = :habitat_id_from_dropdownInput, M.scariness = :scarinessInput
WHERE M.id = :monster_ID_selected_from_update_monsters_form;


--
-- DELETE 
--

-- delete a monster
DELETE FROM monsters M WHERE M.id = :monster_ID_selected_from_view_monsters_page;

-- remove a relationship between a monster and a skill
DELETE FROM monsters_skills
WHERE monster_id = :monster_ID_selected_from_view_monsters_skills_page
AND skill_id = :skill_ID_selected_from_view_monsters_skills_page;

-- remove a relationship between a monster and a weakness
DELETE FROM monsters_weaknesses
WHERE monster_id = :monster_ID_selected_from_view_monsters_weaknesses_page
AND weakness_id = :weakness_ID_selected_from_view_monsters_weaknesses_page;



