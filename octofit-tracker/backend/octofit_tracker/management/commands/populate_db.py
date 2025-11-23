from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models as djongo_models
from pymongo import MongoClient
from django.conf import settings

# Models for teams, activities, leaderboard, workouts will be created if not present
# For now, use direct pymongo for index creation and sample data

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create unique index on email for users
        db.users.create_index([('email', 1)], unique=True)

        # Sample users (superheroes)
        users = [
            {"name": "Tony Stark", "email": "tony@marvel.com", "team": "marvel"},
            {"name": "Steve Rogers", "email": "steve@marvel.com", "team": "marvel"},
            {"name": "Bruce Wayne", "email": "bruce@dc.com", "team": "dc"},
            {"name": "Clark Kent", "email": "clark@dc.com", "team": "dc"},
        ]
        db.users.insert_many(users)

        # Teams
        teams = [
            {"name": "marvel", "members": ["tony@marvel.com", "steve@marvel.com"]},
            {"name": "dc", "members": ["bruce@dc.com", "clark@dc.com"]},
        ]
        db.teams.insert_many(teams)

        # Activities
        activities = [
            {"user": "tony@marvel.com", "activity": "run", "distance": 5},
            {"user": "steve@marvel.com", "activity": "cycle", "distance": 20},
            {"user": "bruce@dc.com", "activity": "swim", "distance": 2},
            {"user": "clark@dc.com", "activity": "fly", "distance": 100},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {"team": "marvel", "points": 25},
            {"team": "dc", "points": 30},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {"user": "tony@marvel.com", "workout": "HIIT", "duration": 30},
            {"user": "steve@marvel.com", "workout": "Yoga", "duration": 45},
            {"user": "bruce@dc.com", "workout": "Strength", "duration": 60},
            {"user": "clark@dc.com", "workout": "Cardio", "duration": 50},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
