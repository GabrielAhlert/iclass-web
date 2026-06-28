<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { authService } from '@/services/auth'
import {
  forgotPasswordRequestSchema,
  resetPasswordRequestSchema,
} from '@/schemas/auth.schema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const router = useRouter()

const step = ref<1 | 2>(1)
const loading = ref(false)

// Step 1
const email = ref('')
const stepOneError = ref('')

// Step 2
const code = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const formErrors = ref<Record<string, string>>({})
const stepTwoError = ref('')

async function handleSendCode() {
  stepOneError.value = ''
  const result = forgotPasswordRequestSchema.safeParse({ email: email.value })
  if (!result.success) {
    stepOneError.value = result.error.issues[0]?.message ?? 'Dados inválidos.'
    return
  }

  loading.value = true
  try {
    await authService.forgotPassword(result.data)
    step.value = 2
  } catch {
    stepOneError.value = 'Não foi possível enviar o código. Verifique o e-mail informado.'
  } finally {
    loading.value = false
  }
}

async function handleResetPassword() {
  formErrors.value = {}
  stepTwoError.value = ''

  if (confirmNewPassword.value !== newPassword.value) {
    formErrors.value.confirmNewPassword = 'As senhas não coincidem.'
  }

  const result = resetPasswordRequestSchema.safeParse({
    email: email.value,
    code: code.value,
    newPassword: newPassword.value,
  })

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const key = String(issue.path[0] ?? 'general')
      if (!formErrors.value[key]) formErrors.value[key] = issue.message
    })
  }

  if (Object.keys(formErrors.value).length > 0) return

  loading.value = true
  try {
    await authService.resetPassword(result.data!)
    toast.success('Senha redefinida com sucesso.')
    router.push({ name: 'login' })
  } catch {
    stepTwoError.value = 'Código inválido ou expirado. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background px-4">
    <!-- Step 1: Request code -->
    <Card v-if="step === 1" class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Recuperar senha</CardTitle>
        <CardDescription>
          Informe seu e-mail e enviaremos um código de verificação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" @submit.prevent="handleSendCode">
          <div class="space-y-2">
            <Label for="email">E-mail</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              autocomplete="email"
              required
            />
          </div>
          <p v-if="stepOneError" class="text-sm text-destructive">{{ stepOneError }}</p>
          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Enviando...' : 'Enviar código' }}
          </Button>
          <div class="text-center">
            <RouterLink
              :to="{ name: 'login' }"
              class="text-sm text-muted-foreground underline-offset-4 hover:underline hover:text-foreground"
            >
              Voltar ao login
            </RouterLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <!-- Step 2: Enter code and new password -->
    <Card v-else class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Redefinir senha</CardTitle>
        <CardDescription>
          Enviamos um código para <strong>{{ email }}</strong>. Digite-o abaixo junto com a nova senha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" @submit.prevent="handleResetPassword">
          <div class="space-y-2">
            <Label for="code">Código de verificação</Label>
            <Input
              id="code"
              v-model="code"
              placeholder="000000"
              maxlength="6"
              autocomplete="one-time-code"
              class="tracking-widest text-center font-mono"
            />
            <p v-if="formErrors.code" class="text-xs text-destructive">{{ formErrors.code }}</p>
          </div>
          <div class="space-y-2">
            <Label for="newPassword">Nova senha</Label>
            <Input
              id="newPassword"
              v-model="newPassword"
              type="password"
              autocomplete="new-password"
            />
            <p v-if="formErrors.newPassword" class="text-xs text-destructive">
              {{ formErrors.newPassword }}
            </p>
          </div>
          <div class="space-y-2">
            <Label for="confirmNewPassword">Confirmar nova senha</Label>
            <Input
              id="confirmNewPassword"
              v-model="confirmNewPassword"
              type="password"
              autocomplete="new-password"
            />
            <p v-if="formErrors.confirmNewPassword" class="text-xs text-destructive">
              {{ formErrors.confirmNewPassword }}
            </p>
          </div>
          <p v-if="stepTwoError" class="text-sm text-destructive">{{ stepTwoError }}</p>
          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Redefinindo...' : 'Redefinir senha' }}
          </Button>
          <div class="text-center">
            <button
              type="button"
              class="text-sm text-muted-foreground underline-offset-4 hover:underline hover:text-foreground"
              @click="step = 1"
            >
              Não recebeu o código? Tentar novamente
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
