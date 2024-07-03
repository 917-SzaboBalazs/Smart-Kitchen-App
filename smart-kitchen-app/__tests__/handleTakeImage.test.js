import { ImagePicker } from 'expo';

jest.mock('expo', () => ({
  ImagePicker: {
    requestMediaLibraryPermissionsAsync: jest.fn(),
    launchCameraAsync: jest.fn(),
  },
}));

it('should request camera permissions and launch the camera', async () => {
  ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: true });
  ImagePicker.launchCameraAsync.mockResolvedValue({});

  await handleTakeImage();

  expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
  expect(ImagePicker.launchCameraAsync).toHaveBeenCalled();
});