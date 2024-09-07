# Currency Master - A Foreign Exchange Rate Mobile Application
![Interface Snapshots](./assets/cm.png)


## Application Features
1. Exchange Rate data: Data of over 161 currencies, updated daily from Exchange-Rate API.

2. Currencies Watchlist: Users can add currencies to their watchlist.

3. Currency conversion: Users can convert currencies between their selected base currency and a currency in their watchlist.

4. Wallets: Allows users to record and track their foreign assets in wallets.

5. Cloud backup: User data like wallets, watchlisted currencies, and preferred base currency are backed up on Google Firebase and persists between sessions and devices.

## Application Preview (Expo Go Application & Account required )
There is an EAS preview build setup for this project which can be found here:

(IOS & Android)

https://expo.dev/preview/update?message=Initial%20commit&updateRuntimeVersion=1.0.0&createdAt=2024-09-07T16%3A47%3A37.735Z&slug=exp&projectId=7517d6cf-71e4-4348-9783-2e52a298de5b&group=e29f3cc6-da05-489e-93fa-03ce983ba34f. 

In the event where the Expo EAS Preview build is unavailable on the Expo server, there is a downloaded APK build always available at:

(Android only)

https://drive.google.com/file/d/1gTuFnRtAaZQN_lcVBMzYWoV5Hg6Doqon/view?usp=drive_link. 


## How to Run Locally
First, ensure that package-lock.json is deleted.

Next, run this command in the terminal to install dependencies packages.
```
npm install
```
After all packages are installed, bundle the application by running this command in the terminal.
```
npx expo
```
The application should be bundled and waiting.

![QR code](./assets/sample_run.png)

You can launch the application on your own device using Expo Go. Read more on https://expo.dev/go.

Alternatively, you can launch the application using an emulator.


## Testing
1. Unit Testing by Jest.
To run Jest test suites, run the following code in the terminal.

```
npm run test
```

2. User Testing using Blackbox (Task-based Testing).
