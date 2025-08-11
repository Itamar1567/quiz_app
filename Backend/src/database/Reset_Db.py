# import os
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
#
# # Import ONLY your models AFTER deletion
# DB_FILE = "database.db"
#
# # Delete DB if exists
# if os.path.exists(DB_FILE):
#     try:
#         os.remove(DB_FILE)
#         print("Deleted old database.")
#     except PermissionError:
#         raise SystemExit("Database file is in use. Close all apps/connections before retrying.")
#
# # Now import your models
# from models import Base  # Make sure models.py does NOT create engine on import
#
# # Create new DB
# engine = create_engine(f"sqlite:///{DB_FILE}", echo=True)
# Base.metadata.create_all(engine)
# print("Created new database.")