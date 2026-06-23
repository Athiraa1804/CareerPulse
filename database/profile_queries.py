from database.db import get_connection

def get_profile(student_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            name,
            department,
            cgpa,
            email,
            phone
        FROM students
        WHERE student_id = %s
    """, (student_id,))

    profile = cur.fetchone()

    cur.close()
    conn.close()

    return profile
def get_skills(student_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT s.skill_name
        FROM student_skills ss
        JOIN skills s
        ON ss.skill_id = s.skill_id
        WHERE ss.student_id = %s
    """, (student_id,))

    skills = cur.fetchall()

    cur.close()
    conn.close()

    return skills
def get_interests(student_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT interest_name
        FROM interests
        WHERE student_id = %s
    """, (student_id,))

    interests = cur.fetchall()

    cur.close()
    conn.close()

    return interests