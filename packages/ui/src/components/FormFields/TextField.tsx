import { useStringFieldInfo, useTsController } from '@ts-react/form'
import { useId, useState } from 'react'
import { Fieldset, Input, InputProps, Label, Theme, XStack, Button, View } from 'tamagui'
import { Eye, EyeOff } from '@tamagui/lucide-icons'

import { FieldError } from '../FieldError'
import { Shake } from '../Shake'

export const TextField = (props: Pick<InputProps, 'size' | 'autoFocus' | 'secureTextEntry'>) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>()
  const { label, placeholder, isOptional, maxLength, isEmail } = useStringFieldInfo()
  const id = useId()
  const disabled = isSubmitting
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = props.secureTextEntry

  return (
    <Theme name={error ? 'red' : null} forceClassName>
      <Fieldset>
        {!!label && (
          <Label theme="alt1" size={props.size || '$3'} htmlFor={id}>
            {label} {isOptional && `(Optional)`}
          </Label>
        )}
        <Shake shakeKey={error?.errorMessage}>
          <XStack position="relative" alignItems="center">
            <Input
              disabled={disabled}
              maxLength={maxLength}
              placeholderTextColor="$color10"
              spellCheck={isEmail ? false : undefined}
              autoCapitalize={isEmail ? 'none' : undefined}
              inputMode={isEmail ? 'email' : undefined}
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              onBlur={field.onBlur}
              ref={field.ref}
              placeholder={placeholder}
              id={id}
              w="100%"
              paddingRight={isPassword ? '$10' : undefined}
              {...props}
              secureTextEntry={isPassword && !showPassword}
            />
            {isPassword && (
              <Button
                position="absolute"
                right="$2"
                size="$2"
                circular
                chromeless
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                accessibilityRole="button"
              >
                {showPassword ? (
                  <EyeOff size={18} color="$color10" />
                ) : (
                  <Eye size={18} color="$color10" />
                )}
              </Button>
            )}
          </XStack>
        </Shake>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  )
}
