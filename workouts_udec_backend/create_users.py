#!/usr/bin/env python3

"""
Script to create an admin user for the workout tracker application.
Run this after setting up the database to create your first admin user.
"""

from app.core.security import get_password_hash
from app.db.session import SessionLocal
from app.models.user import User


def create_users() -> None:
    admin = 0
    test = 0
    """
    Create an admin user with predefined credentials.
    """
    db = SessionLocal()

    # Check if admin user already exists
    admin_user = db.query(User).filter(User.email == "admin@example.com").first()
    if admin_user:
        print("Admin user already exists!")
        admin = 1

    admin_user = db.query(User).filter(User.email == "anyelo@gmail.com").first()
    if admin_user:
        print("Test user already exists!")
        test = 1

    # Create admin user
    if admin == 0:
        admin_user = User(
            email="admin@example.com",
            username="admin",
            hashed_password=get_password_hash("admin123"),
            full_name="System Administrator",
            is_active=True,
            is_admin=True,
        )

        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)

        print("Admin user created successfully!")
        print("Email: admin@example.com")
        print("Password: admin123")
        print("Please change the password after first login!")

    # Create test user
    if test == 0:
        test_user = User(
            email="anyelo@gmail.com",
            username="luisgamercool",
            hashed_password=get_password_hash("cacaca"),
            full_name="Test User",
            is_active=True,
            is_admin=False,
        )
        db.add(test_user)
        db.commit()
        db.refresh(test_user)

        print("Test user created successfully!")
        print("Email: anyelo@gmail.com")
        print("Password: cacaca")
        print("Please change the password after first login!")

    db.close()


if __name__ == "__main__":
    create_users()
