CREATE TABLE IF NOT EXISTS `fooody`.`user` (
  `id` BIGINT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`username` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `fooody`.`favorite` (
  `id` BIGINT(11) NOT NULL AUTO_INCREMENT,
  `userId` BIGINT(11) NOT NULL,
  `enabled` INT(1) NOT NULL DEFAULT 1,
  `link` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_favorite_idx` (`userId` ASC),
  CONSTRAINT `fk_favorite`
    FOREIGN KEY (`userId`)
    REFERENCES `fooody`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `fooody`.`unity` (
  `id` BIGINT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `fooody`.`ingredient` (
  `id` BIGINT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `quantity` INT(11) NULL,
  `unity` BIGINT(11) NULL,
  PRIMARY KEY (`id`)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `fooody`.`useringredientxref` (
  `userId` BIGINT(11) NOT NULL,
  `ingredientId` BIGINT(11) NOT NULL,
  `enabled` INT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`userId`, `ingredientId`),
  INDEX `fk_useringredient_02_idx` (`ingredientId` ASC),
  CONSTRAINT `fk_useringredient_01`
    FOREIGN KEY (`userId`)
    REFERENCES `fooody`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_useringredient_02`
    FOREIGN KEY (`ingredientId`)
    REFERENCES `fooody`.`ingredient` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `fooody`.`token` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT(11) NOT NULL,
  `token` TEXT NOT NULL,
  `enabled` INT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_token_user_idx` (`userId` ASC),
  CONSTRAINT `fk_token_user`
    FOREIGN KEY (`userId`)
    REFERENCES `fooody`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;