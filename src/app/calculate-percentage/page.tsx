import { Metadata } from 'next';
import CalculatePercentage from './CalculatePercentage';

export const metadata: Metadata = {
  title: 'Percentage Calculator',
  description: 'Calculate percentages and percentage changes easily with our retro-style calculator.',
};

export default function Page() {
  return <CalculatePercentage />;
}