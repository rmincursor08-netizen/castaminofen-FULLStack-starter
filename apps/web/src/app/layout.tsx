export const metadata = {
  title: 'Castaminofen',
  description: 'Content platform frontend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
