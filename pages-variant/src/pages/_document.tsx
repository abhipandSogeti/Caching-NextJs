import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased dark bg-background text-foreground p-5">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
