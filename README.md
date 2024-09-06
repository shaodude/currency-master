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


## Application Preview
There is an EAS preview build setup for this project which can be found at https://expo.dev/accounts/shaodude/projects/currency-master/builds/17ae1e45-1eae-4e64-a34f-71312569f4d4. 

In the event where the Expo EAS build is unavailable on the Expo server, there is an APK build always available at https://drive.google.com/file/d/1gTuFnRtAaZQN_lcVBMzYWoV5Hg6Doqon/view?usp=drive_link. 

For both links, simply download/ install the build in a web browser on your Android device. You may be prompted to do a Google Scan of the application, you may click "install anyway".



## Testing
1. Unit Testing by Jest.

2. User Testing using Blackbox (Task-based Testing).
