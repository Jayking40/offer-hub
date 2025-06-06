"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Menu, Search, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectBasicInfo from "@/components/post-project/project-basic-info"
import ProjectRequirements from "@/components/post-project/project-requirements"
import ProjectBudget from "@/components/post-project/project-budget"
import ProjectAttachments from "@/components/post-project/project-attachments"
import ProjectReview from "@/components/post-project/project-review"
import ProjectSuccess from "@/components/post-project/project-success"
import ProjectSteps from "@/components/post-project/project-steps"

// Simple Header component defined inline
function SimpleHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#15949C]">Offer Hub</span>
            </a>
            <nav className="ml-10 hidden space-x-8 md:flex">
              <a href="/find-workers" className="text-[#002333] hover:text-[#15949C]">
                Find Talent
              </a>
              <a href="/post-project" className="text-[#15949C] font-medium">
                Post a Project
              </a>
              <a href="/my-chats" className="text-[#002333] hover:text-[#15949C]">
                Messages
              </a>
              <a href="/payments" className="text-[#002333] hover:text-[#15949C]">
                Payments
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[#002333]">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#002333]">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#002333]">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-[#002333]">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

// Simple Footer component defined inline
function SimpleFooter() {
  return (
    <footer className="bg-[#002333] text-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Offer Hub</h3>
            <p className="text-sm text-gray-300">Connect with top freelancers and clients for your next project.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">For Freelancers</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Find Work
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Create Profile
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Post a Project
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Find Freelancers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Enterprise Solutions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-300">
          <p>© {new Date().getFullYear()} Offer Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Initial project data
const initialProjectData = {
  title: "",
  category: "",
  subcategory: "",
  description: "",
  skills: [],
  experienceLevel: "",
  projectType: "one-time",
  visibility: "public",
  budgetType: "fixed",
  budgetAmount: 0,
  duration: "",
  attachments: [],
  milestones: [],
}

export default function PostProjectPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState(initialProjectData)
  const totalSteps = 5

  const updateProjectData = (data: Partial<typeof initialProjectData>) => {
    setProjectData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit the project data to the server
    setCurrentStep(totalSteps + 1) // Show success screen
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ProjectBasicInfo projectData={projectData} updateProjectData={updateProjectData} />
      case 2:
        return <ProjectRequirements projectData={projectData} updateProjectData={updateProjectData} />
      case 3:
        return <ProjectBudget projectData={projectData} updateProjectData={updateProjectData} />
      case 4:
        return <ProjectAttachments projectData={projectData} updateProjectData={updateProjectData} />
      case 5:
        return <ProjectReview projectData={projectData} />
      case 6:
        return <ProjectSuccess projectData={projectData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SimpleHeader />

      <main className="flex-1">
        <div className="bg-gradient-to-r from-[#002333] to-[#15949C] text-white py-10">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl font-bold mb-2">Post a Project</h1>
            <p className="opacity-90">Find the perfect freelancer for your business</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {currentStep <= totalSteps && <ProjectSteps currentStep={currentStep} totalSteps={totalSteps} />}

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {renderStepContent()}
          </motion.div>

          {currentStep <= totalSteps && (
            <div className="flex justify-between mt-10">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={handleNext} className="bg-[#15949C] hover:bg-[#15949C]/90 flex items-center">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-[#15949C] hover:bg-[#15949C]/90 flex items-center">
                  Post Project
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <SimpleFooter />
    </div>
  )
}

