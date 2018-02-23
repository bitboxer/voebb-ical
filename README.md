# voebb-ical

This project makes it possible to have an ical feed for your loans in the
Berlin Library. Never again forget to return a book on time. The ical feed will
have two dates for each loan. One at the due date and one 3 days before.

The system needs to have your login credentials to access the voebb.de website
with your account. To make it as safe as possible, you have to host it on your
own. Luckily with options like heroku you can do that for free with just a few
clicks.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/bitboxer/voebb-ical)

After you deployed it and configured the correct voebb credentials, you can add
the feed to your calender using the following url:
`http://[YOURAPPNAME].herokuapp.com/feed/[YOURSECURITYTOKEN]`. The app name and
the security token are defined during the installation using the heroku button
above. After you deployed the app, go into the settings and click on "Reveal Config Vars"
to get the generated token.

# Run locally

To run the server locally you need to install node, npm and yarn. After
that follow these steps:

```
yarn
export VOEBB_ID=#USER_ID#
export VOEBB_PASSWORD=#PASSWORD#
export VOEBB_TOKEN=#TOKEN_FOR_URL#
npm start
```

The `USER_ID` is the number on your library card, `PASSWORD` your password and
the `TOKEN_FOR_URL` is used to create a secure URL that can't be guessed.
