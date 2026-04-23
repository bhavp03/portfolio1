"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-8 px-4 bg-gray-800 dark:bg-gray-950 text-white relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">Bhavya Puri</h2>
            <p className="text-gray-400">Vehicle Controls Engineer</p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://linkedin.com/in/bhavyapuri"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="https://github.com/bhavp03"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="tel:+919810928739"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Phone className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:bhavyapuri@outlook.com"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Bhavya Puri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
