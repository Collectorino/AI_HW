SELECT SUM(amount) AS total_sales_march_2024
FROM orders
WHERE order_date >= '2024-03-01' AND order_date < '2024-04-01';

SELECT customer, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;
  
SELECT 
    SUM(amount) AS total_sales,
    COUNT(*) AS number_of_orders,
    ROUND(SUM(amount) * 1.0 / COUNT(*), 2) AS average_order_value
FROM orders
WHERE order_date >= date('2024-04-01', 'start of month', '-3 months')
  AND order_date < date('2024-04-01', 'start of month');
