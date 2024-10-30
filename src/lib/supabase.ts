// "@supabase/supabase-js"からcreateClient関数をインポート
import { createClient } from "@supabase/supabase-js";

// Database型を定義
export type Database = {
  id: string;
  createdAt: string;
  message: string;
  nickName: string;
  avatarUrl: string;
};

// 環境変数からSupabaseのURLを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// 環境変数からSupabaseの匿名キーを取得
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabaseクライアントを作成
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Supabaseクライアントをデフォルトエクスポート
export default supabase;