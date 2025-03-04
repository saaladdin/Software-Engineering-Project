import sqlite3

conn = sqlite3.connect("your_database.db")
cursor = conn.cursor()

# Fetch all rows from a table
cursor.execute("SELECT * FROM Users") 
rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()
