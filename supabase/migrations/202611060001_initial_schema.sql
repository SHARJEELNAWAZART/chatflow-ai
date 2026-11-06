create extension if not exists pgcrypto;
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.chatbots (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.profiles(id) on delete cascade,
  public_id uuid not null unique default gen_random_uuid(), name text not null, business_name text,
  description text, status text not null default 'draft' check (status in ('draft','active','paused')),
  settings jsonb not null default '{}'::jsonb, allowed_origins text[] not null default '{}',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.knowledge_documents (
  id uuid primary key default gen_random_uuid(), chatbot_id uuid not null references public.chatbots(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade, filename text not null, storage_path text not null,
  status text not null default 'pending' check(status in ('pending','processing','ready','failed')),
  created_at timestamptz not null default now()
);
create table public.document_chunks (
  id uuid primary key default gen_random_uuid(), document_id uuid not null references public.knowledge_documents(id) on delete cascade,
  chatbot_id uuid not null references public.chatbots(id) on delete cascade, content text not null,
  embedding vector(768), chunk_index integer not null, created_at timestamptz not null default now()
);
create table public.conversations (
  id uuid primary key default gen_random_uuid(), chatbot_id uuid not null references public.chatbots(id) on delete cascade,
  visitor_id text not null, status text not null default 'open' check(status in ('open','archived')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.messages (
  id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check(role in ('user','assistant')), content text not null, created_at timestamptz not null default now()
);
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.profiles(id) on delete cascade,
  plan text not null default 'free' check(plan in ('free','starter','pro')), status text not null default 'active',
  billing_provider text, provider_subscription_id text, current_period_end timestamptz,
  created_at timestamptz not null default now()
);
create table public.usage_records (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.profiles(id) on delete cascade,
  chatbot_id uuid references public.chatbots(id) on delete set null, event_type text not null,
  quantity integer not null default 1 check(quantity > 0), created_at timestamptz not null default now()
);
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null, body text not null, status text not null default 'open' check(status in ('open','in_progress','closed')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.admin_settings (
  key text primary key, value jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now()
);
create index chatbots_owner_id_idx on public.chatbots(owner_id);
create index conversations_chatbot_id_idx on public.conversations(chatbot_id);
create index messages_conversation_created_idx on public.messages(conversation_id,created_at);
create index chunks_chatbot_id_idx on public.document_chunks(chatbot_id);
create index usage_owner_created_idx on public.usage_records(owner_id,created_at);

alter table public.profiles enable row level security;
alter table public.chatbots enable row level security;
alter table public.knowledge_documents enable row level security;
alter table public.document_chunks enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.subscriptions enable row level security;
alter table public.usage_records enable row level security;
alter table public.support_tickets enable row level security;
alter table public.admin_settings enable row level security;
create policy "profile owner read/update" on public.profiles for select using (auth.uid()=id);
create policy "profile owner update" on public.profiles for update using(auth.uid()=id) with check(auth.uid()=id);
create policy "chatbot owner access" on public.chatbots for all using(auth.uid()=owner_id) with check(auth.uid()=owner_id);
create policy "documents owner access" on public.knowledge_documents for all using(auth.uid()=owner_id) with check(auth.uid()=owner_id);
create policy "chunks owner access" on public.document_chunks for all using(exists(select 1 from public.chatbots c where c.id=chatbot_id and c.owner_id=auth.uid())) with check(exists(select 1 from public.chatbots c where c.id=chatbot_id and c.owner_id=auth.uid()));
create policy "conversations chatbot owner access" on public.conversations for all using(exists(select 1 from public.chatbots c where c.id=chatbot_id and c.owner_id=auth.uid())) with check(exists(select 1 from public.chatbots c where c.id=chatbot_id and c.owner_id=auth.uid()));
create policy "messages chatbot owner access" on public.messages for all using(exists(select 1 from public.conversations v join public.chatbots c on c.id=v.chatbot_id where v.id=conversation_id and c.owner_id=auth.uid())) with check(exists(select 1 from public.conversations v join public.chatbots c on c.id=v.chatbot_id where v.id=conversation_id and c.owner_id=auth.uid()));
create policy "subscription owner read" on public.subscriptions for select using(auth.uid()=owner_id);
create policy "usage owner read" on public.usage_records for select using(auth.uid()=owner_id);
create policy "support owner access" on public.support_tickets for all using(auth.uid()=owner_id) with check(auth.uid()=owner_id);
create policy "admin settings unavailable to clients" on public.admin_settings for select using(false);

-- Install pgvector before applying this migration if your Supabase project has not enabled it.
