from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

from database.students_queries import get_all_students
from database.comapny_query import get_all_companies
from database.profile_queries import get_profile, get_skills, get_interests
from database.db import get_connection
from flask import request, jsonify
from database.auth_queries import create_user, verify_user


app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/companies")
def companies():
    company_data = get_all_companies()
    return render_template("companies.html", companies=company_data)

@app.route("/students")
def students():
    students = get_all_students()
    return render_template("students.html", students=students)

@app.route("/drives")
def drives():
    return render_template("drives.html")

@app.route("/reports")
def reports():
    return render_template("reports.html")

@app.route("/api/test")
def test():
    print("TEST ROUTE HIT")
    return {"success": True}

@app.route("/api/signup", methods=["POST"])
def signup():

    data = request.json
    conn=get_connection()
    cur=conn.cursor()

    cur.execute("""
        INSERT INTO students
        (name, department, email)
        VALUES (%s,%s,%s)
        RETURNING student_id
    """, (data["name"], data["department"], data["email"]))

    student_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    create_user(
    student_id,
    data["username"],
    data["password"]
)

    return jsonify({
        "success": True
    })
@app.route("/api/profile/update", methods=["PUT"])
def update_profile():
    print("UPDATE ROUTE HIT")
    data = request.json
    print(data)
    conn = get_connection()
    cur = conn.cursor()

    student_id = data["student_id"]

    # Update student details
    cur.execute("""
        UPDATE students
        SET
            name=%s,
            department=%s,
            phone=%s,
            cgpa=%s,
            graduation_year=%s
        WHERE student_id=%s
    """,
    (
        data["name"],
        data["department"],
        data["phone"],
        data["cgpa"],
        data["graduation_year"],
        student_id
    ))

    # =====================
    # Update Skills
    # =====================

    skills_list = [
        skill.strip()
        for skill in data["skills"].split(",")
        if skill.strip()
    ]

    cur.execute("""
        DELETE FROM student_skills
        WHERE student_id=%s
    """, (student_id,))

    for skill in skills_list:

        cur.execute("""
            SELECT skill_id
            FROM skills
            WHERE skill_name=%s
        """, (skill,))

        row = cur.fetchone()

        if row:
            skill_id = row[0]

        else:
            cur.execute("""
                INSERT INTO skills(skill_name)
                VALUES(%s)
                RETURNING skill_id
            """, (skill,))

            skill_id = cur.fetchone()[0]

        cur.execute("""
            INSERT INTO student_skills
            (student_id, skill_id)
            VALUES (%s, %s)
        """, (student_id, skill_id))

    # =====================
    # Update Interests
    # =====================

    interests_list = [
        interest.strip()
        for interest in data["interests"].split(",")
        if interest.strip()
    ]

    cur.execute("""
        DELETE FROM interests
        WHERE student_id=%s
    """, (student_id,))

    for interest in interests_list:

        cur.execute("""
            INSERT INTO interests
            (student_id, interest_name)
            VALUES (%s, %s)
        """, (student_id, interest))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "success": True
    })
@app.route("/api/login", methods=["POST"])
def login():

    data = request.json
    user = verify_user(data["username"], data["password"])

    if user:

        return jsonify({
            "success":True,
            "student_id":user[0],
            "role":user[1]
        })

    return jsonify({
        "success":False,
        "message": "Invalid username or password."
    }),401
@app.route("/api/eligible-companies/<int:student_id>")
def eligible_companies(student_id):

    profile = get_profile(student_id)

    # Student not found
    if profile is None:
        return jsonify([])

    # CGPA not filled
    if profile[2] is None:
        return jsonify([])

    cgpa = float(profile[2])
    department = profile[1]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            c.company_name,
            c.package,
            c.location,
            c.industry,
            c.cutoff_cgpa,
            c.role
        FROM companies c
        JOIN placement_drives pd
        ON c.company_id = pd.company_id
        WHERE pd.min_cgpa <= %s
        ORDER BY c.package DESC
    """, (cgpa,))

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify([
        {
            "company_name": row[0],
            "package": row[1],
            "location": row[2],
            "industry": row[3],
            "cutoff_cgpa": row[4],
            "role": row[5]
        }
        for row in rows
    ])
@app.route("/api/profile/<int:student_id>")
def api_profile(student_id):

    profile_row = get_profile(student_id)
    skills = get_skills(student_id)
    interests = get_interests(student_id)

    profile = {}
    if profile_row:
        profile = {
            "name": profile_row[0],
            "department": profile_row[1],
            "cgpa": profile_row[2],
            "email": profile_row[3],
            "phone": profile_row[4],
        }

    return jsonify({
        "profile": profile,
        "skills": [
            skill[0] if isinstance(skill, tuple) else skill
            for skill in skills
        ],
        "interests": [
            interest[0] if isinstance(interest, tuple) else interest
            for interest in interests
        ]
    })

@app.route("/api/signup", methods=["POST"])
def api_signup():
    return signup()
@app.route("/api/students")
def api_students():
    students = get_all_students()
    return jsonify([
        {
            "student_id": student[0],
            "name": student[1],
            "department": student[2],
            "cgpa": student[3]
        }
        for student in students
    ])

@app.route("/api/companies")
def api_companies():
    company_data = get_all_companies()
    return jsonify([
        {
            "company_name": company[0],
            "package": company[1],
            "location": company[2],
            "industry": company[3],
            "cutoff_cgpa": company[4],
            "role": company[5]
        }
        for company in company_data
    ])

@app.route("/api/admin/companies")
def admin_companies():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            company_id,
            company_name,
            role,
            package,
            location,
            industry,
            cutoff_cgpa
        FROM companies
        ORDER BY company_name
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify([
        {
            "company_id": row[0],
            "company_name": row[1],
            "role": row[2],
            "package": row[3],
            "location": row[4],
            "industry": row[5],
            "cutoff_cgpa": row[6]
        }
        for row in rows
    ])

@app.route("/api/drives")
def api_drives():
    conn = get_connection()
    cur = conn.cursor()

    # Support both table names used in different setups.
    try:
        cur.execute("""
            SELECT
                pd.drive_id,
                c.company_name,
                pd.drive_date,
                pd.min_cgpa,
                pd.job_role
            FROM placement_drives pd
            JOIN companies c ON pd.company_id = c.company_id
            ORDER BY pd.drive_date
        """)
        rows = cur.fetchall()
    except Exception:
        cur.execute("""
            SELECT
                p.drive_id,
                c.company_name,
                p.drive_date,
                p.min_cgpa,
                p.job_role
            FROM placements p
            JOIN companies c ON p.company_id = c.company_id
            ORDER BY p.drive_date
        """)
        rows = cur.fetchall()
    finally:
        cur.close()
        conn.close()

    return jsonify([
        {
            "drive_id": row[0],
            "company_name": row[1],
            "drive_date": row[2].isoformat() if row[2] else None,
            "min_cgpa": row[3],
            "job_role": row[4]
        }
        for row in rows
    ])

@app.route("/api/offers")
def api_offers():
    student_id = request.args.get("student_id", type=int)

    conn = get_connection()
    cur = conn.cursor()

    if student_id is not None:
        cur.execute("""
            SELECT
                o.offer_id,
                s.name,
                c.company_name,
                o.package,
                o.offer_date
            FROM offers o
            JOIN students s ON o.student_id = s.student_id
            JOIN companies c ON o.company_id = c.company_id
            WHERE o.student_id = %s
            ORDER BY o.offer_date DESC
        """, (student_id,))
    else:
        cur.execute("""
            SELECT
                o.offer_id,
                s.name,
                c.company_name,
                o.package,
                o.offer_date
            FROM offers o
            JOIN students s ON o.student_id = s.student_id
            JOIN companies c ON o.company_id = c.company_id
            ORDER BY o.offer_date DESC
        """)

    rows = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify([
        {
            "offer_id": row[0],
            "student_name": row[1],
            "company_name": row[2],
            "package": row[3],
            "offer_date": row[4].isoformat() if row[4] else None
        }
        for row in rows
    ])
@app.route("/api/admin/company/<int:company_id>", methods=["DELETE"])
def delete_company(company_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "DELETE FROM companies WHERE company_id = %s",
        (company_id,)
    )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Company deleted successfully"
    })
@app.route("/api/admin/company", methods=["POST"])
def add_company():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO companies
        (
            company_name,
            role,
            package,
            location,
            industry,
            cutoff_cgpa
        )
        VALUES (%s,%s,%s,%s,%s,%s)
    """,
    (
        data["company_name"],
        data["role"],
        data["package"],
        data["location"],
        data["industry"],
        data["cutoff_cgpa"]
    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Company added successfully"
    })
@app.route("/api/admin/students")
def get_all_students():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            student_id,
            name,
            department,
            cgpa,
            email,
            phone,
            graduation_year
        FROM students
        ORDER BY name
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify([
        {
            "student_id": row[0],
            "name": row[1],
            "department": row[2],
            "cgpa": row[3],
            "email": row[4],
            "phone": row[5],
            "graduation_year": row[6]
        }
        for row in rows
    ])
@app.route("/api/reports")
def api_reports():
    company_data = get_all_companies()
    students = get_all_students()

    total_students = len(students)
    total_companies = len(company_data)

    cgpa_values = [float(student[3]) for student in students if student[3] is not None]
    avg_cgpa = round(sum(cgpa_values) / len(cgpa_values), 2) if cgpa_values else 0

    top_departments = {}
    for student in students:
        dept = student[2]
        top_departments[dept] = top_departments.get(dept, 0) + 1

    top_department = max(top_departments, key=top_departments.get) if top_departments else "N/A"

    return jsonify({
        "total_students": total_students,
        "total_companies": total_companies,
        "avg_cgpa": avg_cgpa,
        "top_department": top_department
    })
@app.route("/api/admin/reports")
def admin_reports():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) FROM students")
    total_students = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM companies")
    total_companies = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM placement_drives")
    total_drives = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM applications")
    total_applications = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM offers")
    total_offers = cur.fetchone()[0]

    placement_rate = 0

    if total_students > 0:
        placement_rate = round(
            (total_offers / total_students) * 100,
            2
        )

    cur.close()
    conn.close()

    return jsonify({
        "students": total_students,
        "companies": total_companies,
        "drives": total_drives,
        "applications": total_applications,
        "offers": total_offers,
        "placement_rate": placement_rate
    })
@app.route("/api/admin/student/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):

    try:
        conn = get_connection()
        cur = conn.cursor()

        # Delete child records first
        cur.execute(
            "DELETE FROM student_skills WHERE student_id=%s",
            (student_id,)
        )

        cur.execute(
            "DELETE FROM applications WHERE student_id=%s",
            (student_id,)
        )

        cur.execute(
            "DELETE FROM offers WHERE student_id=%s",
            (student_id,)
        )

        cur.execute(
            "DELETE FROM interests WHERE student_id=%s",
            (student_id,)
        )

        cur.execute(
            "DELETE FROM resume WHERE student_id=%s",
            (student_id,)
        )

        cur.execute(
            "DELETE FROM users WHERE student_id=%s",
            (student_id,)
        )

        # Finally delete student
        cur.execute(
            "DELETE FROM students WHERE student_id=%s",
            (student_id,)
        )

        conn.commit()

        cur.close()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Student deleted successfully"
        })

    except Exception as e:
        conn.rollback()
        print("DELETE ERROR:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
@app.route("/api/admin/student/<int:student_id>", methods=["PUT"])
def update_student(student_id):

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE students
        SET
            name=%s,
            department=%s,
            cgpa=%s,
            email=%s,
            phone=%s,
            graduation_year=%s
        WHERE student_id=%s
    """,
    (
        data["name"],
        data["department"],
        data["cgpa"],
        data["email"],
        data["phone"],
        data["graduation_year"],
        student_id
    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Student updated successfully"
    })
@app.route("/api/admin/drives")
def get_admin_drives():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            pd.drive_id,
            pd.company_id,
            c.company_name,
            pd.job_role,
            pd.drive_date,
            pd.min_cgpa
        FROM placement_drives pd
        JOIN companies c
        ON pd.company_id = c.company_id
        ORDER BY pd.drive_date DESC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify([
        {
            "drive_id": row[0],
            "company_id": row[1],
            "company_name": row[2],
            "job_role": row[3],
            "drive_date": row[4],
            "min_cgpa": row[5]
        }
        for row in rows
    ])
@app.route("/api/admin/drive", methods=["POST"])
def add_drive():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO placement_drives
        (
            company_id,
            drive_date,
            min_cgpa,
            job_role
        )
        VALUES (%s,%s,%s,%s)
    """,
    (
        data["company_id"],
        data["drive_date"],
        data["min_cgpa"],
        data["job_role"]
    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Drive added successfully"
    })
@app.route("/api/admin/drive/<int:drive_id>", methods=["PUT"])
def update_drive(drive_id):

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE placement_drives
        SET
            company_id=%s,
            drive_date=%s,
            min_cgpa=%s,
            job_role=%s
        WHERE drive_id=%s
    """,
    (
        data["company_id"],
        data["drive_date"],
        data["min_cgpa"],
        data["job_role"],
        drive_id
    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Drive updated successfully"
    })
@app.route("/api/admin/company-list")
def company_list():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT company_id, company_name
        FROM companies
        ORDER BY company_name
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify([
        {
            "company_id": row[0],
            "company_name": row[1]
        }
        for row in rows
    ])
@app.route("/api/admin/drive/<int:drive_id>", methods=["DELETE"])
def delete_drive(drive_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "DELETE FROM placement_drives WHERE drive_id=%s",
        (drive_id,)
    )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Drive deleted successfully"
    })
if __name__ == "__main__":
    app.run(debug=True)