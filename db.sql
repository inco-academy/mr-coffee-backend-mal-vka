CREATE DATABASE mr.coffee;

CREATE TABLE schedule (
	id serial PRIMARY KEY,
	user_id int NOT NULL,
	date date NOT NULL,
	start_at time NOT NULL,
	end_at time NOT NULL
);

-- INSERT INTO schedule
-- 	(user_id, date, start_at, end_at)
-- VALUES
-- 	(1, '2022-03-29', '8:30', '12:30'),
-- 	(2, '2022-03-29', '12:30', '16:30'),
-- 	(1, '2022-03-30', '8:30', '12:30'),
-- 	(0, '2022-03-30', '12:30', '16:30'),
-- 	(2, '2022-03-31', '8:30', '12:30'),
-- 	(0, '2022-03-31', '12:30', '16:30'),
-- 	(1, '2022-03-28', '8:30', '12:30'),
-- 	(0, '2022-04-01', '12:30', '16:30'),
-- 	(1, '2022-04-01', '8:30', '12:30'),
-- 	(0, '2022-03-28', '12:30', '16:30');
	
-- SELECT * FROM schedule;
