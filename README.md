# voebb-ical

This project makes it possible to have an ical feed for your loans in the Berlin Library. Never
again forget to return a book on time. The ical feed will have two dates for each loan. One at the
due date and one 3 days before.

The system needs to have your login credentials to access the voebb.de website with your account. To
make it as safe as possible, you have to host it on your own. Luckily with options like heroku you can
do that for free with just a few clicks.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/bitboxer/voebb-ical)

After you deployed it and configured the correct voebb credentials, you can add the feed to your calender using the following
url: `http://[YOURAPPNAME].herokuapp.com/ical`. 
