import { environment } from '@environments/environment';
import {createClient,SupabaseClient} from '@supabase/supabase-js';

export class SupabaseService {
  private supabase: SupabaseClient | null = null;

  public initialize() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }
}
