import sqlite3

conn = sqlite3.connect("mydatabase.db")
cursor = conn.cursor()

# Fetch all rows from a table
cursor.execute('SELECT * FROM User') 
rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()
