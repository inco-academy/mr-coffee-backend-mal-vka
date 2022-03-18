CREATE DATABASE bookshelf;

CREATE TABLE schedule (
	id serial PRIMARY KEY,
	name VARCHAR NOT NULL,
	weekday	int NOT NULL,
	start_at time NOT NULL,
	end_at time NOT NULL
);

-- INSERT INTO schedule
-- 	(name, weekday, start_at, end_at)
-- VALUES
-- 	('MARIA', 2, '8:30', '12:30'),
-- 	('ALBERT', 2, '12:30', '16:30'),
-- 	('MARIA', 3, '8:30', '12:30'),
-- 	('WIKTOR', 3, '12:30', '16:30'),
-- 	('ALBERT', 4, '8:30', '12:30'),
-- 	('WIKTOR', 4, '12:30', '16:30'),
-- 	('MARIA', 1, '8:30', '12:30'),
-- 	('ALICJA', 5, '12:30', '16:30'),
-- 	('MARIA', 5, '8:30', '12:30'),
-- 	('ALICJA', 1, '12:30', '16:30')
	
-- SELECT * FROM schedule;