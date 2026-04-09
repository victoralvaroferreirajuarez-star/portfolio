import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
        <ChatWidget />
      </LanguageProvider>
    </ThemeProvider>
  );
}
