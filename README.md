# Currency Master - A Foreign Exchange Rate Mobile Application
![Interface Snapshots](./assets/cm.png)



## Application Features
1. Exchange Rate data: Data of over 161 currencies, updated daily from Exchange-Rate API.

2. Currencies Watchlist: Users can add currencies to their watchlist.

3. Currency conversion: Users can convert currencies between their selected base currency and a currency in their watchlist.

4. Wallets: Allows users to record and track their foreign assets in wallets.

5. Cloud backup: User data like wallets, watchlisted currencies, and preferred base currency are backed up on Google Firebase and persists between sessions and devices.



## How to Run
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

You can launch the application on your own device using Expo Go (requires download). Read more on https://expo.dev/go.

Alternatively, you can launch the application using an emulator (requires download and setup).


## Testing
1. Unit Testing by Jest.

2. User Testing using Blackbox (Task-based Testing).
