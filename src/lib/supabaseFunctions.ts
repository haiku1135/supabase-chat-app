import supabase, { Database } from "./supabase";

// テーブル名
export const TABLE_NAME = "chat-app";

// データの全取得
export const fetchDatabase = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("created_at");

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

type InsertProps = {
  message: string;
  nickName: string;
  avatarUrl: string;
};

// データの追加
export const addSupabaseData = async ({ message, avatarUrl, nickName }: InsertProps) => {
  try {
    // セッションの確認を追加
    const session = await supabase.auth.getSession();
    if (!session) {
      throw new Error('認証されていません');
    }

    const { error } = await supabase
      .from(TABLE_NAME)
      .insert({ message, avatarUrl, nickName });
    
    if (error) {
      console.error('Supabase error:', error); // より詳細なエラー情報
      throw error;
    }
  } catch (error) {
    console.error('Error in addSupabaseData:', error);
    throw error;
  }
};