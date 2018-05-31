SELECT CASE WHEN NOT EXISTS(SELECT bar, beer, COUNT(*) FROM sells_test GROUP BY bar, beer HAVING COUNT(*) > 1) THEN 'True' ELSE 'False' END as test;