from database.db import get_connection

from database.db import get_connection

def create_user(student_id, username, password):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM users WHERE username=%s",
        (username,)
    )

    if cur.fetchone():
        cur.close()
        conn.close()
        return False

    cur.execute("""
        INSERT INTO users
        (student_id, username, password)
        VALUES (%s,%s,%s)
    """,
    (
        student_id,
        username,
        password
    ))

    conn.commit()

    cur.close()
    conn.close()

    return True
def verify_user(username,password):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT student_id
        FROM users
        WHERE username=%s
        AND password=%s
    """,(username,password))

    user = cur.fetchone()

    cur.close()
    conn.close()

    return user