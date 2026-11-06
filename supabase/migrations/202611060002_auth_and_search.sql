create extension if not exists vector;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,full_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name','')) on conflict(id) do nothing;
  insert into public.subscriptions(owner_id,plan,status) values(new.id,'free','active');
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
create or replace function public.prevent_profile_role_change() returns trigger language plpgsql as $$
begin
 if new.role is distinct from old.role and coalesce(auth.role(),'') <> 'service_role' then raise exception 'Role changes are restricted'; end if;
 return new;
end; $$;
drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role before update on public.profiles for each row execute procedure public.prevent_profile_role_change();
create or replace function public.match_document_chunks(p_chatbot_id uuid,p_query_embedding vector(768),p_match_count int default 5)
returns table(id uuid,content text,similarity float) language sql stable as $$
 select dc.id,dc.content,1-(dc.embedding <=> p_query_embedding) as similarity
 from public.document_chunks dc join public.chatbots b on b.id=dc.chatbot_id
 where dc.chatbot_id=p_chatbot_id and b.status='active' and dc.embedding is not null
 order by dc.embedding <=> p_query_embedding limit least(greatest(p_match_count,1),10);
$$;
revoke all on function public.match_document_chunks(uuid,vector,int) from public,anon,authenticated;
