
from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='DC', description='DC superheroes')

        # Create Users (team is a string field)
        ironman = User.objects.create(username='ironman', email='ironman@marvel.com', team='Marvel')
        captain = User.objects.create(username='captainamerica', email='cap@marvel.com', team='Marvel')
        batman = User.objects.create(username='batman', email='batman@dc.com', team='DC')
        superman = User.objects.create(username='superman', email='superman@dc.com', team='DC')

        # Create Activities (user is a string field)
        Activity.objects.create(user='ironman', activity_type='run', duration=30, date=date.today())
        Activity.objects.create(user='captainamerica', activity_type='cycle', duration=60, date=date.today())
        Activity.objects.create(user='batman', activity_type='swim', duration=45, date=date.today())
        Activity.objects.create(user='superman', activity_type='run', duration=50, date=date.today())

        # Create Workouts
        Workout.objects.create(name='Morning Cardio', description='A quick morning run', difficulty='Easy')
        Workout.objects.create(name='Strength Training', description='Weight lifting session', difficulty='Medium')

        # Create Leaderboard (user is a string field)
        Leaderboard.objects.create(user='ironman', points=100)
        Leaderboard.objects.create(user='captainamerica', points=90)
        Leaderboard.objects.create(user='batman', points=95)
        Leaderboard.objects.create(user='superman', points=110)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
