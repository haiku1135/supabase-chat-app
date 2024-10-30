import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js"; // SupabaseのSession型をインポート
import supabase from "@/lib/supabase"; // Supabaseクライアントをインポート

// useAuthカスタムフックを定義
const useAuth = () => {

  // ログイン状態を管理するためのstate
  const [session, setSession] = useState<Session | null>(null);
  // エラー状況を管理するためのstate
  const [error, setError] = useState("");

  useEffect(() => {
    // ログイン状態の変化を監視
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session); // セッション情報を更新
    });

    // コンポーネントのアンマウント時にリスナーを解除
    return () => authData.subscription.unsubscribe();
  }, []);

  // GitHubでサインインする関数
  const signInWithGithub = async () => {
    try {
      // GitHubをプロバイダーとしてOAuthサインインを実行
      const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
      if (error) {
        setError(error.message); // エラーメッセージをstateに設定
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // エラーメッセージをstateに設定
      } else if (typeof error === "string") {
        setError(error); // エラーメッセージをstateに設定
      } else {
        console.error("GitHubとの連携に失敗しました。"); // その他のエラーをコンソールに出力
      }
    }
  };

  // ログインユーザーのGitHubプロフィール情報を取得
  const profileFromGithub: {
    nickName: string;
    avatarUrl: string;
  } = {
    nickName: session?.user?.user_metadata.user_name, // GitHubのユーザー名
    avatarUrl: session?.user?.user_metadata.avatar_url, // GitHubのアバターURL
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { session, error, signInWithGithub, profileFromGithub, signOut };
};

export default useAuth;
