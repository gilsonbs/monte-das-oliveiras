import { createBrowserClient } from '@supabase/ssr';

// singleton: cria o cliente UMA vez só e reaproveita em todo lugar.
// Criar uma instância nova em cada componente faz elas brigarem pela
// mesma sessão salva (cada uma tenta gerenciar o token de autenticação
// por conta própria), o que causa erros de "não autenticado" aleatórios.
let client: ReturnType<typeof createBrowserClient> | null = null;

export function createSupabaseBrowserClient() {
  if (!client) {
    client = createBrowserClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return client;
}
