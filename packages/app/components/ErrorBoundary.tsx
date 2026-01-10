import { Button, H2, Paragraph, YStack } from '@my/ui'
import { AlertTriangle, RefreshCw } from '@tamagui/lucide-icons'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to your error tracking service
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // You could send this to Supabase or your error tracking table here
    // logErrorToSupabase(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <YStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          padding="$6"
          gap="$4"
        >
          <YStack
            width={64}
            height={64}
            borderRadius={32}
            backgroundColor="$red4"
            alignItems="center"
            justifyContent="center"
          >
            <AlertTriangle size={32} color="$red10" />
          </YStack>

          <YStack alignItems="center" gap="$2">
            <H2 size="$6" fontWeight="600">
              Something went wrong
            </H2>
            <Paragraph size="$4" color="$color11" textAlign="center" maxWidth={300}>
              We encountered an unexpected error. Please try again.
            </Paragraph>
          </YStack>

          <Button
            size="$4"
            theme="active"
            icon={<RefreshCw size={16} />}
            onPress={this.handleRetry}
          >
            Try Again
          </Button>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <YStack
              backgroundColor="$red2"
              padding="$3"
              borderRadius="$3"
              maxWidth={400}
            >
              <Paragraph size="$2" fontFamily="$mono" color="$red11">
                {this.state.error.message}
              </Paragraph>
            </YStack>
          )}
        </YStack>
      )
    }

    return this.props.children
  }
}
