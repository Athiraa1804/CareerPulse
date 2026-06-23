from database.db import get_connection

def get_all_companies():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            company_name,
            package,
            location,
            industry,
            cutoff_cgpa,
            role
        FROM companies
        ORDER BY package DESC
    """)

    companies = cur.fetchall()

    cur.close()
    conn.close()

    return companies