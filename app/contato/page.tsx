'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadSchema, type LeadInput } from '@/lib/validations'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContatoPage() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: '', email: '', phone: '', message: '', product: 'geral' },
  })

  async function onSubmit(values: LeadInput) {
    setStatus('idle')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (res.ok) setStatus('ok')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="container py-12">
      <h1 className="mb-4 text-3xl font-semibold">Contato</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-4">
        <Input placeholder="Seu nome" {...form.register('name')} />
        <Input placeholder="Seu e-mail" type="email" {...form.register('email')} />
        <Input placeholder="Telefone (WhatsApp)" {...form.register('phone')} />
        <select
          className="h-11 w-full rounded-2xl bg-surface/70 px-4"
          {...form.register('product')}
        >
          <option value="geral">Geral</option>
          <option value="10equinze">Agendador 10eQuinze</option>
          <option value="msa">Agendador MSA</option>
        </select>
        <Textarea placeholder="Sua mensagem" {...form.register('message')} />
        <Button type="submit">Enviar</Button>
        {status === 'ok' && <p className="text-sm text-green-400">Enviado com sucesso!</p>}
        {status === 'error' && (
          <p className="text-sm text-red-400">Ocorreu um erro. Tente novamente.</p>
        )}
      </form>
    </section>
  )
}
