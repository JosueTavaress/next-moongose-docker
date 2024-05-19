import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { EmployeeProvider } from '../context/EmployeeContext';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <EmployeeProvider>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </EmployeeProvider>
      </body>
    </html>
  );
}
