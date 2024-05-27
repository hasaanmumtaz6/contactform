import { Inter } from "next/font/google";
import ContactForm from "./components/ContactForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${inter.className}`}>
      <ContactForm />
    </div>
  );
}
