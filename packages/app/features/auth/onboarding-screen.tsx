import { Onboarding, OnboardingStepInfo, StepContent } from '@my/ui'
import { ArrowUp, Rocket, Sparkles } from '@tamagui/lucide-icons'
import React from 'react'
import { useRouter } from 'solito/router'

const steps: OnboardingStepInfo[] = [
  {
    theme: 'purple',
    Content: () => (
      <StepContent
        title="Master 5 Roles"
        icon={Sparkles}
        description="Step into the CEO, CMO, CVO, COO, and CFO seats. Run your business like a pilot flies a plane."
      />
    ),
  },
  {
    theme: 'blue',
    Content: () => (
      <StepContent
        title="AI-Powered Brain"
        icon={ArrowUp}
        description="Upload documents, add notes, and chat with your AI business advisor. Your knowledge, always at hand."
      />
    ),
  },
  {
    theme: 'green',
    Content: () => (
      <StepContent
        title="Build & Soar"
        icon={Rocket}
        description="Track progress, follow proven frameworks, and accelerate your growth as a solopreneur."
      />
    ),
  },
]

/**
 * note: this screen is used as a standalone page on native and as a sidebar on auth layout on web
 */
export const OnboardingScreen = () => {
  const router = useRouter()
  return <Onboarding autoSwipe onOnboarded={() => router.push('/sign-up')} steps={steps} />
}
