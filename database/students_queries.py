from database.db import get_connection

def get_all_students():
    conn = get_connection()

    cur = conn.cursor()

    cur.execute("""
        SELECT student_id,
               name,
               department,
               cgpa
        FROM students
        ORDER BY student_id
    """)

    students = cur.fetchall()

    cur.close()
    conn.close()

    return students