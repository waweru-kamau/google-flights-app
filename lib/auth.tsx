import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { router, usePathname } from "expo-router";
import { Alert, Platform } from "react-native";
import { useStorageState } from "@/hooks/useStorage";

type AuthContextType = {
  user: User | null;
  token: string | null;
  error: AuthError | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [_, setValue] = useStorageState("token");
  const currentURL = usePathname();

  useEffect(() => {
    if (token) {
      setValue(token);
    }
    return () => {
      setValue(null);
    };
  }, [token]);

  // Centralized session check and routing logic
  const sessionUpdatedCheck = (session: Session | null) => {
    if (session) {
      setUser(session.user);
      setToken(session.access_token);
      if (
        currentURL === "/login" ||
        currentURL === "/signUp" ||
        currentURL === "/"
      ) {
        router.replace("/(app)");
      }
    } else {
      setUser(null);
      setToken(null);
      router.replace("/signUp");
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        switch (event) {
          case "SIGNED_IN":
          case "INITIAL_SESSION":
          case "USER_UPDATED":
          case "TOKEN_REFRESHED":
            sessionUpdatedCheck(session);
            break;
          case "SIGNED_OUT":
            setUser(null);
            setToken(null);
            router.replace("/signUp");
            break;
          default:
            break;
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Sign-up method
  const signup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error);
    }
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    const {
      error,
      data: { user, session },
    } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error);
    } else if (user && session) {
      setError(null);
      router.replace("/(app)");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      router.replace("/signUp");
    } catch (err) {
      console.error(err);
    }
  };

  // Display error messages in a platform-specific way
  if (error) {
    if (Platform.OS === "web") {
      alert(error.message);
    } else {
      Alert.alert("Error", error.message);
    }
    setError(null);
  }

  // Memoized context values
  const contextValues = useMemo(() => {
    return {
      user,
      token,
      error,
      signup,
      login,
      logout,
    };
  }, [user, token, error]);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
