import { device, element, by, expect } from 'detox';

describe('End-to-end test for taking a picture', () => {
  it('should navigate to HomeScreen and take a picture', async () => {
    // Start the app
    await device.launchApp();

    // Navigate to HomeScreen
    await element(by.id('home-screen')).tap();

    // Press the camera button
    await element(by.id('camera-button')).tap();

    // Check that the camera was opened
    expect(element(by.id('camera'))).toBeVisible();
  });
});