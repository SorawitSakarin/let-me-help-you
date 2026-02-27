import { Metadata } from 'next';
import KeycodeInfoClient from './KeycodeInfoClient';

export const metadata: Metadata = {
  title: 'Keycode Info',
  description: 'Visualize keyboard events and codes instantly. See key, code, keyCode, and modifiers.',
};

export default function KeycodeInfoPage() {
  return <KeycodeInfoClient />;
}
