import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/contact-form"
import { Navbar } from "@/components/navbar"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { SmoothScroll } from "@/components/smooth-scroll"
import { HeroSection } from "@/components/hero-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Footer } from "@/components/footer"
import { 
  AnimatedSection, 
  AnimatedCard, 
  ParticleBackground, 
  AnimatedGradientBackground 
} from "@/components/client-animations"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Background Effects */}
      <AnimatedGradientBackground />
      <ParticleBackground />
      <ScrollIndicator />
      <SmoothScroll />
      <ScrollToTop />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  I&apos;m an EV Enthusiast with a Graduate Degree in Electronics & Communication Engineering. My passion lies in Electrification, Software Intelligence, Thermal Management, Connectivity & Data - The Pillars Shaping Future Mobility.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  With expertise in Embedded Systems, Signal Processing, IoT, and AI/ML, I specialize in developing vehicle control systems and EV charging solutions that drive innovation in the automotive industry.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  I&apos;m proficient in Python, C/C++, MATLAB Simulink, and STM32 microcontrollers, with hands-on experience in MIL, SIL, and HIL validation for vehicle systems.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Expertise</h3>
                <ul className="space-y-2">
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-blue-900 dark:text-white mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Vehicle Control Unit (VCU) Development
                    </span>
                  </li>
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-blue-900 dark:text-white mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">EV Charging Systems & Solutions</span>
                  </li>
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-blue-900 dark:text-white mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">MATLAB Simulink & Stateflow</span>
                  </li>
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-blue-900 dark:text-white mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">Signal Processing & AI/ML</span>
                  </li>
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-blue-900 dark:text-white mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">IoT & Embedded Systems Development</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Professional Experience</h2>
          </AnimatedSection>

          <div className="space-y-8">
            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 sm:p-6 border-l-4 border-blue-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                  <div className="flex items-center gap-4 mb-2 md:mb-0">
                    <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100 overflow-hidden">
                      <img src="https://www.google.com/s2/favicons?domain=dorleco.com&sz=128" alt="Dorleco Logo" className="w-full h-full object-contain p-1.5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Vehicle Controls Engineer</h3>
                      <p className="text-blue-900 dark:text-white font-medium">Dorleco Pvt. Ltd. - Pune, India</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Jun 2025 - Present</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>
                    Delivered end-to-end vehicle & EV charging solutions supporting VCU development & manufacturing, improving system robustness by 25-30% using MATLAB Simulink & Stateflow.
                  </li>
                  <li>
                    Developed diagnostics and fault management frameworks, including signal validation and fail-safe strategies, reducing inconsistencies by 30-40%.
                  </li>
                  <li>
                    Executed MIL, SIL, and HIL validation across development stages, enabling early defect detection and faster issue resolution.
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 sm:p-6 border-l-4 border-blue-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                  <div className="flex items-center gap-4 mb-2 md:mb-0">
                    <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100 overflow-hidden">
                      <img src="/images/Advik.png" alt="Advik Hi-Tech Logo" className="w-full h-full object-contain p-1.5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Project Trainee</h3>
                      <p className="text-blue-900 dark:text-white font-medium">Advik Hi-Tech Pvt Ltd. - Pune, India</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Jan 2025 - May 2025</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Designed a compact and energy-efficient off-board charger for E2W.</li>
                  <li>Worked on an IP67-rated enclosure with an efficient cooling system for safe operation and overheating prevention in outdoor conditions.</li>
                  <li>Conducted rigorous testing for performance, durability, and regulatory compliance.</li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 sm:p-6 border-l-4 border-blue-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                  <div className="flex items-center gap-4 mb-2 md:mb-0">
                    <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100 overflow-hidden">
                      <img src="https://www.google.com/s2/favicons?domain=napino.com&sz=128" alt="Napino Logo" className="w-full h-full object-contain p-1.5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Project Trainee</h3>
                      <p className="text-blue-900 dark:text-white font-medium">Napino Auto & Electronics Ltd. - Gurgaon, India</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Jun 2024 - Jul 2024</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Gained invaluable experience in PCB manufacturing, assembly, and practical applications.</li>
                  <li>Enhanced skills in microcontrollers through hands-on experience with Hero MotoCorp and Ola Electric.</li>
                  <li>Explored latest advancements in embedded systems technology.</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatedCard delay={0.2}>
              <Card className="h-full flex flex-col border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl font-bold line-clamp-2">AI Noise Cancellation</CardTitle>
                  <CardDescription>AI-based real-time audio processing</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                    <Image
                      src="/projects/anc.png"
                      alt="Active Noise Cancellation"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Designed and implemented an AI-based Adaptive Noise Cancellation system using U-Net architecture and PyTorch for real-time audio processing with optimized noise reduction capabilities.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      Python
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      PyTorch
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      Signal Processing
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      Deep Learning
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full relative overflow-hidden group" asChild>
                    <Link href="https://github.com/bhavp03/ancai" target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="relative z-10">View Project</span>
                      <span className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card className="h-full flex flex-col border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl font-bold line-clamp-2">Noise Learning DAE</CardTitle>
                  <CardDescription>Neural network for signal denoising</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                    <Image src="/projects/dae.png" alt="Denoising Autoencoder" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Developed nlDAE in MATLAB, enhancing denoising efficiency by learning and subtracting noise from input data. Demonstrated superior performance in signal restoration and symbol demodulation.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      MATLAB
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      Neural Networks
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      Signal Processing
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full relative overflow-hidden group" asChild>
                    <Link href="https://github.com/bhavp03/Noise-Learning-Denoising-Autoencoder" target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="relative z-10">View Project</span>
                      <span className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <Card className="h-full flex flex-col border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl font-bold line-clamp-2">IoT Grain Dispenser</CardTitle>
                  <CardDescription>Sustainable IoT vending solution</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                    <Image
                      src="/projects/iot.png"
                      alt="IoT Dispenser"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Designed an IoT-based sustainable dispenser using STM32 microcontroller, delivering flours/grains into user-provided containers via a screw shaft driven by a stepper motor.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      STM32
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      MicroPython
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      IoT
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                    >
                      Embedded Systems
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full relative overflow-hidden group" asChild>
                    <Link href="https://github.com/bhavp03/grain-dispenser" target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="relative z-10">View Project</span>
                      <span className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AnimatedSection direction="up" delay={0.2}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                      <span className="text-blue-900 dark:text-white text-sm font-bold">DOM</span>
                    </span>
                    Domains
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      Embedded Systems
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      Signal Processing
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      IoT
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      AI & ML
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      EV Charging
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      Software Intelligence
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                      <span className="text-blue-600 dark:text-blue-300 text-sm font-bold">LANG</span>
                    </span>
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      C/C++
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      PHP
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      HTML/CSS
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection direction="up" delay={0.4}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
                      <span className="text-green-600 dark:text-green-300 text-sm font-bold">DEV</span>
                    </span>
                    Developer Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      Git
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      VS Code
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      STM32
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      MATLAB
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      PyTorch
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      MySQL
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      Altium Designer
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.5}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-2">
                      <span className="text-orange-600 dark:text-orange-300 text-sm font-bold">SOFT</span>
                    </span>
                    Soft Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      Time Management
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      Team Player
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      Problem-solving
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      MS Office
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors text-center w-full col-span-2">
                      Effective Client Communication
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Additional Skills Tags */}
          <AnimatedSection delay={0.6}>
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-6">Spoken Languages</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="outline" className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  English (Professional proficiency or above)
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  Hindi (Professional proficiency or above)
                </Badge>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Education & Certifications</h2>
          </AnimatedSection>

          <div className="mb-12">
            <AnimatedSection direction="left" delay={0.2}>
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300 mb-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold">B.Tech in Electronics and Communication Engineering</h4>
                    <p className="text-blue-900 dark:text-white">
                      Shiv Nadar Insitute of Eminence
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">2021 - 2025</p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Highlights & Courses:</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="animate-pulse flex items-center justify-center">
                      Specialization in E-Mobility
                    </Badge>
                    <Badge variant="secondary" className="flex items-center justify-center">Connected Car Technology</Badge>
                    <Badge variant="secondary" className="flex items-center justify-center">Electric Vehicle Technology</Badge>
                    <Badge variant="secondary" className="flex items-center justify-center">EV Converters and Power Train</Badge>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">PCM with Computer Science</h4>
                    <p className="text-blue-900 dark:text-white">
                      Suncity School
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">2017 - 2021</p>
                </div>
                <p className="text-gray-600 dark:text-gray-400">CBSE Class 12: 83%</p>
              </div>
            </AnimatedSection>
          </div>

          <div>
            <AnimatedSection direction="right" delay={0.3}>
              <h3 className="text-2xl font-bold mb-6">Certifications & Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300 md:col-span-2">
                  <h4 className="font-semibold">Introduction to IoT and Digital Transformation</h4>
                  <p className="text-blue-900 dark:text-white">Cisco Networking Academy</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold">Full Stack Specialization</h4>
                  <p className="text-blue-900 dark:text-white">Scaler Academy</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold">Level 3</h4>
                  <p className="text-blue-900 dark:text-white">Code-venture by D.Y Patil University</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6">Hobbies & Interests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold mb-1">Adventure Club</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Organized and managed outstation trips, fostering teamwork and leadership.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold mb-1">Volunteering</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Assisted in food distribution with Robin Hood Army (May–Aug 2021).</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold mb-1">Technology & Innovation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enthusiast in AI, embedded systems, and sustainable mobility.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold mb-1">Sports & Fitness</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Passionate about football, trekking, cycling, and outdoor activities.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-blue-900 dark:text-white mr-3" />
                    <a
                      href="mailto:bhavyapuri@outlook.com"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white transition-colors"
                    >
                      bhavyapuri@outlook.com
                    </a>
                  </div>
                  <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <Linkedin className="w-5 h-5 text-blue-900 dark:text-white mr-3" />
                    <a
                      href="https://www.linkedin.com/in/bhavyapuri/"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white transition-colors"
                      rel="noreferrer"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <Github className="w-5 h-5 text-blue-900 dark:text-white mr-3" />
                    <a
                      href="https://github.com/bhavp03"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white transition-colors"
                      rel="noreferrer"
                    >
                      GitHub Profile
                    </a>
                  </div>
                  <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-blue-900 dark:text-white mr-3" />
                    <a
                      href="tel:+919810928739"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white transition-colors"
                    >
                      +91 9810928739
                    </a>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
