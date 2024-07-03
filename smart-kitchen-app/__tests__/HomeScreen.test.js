import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

it('should request camera permissions and launch the camera when button is pressed', async () => {
  const { getByTestId } = render(<HomeScreen />);
  const button = getByTestId('camera-button');

  fireEvent.press(button);

  await waitFor(() => {
    expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
    expect(ImagePicker.launchCameraAsync).toHaveBeenCalled();
  });
});