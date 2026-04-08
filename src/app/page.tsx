import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import Differentiation from '@/components/Differentiation';
import Team from '@/components/Team';
import ClientEvaluations from '@/components/ClientEvaluations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <Differentiation />
      <Team />
      <ClientEvaluations />
      <Contact />
      <Footer />
    </main>
  );
}
