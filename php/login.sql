USE matthfzp_asyncGame;

-- Drops all tables and procedures
DROP PROCEDURE IF EXISTS addUser;
DROP PROCEDURE IF EXISTS validateUser;
DROP PROCEDURE IF EXISTS loginUser;
DROP PROCEDURE IF EXISTS validateUserToken;
DROP TABLE IF EXISTS userTokens;
DROP TABLE IF EXISTS users;

-- Language: mysql

CREATE TABLE users (
    id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    profilePicture VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE userTokens (
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    TOD TIMESTAMP,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

DELIMITER $
CREATE PROCEDURE addUser
(IN pUsername varchar(256), IN pPass varchar(256), IN pEmail varchar(256))
BEGIN
    SET @tempUsername = NULL;
    SELECT username INTO @tempUsername FROM users WHERE username = pUsername;
    IF @tempUsername IS NULL THEN
        SET @tempUserID = NULL;
        SELECT max(id) INTO @tempUserID FROM users;
        if (@tempUserID is null)
        then
            SET @tempUserID = 1;
        else 
            SET @tempUserID = @tempUserID + 1;
        end if;
        INSERT INTO users (id, username, pass, email) VALUES (@tempUserID, pUsername, SHA2(pPass,512), pEmail);
        SELECT 'USER ADDED' AS MSG;
    ELSE
        SELECT 'ERROR UNABLE TO ADD USER' AS MSG;
    END IF;
END
$

CREATE PROCEDURE validateUser 
(IN pUsername varchar(256), IN pOass varchar(256))
BEGIN
    SET @valid = 0;
    SELECT 1 INTO @valid FROM users WHERE username = pUsername AND pass = SHA2(pPass, 256);
END
$

CREATE PROCEDURE loginUser 
(IN pUsername varchar(256), IN pPass varchar(256))
BEGIN
    SET @tempId = NULL;
    SELECT id INTO @tempId FROM users WHERE username = pUsername AND pass = SHA2(pPass, 512);
    IF @tempId IS NOT NULL THEN
    SET @TOKEN = SHA2(CONCAT(RAND(),':',@tempId), 512);
    SET @T = NULL;
    SELECT token INTO @T FROM userTokens WHERE user_id = @tempId;
    IF @T IS NULL THEN
        INSERT INTO userTokens (user_id, token, TOD) VALUES (@tempId, @TOKEN, TIMESTAMPADD(HOUR, 2, CURRENT_TIMESTAMP()));
    ELSE
        UPDATE userTokens SET TOKEN = @TOKEN, TOD = TIMESTAMPADD(HOUR, 2, CURRENT_TIMESTAMP()) WHERE user_id = @tempId;
    END IF;
    SELECT @TOKEN AS TOKEN;
    ELSE
        SELECT 'ERROR UNABLE TO LOGIN' AS TOKEN;
    END IF;
END
$

CREATE PROCEDURE validateUserToken
(IN pToken varchar(256))
BEGIN
    SET @tempId = NULL;
    SET @tempTOD = NULL;
    SELECT user_id INTO @tempId FROM userTokens WHERE token = pToken;
    SELECT TOD INTO @tempTOD FROM userTokens WHERE token = pToken;
    IF @tempId IS NOT NULL THEN
        IF TIMESTAMPDIFF(HOUR, @tempTOD, CURRENT_TIMESTAMP()) < 2 THEN
            SELECT 'VALID' AS VALID;
        ELSE
            DELETE FROM userTokens WHERE token = pToken;
            SELECT 'ERROR TOKEN EXPIRED' AS VALID;
        END IF;
    ELSE
        SELECT 'ERROR INVALID TOKEN' AS VALID;
    END IF;
END
$

DELIMITER ;

GRANT EXECUTE ON PROCEDURE loginUser TO matthfzp_login;
GRANT EXECUTE ON PROCEDURE addUser TO matthfzp_login@localhost;
GRANT EXECUTE ON PROCEDURE validateUser TO matthfzp_login@localhost;
GRANT EXECUTE ON PROCEDURE validateUserToken TO matthfzp_login@localhost;
