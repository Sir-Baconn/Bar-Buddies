DELIMITER |

CREATE TRIGGER BeerTrig
	BEFORE DELETE ON beers
    FOR EACH ROW
    BEGIN
		UPDATE sells SET sells.beer = 'bud' WHERE sells.beer = OLD.beer;
    END|