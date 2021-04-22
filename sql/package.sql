CREATE TABLE picked (
	PID INT AUTO_INCREMENT PRIMARY KEY,
	PNO VARCHAR(50) NOT NULL,
	model VARCHAR(50) NOT NULL,
	qty INT NOT NULL,
	customer VARCHAR(200),
	status VARCHAR(50) DEFAULT "Pending",
	last_updated TIMESTAMP NOT NULL,
);

CREATE TABLE packed (
	PID INT AUTO_INCREMENT PRIMARY KEY,
	PNO VARCHAR(50) NOT NULL,
	model VARCHAR(50) NOT NULL,
	qty INT NOT NULL,
	customer VARCHAR(200),
	completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);