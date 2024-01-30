import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde.";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  // Logout - Sign Out
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  // Login - Sign in
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde.";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  // para colocar o cancelado com true assim que sair da página
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
