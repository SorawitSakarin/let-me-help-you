import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coin Flip | Heads or Tails | Daily Task Tool',
  description: 'Flip a virtual coin to make a quick decision. Choose between heads or tails with this simple, random 8-bit coin flipper.',
};

export default function FlipACoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}